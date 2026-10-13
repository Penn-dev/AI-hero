"""Extract acquired public HTML with the standard parser; never execute page code.

Uses the semantic conversion rules from recover-browser-sources.mjs, retaining CTA
text and links. Python standard library only; no browser login or extra package.
"""
import argparse
import gzip
import hashlib
import json
import re
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path


@dataclass
class Node:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)

    def all(self, tag=None):
        for child in self.children:
            if isinstance(child, Node):
                if tag is None or child.tag == tag:
                    yield child
                yield from child.all(tag)

    def text(self):
        return "".join(child.text() if isinstance(child, Node) else child for child in self.children)


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node("document")
        self.stack = [self.root]
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, text):
        self.stack[-1].children.append(text)

    def handle_comment(self, text):
        self.stack[-1].children.append(Node("comment", {"value": text}))


IGNORED = {"script", "style", "svg", "template", "comment"}


def resolve_streamed_slots(document, html):
    # React's response includes already-rendered HTML in named slots. Move that
    # HTML to its template boundary; no JavaScript or hidden course API executes.
    slots = {node.attrs["id"]: node for node in document.all() if "id" in node.attrs}
    for boundary, fragment in re.findall(r'\$RC\("(B:[\w]+)","(S:[\w]+)"\)', html):
        target = slots.get(boundary)
        source = slots.get(fragment)
        if target is None or source is None:
            continue
        parent = next((node for node in [document, *document.all()] if any(child is target for child in node.children)), None)
        if parent is None:
            continue
        start = next(index for index, child in enumerate(parent.children) if child is target)
        depth = 0
        end = start + 1
        for index in range(start + 1, len(parent.children)):
            child = parent.children[index]
            if isinstance(child, Node) and child.tag == "comment":
                marker = child.attrs["value"]
                if marker.startswith("$"):
                    depth += 1
                elif marker == "/$":
                    if depth == 0:
                        end = index + 1
                        break
                    depth -= 1
        parent.children[start:end] = source.children


def inline(node):
    if isinstance(node, str):
        return re.sub(r"\s+", " ", node)
    if node.tag in IGNORED:
        return ""
    body = "".join(inline(child) for child in node.children)
    if node.tag == "br":
        return "  \n"
    if node.tag == "a":
        href = node.attrs.get("href")
        return f"[{body.strip()}]({href})" if href else body
    if node.tag == "img":
        return f"![{node.attrs.get('alt', '')}]({node.attrs.get('src', '')})"
    if node.tag == "code":
        return "`" + node.text() + "`"
    if node.tag in {"strong", "b"}:
        return "**" + body.strip() + "**"
    if node.tag in {"em", "i"}:
        return "_" + body.strip() + "_"
    return body


def block(node):
    if isinstance(node, str):
        return re.sub(r"\s+", " ", node)
    if node.tag in IGNORED:
        return ""
    if node.tag == "button" and node.attrs.get("aria-live"):
        return ""
    if node.tag == "pre":
        code = next(node.all("code"), node)
        language = re.search(r"language-([\w-]+)", code.attrs.get("class", ""))
        lang = node.attrs.get("data-lang") or code.attrs.get("data-language") or (language[1] if language else "")
        text = code.text().strip("\n")
        fence = "`" * max(3, max((len(x) + 1 for x in re.findall(r"`+", text)), default=3))
        return f"\n\n{fence}{lang}\n{text}\n{fence}\n\n"
    if re.fullmatch(r"h[1-6]", node.tag):
        return "\n\n" + "#" * int(node.tag[1]) + " " + inline(node).strip() + "\n\n"
    if node.tag in {"p", "summary"}:
        return "\n\n" + inline(node).strip() + "\n\n" if node.tag == "p" else "<summary>" + inline(node).strip() + "</summary>\n\n"
    if node.tag in {"ul", "ol"}:
        items = [child for child in node.children if isinstance(child, Node) and child.tag == "li"]
        lines = []
        for index, item in enumerate(items):
            text = "".join(block(child) for child in item.children).strip()
            prefix = f"{index + 1}. " if node.tag == "ol" else "- "
            lines.append(prefix + text.replace("\n", "\n  "))
        return "\n\n" + "\n".join(lines) + "\n\n"
    if node.tag == "table":
        rows = [[inline(cell).strip().replace("|", "\\|") for cell in row.children if isinstance(cell, Node) and cell.tag in {"th", "td"}] for row in node.all("tr")]
        rows = [row for row in rows if row]
        if not rows:
            return ""
        width = max(map(len, rows))
        rows = [row + [""] * (width - len(row)) for row in rows]
        rows.insert(1, ["---"] * width)
        return "\n\n" + "\n".join("| " + " | ".join(row) + " |" for row in rows) + "\n\n"
    body = "".join(block(child) for child in node.children)
    if node.tag == "blockquote":
        return "\n\n" + "\n".join("> " + line for line in body.strip().splitlines()) + "\n\n"
    if node.tag == "details":
        return "\n\n<details>\n" + body.strip() + "\n</details>\n\n"
    if node.tag == "hr":
        return "\n\n---\n\n"
    if node.tag in {"div", "section", "article", "nav", "aside", "form", "label", "button"}:
        return "\n\n" + body.strip() + "\n\n" if body.strip() else ""
    if node.tag in {"a", "img", "code", "strong", "b", "em", "i", "br"}:
        return inline(node)
    return body


