import Link from 'next/link';
import { notFound } from 'next/navigation';
import pages from '@/content/pilots/flow-validation/rendered/pages.json';
import { ArticleLearningGuide } from '@/components/article-learning-guide';
import { ArticleLearningTools } from '@/components/article-learning-tools';
import { LocalizedMarkdown } from '@/components/localized-markdown';
import { articleSections } from '@/lib/article-structure';
import { articleLink } from '@/lib/article-links';
import type { LearningProfile } from '@/lib/article-learning';

export default async function FlowPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (variant !== 'x' && variant !== 'y') notFound();
  const page = pages[variant === 'x' ? 'X' : 'Y'];
  const aid = page.learning;
  const glossary = aid.glossary.map(g => ({ id: `term-${g.id}`, term: g.term, aliases: g.aliases, definition: g.definition }));
  const profile: LearningProfile = { kind: 'dictionary', sourceIds: [], conceptIds: [], prerequisiteIds: aid.prerequisiteIds, start: aid.start, bodyTitle: aid.bodyTitle, related: [] };
  const sections = [{ id: 'learning-start', label: aid.start.title, level: 2 as const }, { id: 'reading-body', label: aid.bodyTitle, level: 2 as const }, ...articleSections(page.markdown), { id: 'article-terms', label: '本文术语', level: 2 as const }, ...(aid.related.length ? [{ id: 'related-reading-title', label: '相关概念', level: 2 as const }] : [])];
  return <main data-content-kind="dictionary" data-review-label={page.label}>
    <div className="announcement"><span>审核 {page.label}</span>系统提示词 · 完整页面</div>
    <header className="site-header shell"><Link className="brand" href="/review/flow-validation">AI<span>Hero</span></Link><nav aria-label="对照导航"><Link href="/review/flow-validation">对照入口</Link><a href="#learning-start">开始阅读</a><Link href={`/review/flow-validation/${variant === 'x' ? 'y' : 'x'}`}>另一页面</Link></nav></header>
    <section className="article-hero shell"><p className="article-kicker">页面 {page.label} · 待治理验收</p><h1 className="article-title">{page.title}</h1><p className="article-description">{page.description}</p><div className="article-byline"><span>作者：Matt Pocock</span><span>原文更新：{page.updatedAt.slice(0, 10)}</span></div></section>
    <div className="article-layout shell"><article className="article-shell" id="article-content">
      <ArticleLearningGuide profile={profile} glossary={glossary} />
      <div className="markdown-body" id="reading-body"><h2>{aid.bodyTitle}</h2><p className="article-reading-hint">↗ 表示英文原文链接。</p><LocalizedMarkdown markdown={page.markdown} glossary={glossary} availableRoutes={[]} /></div>
      <section id="article-terms" className="learning-prerequisites"><h2>本文术语</h2><p className="learning-label">中文学习辅助 · 点击查看本页提供的解释</p><div>{glossary.map(g => <button type="button" className="prerequisite-term" data-glossary-id={g.id} key={g.id}>{g.term}</button>)}</div></section>
      {aid.sourceGaps.map((gap, i) => <aside className="learning-note source-note" key={i}>{gap}</aside>)}
      {aid.related.length ? <section className="related-reading" aria-labelledby="related-reading-title"><h2 id="related-reading-title">相关概念</h2><div className="related-grid">{aid.related.map(r => <a key={r.href} href={articleLink(r.href, new Set()).href} target="_blank" rel="noreferrer"><span>{r.format}</span><strong>{r.title}</strong><p>{r.description}</p><em>打开英文原文 ↗</em></a>)}</div></section> : null}
    </article><ArticleLearningTools sections={sections} glossary={glossary} /></div>
  </main>;
}
