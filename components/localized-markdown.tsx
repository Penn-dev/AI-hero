import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Link2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

import { CopyCodeButton } from '@/components/copy-code-button';
import { firstGlossaryMatch, headingId, type GlossaryEntry } from '@/lib/article-structure';
import { articleLink } from '@/lib/article-links';

type MdxAttribute = {
  type: 'mdxJsxAttribute';
  name: string;
  value: string | null | { type: string; value?: string };
};

type MarkdownNode = {
  type: string;
  value?: string;
  name?: string;
  attributes?: MdxAttribute[];
  children?: MarkdownNode[];
  data?: {
    hName?: string;
    hProperties?: Record<string, string>;
  };
};

type HastNode = {
  type: string;
  value?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const supportedComponents = new Set(['SkillsCta', 'SkillsNewsletterCta']);
const supportedHtmlElements = new Set(['details', 'summary']);

function markdownText(node: MarkdownNode): string {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? []).map(markdownText).join('');
}

function stringAttributes(node: MarkdownNode) {
  return Object.fromEntries(
    (node.attributes ?? []).map((attribute) => {
      if (attribute.type !== 'mdxJsxAttribute' || typeof attribute.value !== 'string') {
        throw new Error(`Unsupported dynamic MDX attribute on ${node.name ?? 'unknown component'}`);
      }
      return [attribute.name, attribute.value];
    }),
  );
}

function transformMdxNode(node: MarkdownNode): MarkdownNode {
  if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
    if (node.name === 'Scrollycoding') {
      const children = (node.children ?? [])
        .filter((child) => !(child.type === 'heading' && markdownText(child).trim() === '!!steps'))
        .map(transformMdxNode);
      return {
        type: 'blockquote',
        data: { hName: 'section', hProperties: { className: 'scrollycoding-fallback' } },
        children,
      };
    }

    if (node.name && supportedHtmlElements.has(node.name)) {
      if ((node.attributes ?? []).length > 0) {
        throw new Error(`Attributes are not allowed on <${node.name}>`);
      }

      const children = (node.children ?? []).map(transformMdxNode);
      const normalizedChildren =
        node.name === 'details'
          ? children.flatMap((child) => {
              const [firstChild, ...remainingChildren] = child.type === 'paragraph'
                ? (child.children ?? [])
                : [];
              if (firstChild?.data?.hName !== 'summary') return [child];
              if (remainingChildren.length === 0) return [firstChild];
              return [firstChild, { ...child, children: remainingChildren }];
            })
          : children;

      return {
        type: node.name === 'details' ? 'blockquote' : 'emphasis',
        data: { hName: node.name, hProperties: {} },
        children: normalizedChildren,
      };
    }

    if (!node.name || !supportedComponents.has(node.name)) {
      throw new Error(`Unsupported MDX component: ${node.name ?? 'anonymous'}`);
    }

    const attributes = stringAttributes(node);
    const newsletter = node.name === 'SkillsNewsletterCta';
    return {
      type: 'paragraph',
      data: {
        hName: 'aside',
        hProperties: {
          'data-content-card': newsletter ? 'newsletter' : 'skills',
          'data-heading': attributes.heading ?? '',
          'data-subtitle': attributes.subtitle ?? '',
          'data-cta': attributes.cta ?? (newsletter ? '查看免费课程' : '查看 Skill 集合'),
        },
      },
      children: [],
    };
  }

  if (node.children) node.children = node.children.map(transformMdxNode);
  return node;
}

function remarkLocalizedMdx() {
  return (tree: MarkdownNode) => transformMdxNode(tree);
}