def extract(html, page):
    document = Document(html).root
    resolve_streamed_slots(document, html)
    main = next(document.all("main"), None)
    if main is None:
        raise ValueError("Public main content not found")
    heading = next(main.all("h1"), None)
    title = heading.text().strip() if heading else page["route"]
    # Tidy prose spacing only; code whitespace is part of the original example.
    parts = re.split(r"(^(`{3,})[^\n]*\n[\s\S]*?^\2[ \t]*$)", block(main), flags=re.MULTILINE)
    body_parts = []
    for index in range(0, len(parts), 3):
        prose = re.sub(r"\n[ \t]+\n", "\n\n", parts[index])
        body_parts.append(re.sub(r"\n{3,}", "\n\n", prose))
        if index + 1 < len(parts):
            body_parts.append(parts[index + 1])
    body = "".join(body_parts).strip() + "\n"
    if not body.strip() or body.strip() == "# " + title:
        raise ValueError("Only a page shell was acquired")
    metadata = {
        "title": title,
        "slug": page["route"].strip("/").split("/")[-1] or "index",
        "type": "dictionary" if page["route"].startswith("/ai-coding-dictionary") else "page",
        "updatedAt": page.get("lastmod") or "",
    }
    frontmatter = "---\n" + "\n".join(key + ": " + json.dumps(value, ensure_ascii=False) for key, value in metadata.items()) + "\n---\n\n"
    return {"markdown": frontmatter + body, "title": title}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, help="Current HTML acquisition report")
    parser.add_argument("--report", required=True, help="Extraction report")
    args = parser.parse_args()
    report = json.loads(Path(args.input).read_text(encoding="utf-8"))
    manifest_path = Path("content/source/manifest.json")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    by_route = {page["route"]: page for page in manifest["pages"]}
    results = []
    for page in report["pages"]:
        try:
            if page["status"] != "html-acquired":
                raise ValueError("No successful public HTML response")
            path = Path(page["bodyPath"])
            raw = gzip.decompress(path.read_bytes()) if page.get("bodyEncoding") == "gzip" else path.read_bytes()
            if hashlib.sha256(raw).hexdigest() != page["bodyHash"]:
                raise ValueError("HTML evidence hash mismatch")
            if page.get("finalUrl", page["url"]).split("?")[0].rstrip("/") != page["url"].rstrip("/"):
                raise ValueError("Response redirected to a different page; not counted as the requested body")
            content = extract(raw.decode("utf-8"), page)
            parts = [part for part in page["route"].split("/") if part]
            if any(part in {".", ".."} for part in parts):
                raise ValueError("Unsafe source route")
            target = Path("content/source").joinpath(*parts[:-1], parts[-1] + ".md") if parts else Path("content/source/index.md")
            target.parent.mkdir(parents=True, exist_ok=True)
            output = content["markdown"].encode("utf-8")
            target.write_bytes(output)
            entry = by_route[page["route"]]
            entry.update(status="downloaded", acquiredThisRun=True, sourceUrl=page["url"], contentType="text/markdown; extracted-from-public-html", sourcePath=target.as_posix(), sourceHash=hashlib.sha256(output).hexdigest(), sourceLength=len(content["markdown"]), checkedAt=page["checkedAt"], recoveryMethod="anonymous public HTML semantic extraction", htmlEvidence={key: page[key] for key in ["bodyPath", "bodyHash", "bodyEncoding", "httpStatus", "finalUrl"] if key in page})
            results.append({"route": page["route"], "status": "extracted", "title": content["title"], "sourcePath": entry["sourcePath"], "sourceHash": entry["sourceHash"]})
        except (ValueError, OSError, KeyError) as error:
            results.append({"route": page["route"], "status": "gap", "reason": str(error)})
    manifest["counts"] = {status: sum(page["status"] == status for page in manifest["pages"]) for status in sorted({page["status"] for page in manifest["pages"]})}
    manifest_path.write_bytes((json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))
    Path(args.report).write_bytes((json.dumps({"inputPath": args.input, "pages": results}, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))
    print(json.dumps({"counts": manifest["counts"], "extracted": sum(page["status"] == "extracted" for page in results), "gaps": [page for page in results if page["status"] == "gap"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
