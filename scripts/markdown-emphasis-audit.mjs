import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Run from the repository root. This only reads the supplied Markdown files.
const { parseMarkdown } = await import(pathToFileURL(path.resolve('scripts/lib/page-content.mjs')));
const files = process.argv.slice(2);
assert.ok(files.length > 0, 'Supply Markdown paths to audit');
const results = [];
for (const file of files) {
  const full = await readFile(file, 'utf8');
  const prefix = full.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)?.[0] ?? '';
  const body = full.slice(prefix.length);
  const lineOffset = prefix.split('\n').length - 1;
  const findings = [];
  function visit(node, insideStrong = false) {
    if (node.type === 'code' || node.type === 'inlineCode') return;
    const raw = body.slice(node.position?.start.offset, node.position?.end.offset);
    if (node.type === 'strong' && insideStrong) {
      findings.push({ kind: 'nested-strong', line: node.position.start.line + lineOffset, raw });
    }
    if (node.type === 'text') {
      // Intentional backslash escapes/entities and ordinary identifiers are not markup failures.
      const unescaped = raw.replace(/\\[\\*_]/g, '');
      const withoutIdentifiers = unescaped.replace(/[A-Za-z0-9][A-Za-z0-9_-]*_[A-Za-z0-9_-]+/g, '');
      if (unescaped.includes('**') || /\*[^*\n]+\*/.test(unescaped) || withoutIdentifiers.includes('_')) {
        findings.push({ kind: 'literal-emphasis-marker', line: node.position.start.line + lineOffset, raw });
      }
    }
    for (const child of node.children ?? []) visit(child, insideStrong || node.type === 'strong');
  }
  visit(parseMarkdown(body));
  results.push({ file, sha256: createHash('sha256').update(full).digest('hex'), findings });
}
console.log(JSON.stringify({
  scope: 'Review non-code emphasis markers and nested strong nodes. Never auto-replace a finding. Intentional literal prose examples need a recorded human decision. This is not visual or semantic acceptance.',
  files: results.length,
  pagesWithFindings: results.filter(result => result.findings.length).length,
  findings: results.reduce((sum, result) => sum + result.findings.length, 0),
  results,
}, null, 2));