function createGlossaryPlugin(entries: GlossaryEntry[]) {
  return () => (tree: HastNode) => {
    const seen = new Set<string>();
    const terms = [...entries].sort((left, right) => right.term.length - left.term.length);
    const ignoredTags = new Set(['a', 'button', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

    function visit(node: HastNode, ignored = false) {
      const skip = ignored || Boolean(node.tagName && ignoredTags.has(node.tagName));
      if (!node.children) return;

      node.children = node.children.flatMap((child) => {
        if (skip || child.type !== 'text' || !child.value) {
          visit(child, skip);
          return [child];
        }

        const output: HastNode[] = [];
        let remaining = child.value;
        while (remaining) {
          const match = firstGlossaryMatch(remaining, terms, seen);
          if (!match) {
            output.push({ type: 'text', value: remaining });
            break;
          }
          if (match.index > 0) output.push({ type: 'text', value: remaining.slice(0, match.index) });
          output.push({
            type: 'element',
            tagName: 'button',
            properties: {
              type: 'button',
              className: ['glossary-term'],
              'data-glossary-id': match.entry.id,
              title: `查看术语解释：${match.entry.term}`,
              'aria-label': `查看“${match.entry.term}”的术语解释`,
            },
            children: [{ type: 'text', value: match.text }],
          });
          seen.add(match.entry.id);
          remaining = remaining.slice(match.index + match.text.length);
        }
        return output;
      });
    }

    visit(tree);
  };
}

function reactText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(reactText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return reactText(node.props.children);
  return '';
}

function linkedHeadingId(node: ReactNode): string | null {
  if (Array.isArray(node)) {
    for (const child of node) {
      const id = linkedHeadingId(child);
      if (id) return id;
    }
    return null;
  }
  if (!isValidElement<{ children?: ReactNode; href?: string }>(node)) return null;
  if (typeof node.props.href === 'string' && node.props.href.startsWith('#')) {
    return node.props.href.slice(1);
  }
  return linkedHeadingId(node.props.children);
}

function Heading({ level, children, headingId: id, showAnchor, ...props }: ComponentPropsWithoutRef<'h2'> & { level: 2 | 3 | 4; headingId: string; showAnchor: boolean }) {
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  return (
    <Tag id={id} {...props}>
      {children}
      {showAnchor ? <a className="heading-anchor" href={`#${id}`} aria-label={`前往“${reactText(children)}”章节`} title="复制或分享本节链接"><Link2 aria-hidden="true" /></a> : null}
    </Tag>
  );
}

export function LocalizedMarkdown({
  markdown,
  glossary = [],
  headingIdPrefix,
  showHeadingAnchors = true,
  copyLongQuotes = false,
  exercise = false,
  availableRoutes,
  explainLinkedTerms = false,
  chineseOnlyLinks = false,
}: {
  markdown: string;
  glossary?: GlossaryEntry[];
  headingIdPrefix?: string;
  showHeadingAnchors?: boolean;
  copyLongQuotes?: boolean;
  exercise?: boolean;
  availableRoutes?: string[];
  explainLinkedTerms?: boolean;
  chineseOnlyLinks?: boolean;
}) {
  const translatedRoutes = availableRoutes ? new Set(['/', ...availableRoutes]) : undefined;
  const headingCounts = new Map<string, number>();
  function nextHeadingId(children: ReactNode) {
    const baseId = linkedHeadingId(children) || headingId(reactText(children));
    const count = (headingCounts.get(baseId) ?? 0) + 1;
    headingCounts.set(baseId, count);
    const uniqueId = count === 1 ? baseId : `${baseId}-${count}`;
    return headingIdPrefix ? `${headingIdPrefix}-${uniqueId}` : uniqueId;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMdx, remarkLocalizedMdx]}
      rehypePlugins={glossary.length > 0 ? [createGlossaryPlugin(glossary)] : []}
      components={{
        aside({ node: _node, ...props }) {
          if ('data-content-card' in props && props['data-content-card']) return null;
          return <aside {...props} />;
        },
        h2({ node: _node, ...props }) {
          return <Heading level={2} headingId={nextHeadingId(props.children)} showAnchor={showHeadingAnchors} {...props} />;
        },
        h3({ node: _node, ...props }) {
          return <Heading level={3} headingId={nextHeadingId(props.children)} showAnchor={showHeadingAnchors} {...props} />;
        },
        h4({ node: _node, ...props }) {
          return <Heading level={4} headingId={nextHeadingId(props.children)} showAnchor={showHeadingAnchors} {...props} />;
        },
        a({ node: _node, href, children, ...props }) {
          const link = articleLink(href, translatedRoutes);
          const external = link.href?.startsWith('http');
          const label = reactText(children);
          const match = explainLinkedTerms ? firstGlossaryMatch(label, glossary, new Set()) : undefined;
          const term = match?.index === 0 && match.text.length === label.length ? match.entry : undefined;
          if (chineseOnlyLinks && (link.untranslated || external)) return term ? <button type="button" className="glossary-term" data-glossary-id={term.id} aria-label={`查看“${term.term}”的术语解释`}>{children}</button> : <>{children}</>;
          if (term) return <><button type="button" className="glossary-term" data-glossary-id={term.id} aria-label={`查看“${term.term}”的术语解释`}>{children}</button><a className="term-source-link" href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={`查看“${term.term}”的${link.untranslated ? '英文' : ''}来源${external ? '（新窗口）' : ''}`} title="查看来源">↗</a></>;
          return <a {...props} href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} aria-label={link.untranslated ? `${label}（英文原文，新窗口打开）` : props['aria-label']} title={link.untranslated ? '打开英文原文（新窗口）' : props.title}>{children}{link.untranslated ? <span className="source-link-language" aria-hidden="true">{'\u2060'}↗</span> : null}</a>;
        },
        table({ node: _node, ...props }) {
          return <div className="table-scroll" tabIndex={0} aria-label="可横向滚动的表格"><table {...props} /></div>;
        },
        pre({ node: _node, children, ...props }) {
          const child = Array.isArray(children) ? children[0] : children;
          const code = isValidElement<{ children?: ReactNode; className?: string }>(child)
            ? reactText(child.props.children).replace(/\n$/, '')
            : reactText(children).replace(/\n$/, '');
          const language = isValidElement<{ className?: string }>(child)
            ? child.props.className?.replace(/^language-/, '')
            : undefined;
          return (
            <figure className="code-frame" data-language={language || 'code'}>
              <figcaption><span>{exercise ? (code.includes('TODO') ? '待你完成的片段' : '原文代码片段') : language || '代码示例'}</span><CopyCodeButton code={code} /></figcaption>
              <pre {...props}>{children}</pre>
            </figure>
          );
        },
        blockquote({ node: _node, children, ...props }) {
          const text = reactText(children).trim();
          const copyable = copyLongQuotes && text.length > 350;
          return (
            <blockquote className={copyable ? 'copyable-explanation' : undefined} {...props}>
              {copyable ? <div className="explanation-tools"><span>中文理解版</span><CopyCodeButton code={text} /></div> : null}
              {children}
            </blockquote>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
