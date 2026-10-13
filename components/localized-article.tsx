import ReactMarkdown from 'react-markdown';
import contentIndex from '@/content/zh/index.json';

import { ArticleLearningTools } from '@/components/article-learning-tools';
import { ArticleLearningGuide } from '@/components/article-learning-guide';
import { LocalizedMarkdown } from '@/components/localized-markdown';
import { articleSections, glossaryEntries, prepareArticle, splitGlossary } from '@/lib/article-structure';
import { learningGlossary, type LearningProfile } from '@/lib/article-learning';
import { articleLink } from '@/lib/article-links';

export type RelatedReading = {
  title: string;
  description: string;
  href: string;
  format: string;
};

type LocalizedArticleProps = {
  title: string;
  markdown: string;
  sourceUrl: string;
  sourceHash: string;
  translatedAt?: string | null;
  description?: string;
  sourceUpdatedAt?: string;
  author?: string;
  readingTime?: string;
  relatedReading?: RelatedReading[];
  review?: boolean;
  learning?: LearningProfile;
};

export function LocalizedArticle({
  title,
  markdown,
  sourceUrl,
  sourceHash,
  translatedAt,
  description,
  sourceUpdatedAt,
  author = 'Matt Pocock',
  readingTime = '8 分钟',
  relatedReading,
  review = false,
  learning,
}: LocalizedArticleProps) {
  const { articleMarkdown, glossaryMarkdown } = splitGlossary(markdown);
  const article = prepareArticle(articleMarkdown, title);
  const glossary = learningGlossary(learning, glossaryEntries(glossaryMarkdown));
  const chineseOnlyLinks = review && Boolean(learning?.glossary);
  const related = (relatedReading ?? learning?.related ?? []).flatMap(item => {
    if (!learning?.glossary) return [item];
    const link = articleLink(item.href, new Set(Object.keys(contentIndex.pages)));
    return chineseOnlyLinks && (link.untranslated || link.href?.startsWith('http')) ? [] : [{ ...item, href: link.href ?? item.href }];
  });
  const bodySections = articleSections(article.markdown);
  const CheckList = learning?.kind === 'workshop-lesson' ? 'ol' : 'ul';
  const sections = [
    ...(learning ? [{ id: 'learning-start', label: learning.kind === 'dictionary' ? '一句话理解' : '学习起点', level: 2 as const }] : []),
    ...(learning?.bodyTitle || bodySections.length === 0 ? [{ id: 'reading-body', label: learning?.bodyTitle ?? '正文', level: 2 as const }] : []),
    ...bodySections,
    ...(learning?.originalExamples?.length && !learning.originalExamplesInline ? [{ id: 'original-examples', label: '英文对话原例', level: 2 as const }] : []),
    ...(learning?.check ? [{ id: 'learning-check', label: learning.kind === 'workshop-lesson' ? '完成检查' : '学完后的自检', level: 2 as const }] : []),
    ...(related.length ? [{ id: 'related-reading-title', label: learning?.kind === 'dictionary' ? '相关概念' : '关联阅读', level: 2 as const }] : []),
  ];

  return (
    <main data-content-kind={learning?.kind ?? 'article'}>
      <div className="announcement">
        <span>{review ? '审核' : '中文'}</span>
        {review ? '端到端本地化样本' : 'AI Hero 中文学习版'}
      </div>
      <header className="site-header shell">
        <a className="brand" href="/">
          AI<span>Hero</span>
        </a>
        <nav aria-label="文章导航">
          <a href="/">首页</a>
          <a href={learning ? '#learning-start' : '#article-content'}>开始阅读</a>
          {review ? <a href="/review/a-complete-guide-to-agents-md/compare">对比译稿</a> : null}
          {!chineseOnlyLinks ? <a href={sourceUrl} target="_blank" rel="noreferrer">英文原文</a> : null}
        </nav>
        {!chineseOnlyLinks ? <a className="search-link" href={sourceUrl} target="_blank" rel="noreferrer">
          查看英文原文 ↗
        </a> : null}
      </header>
      <section className="article-hero shell" id="article-start">
        <p className="article-kicker">{review ? '完整页面样本 · 待验收' : learning?.kind === 'dictionary' ? 'AI HERO 中文词典' : learning?.kind === 'workshop-lesson' ? 'AI HERO 课程练习' : 'AI HERO 中文教程'}</p>
        <h1 className="article-title">{title}</h1>
        {description ? <p className="article-description">{description}</p> : null}
        <div className="article-byline" aria-label="文章信息">
          <span>{author}</span><span>{readingTime}阅读</span>
          {sourceUpdatedAt ? <span>原文更新于 {new Date(sourceUpdatedAt).toLocaleDateString('zh-CN')}</span> : null}
        </div>
      </section>
      <div className="article-layout shell">
        <article className="article-shell" id="article-content">
          {learning ? <ArticleLearningGuide profile={learning} glossary={glossary} /> : null}
          <div className="markdown-body" id="reading-body">
            {learning?.bodyTitle ? <h2>{learning.bodyTitle}</h2> : null}
            <p className="article-reading-hint">{learning?.glossary ? '点击带虚线的术语查看解释；旁边的 ↗ 打开对应中文词条或原文资源。' : '↗ 表示英文原文链接。'}</p>
            <LocalizedMarkdown markdown={article.markdown} glossary={glossary} copyLongQuotes exercise={learning?.kind === 'workshop-lesson'} explainLinkedTerms={Boolean(learning?.glossary)} chineseOnlyLinks={chineseOnlyLinks} availableRoutes={Object.keys(contentIndex.pages)} />
          </div>
          {learning?.originalExamples?.length && !learning.originalExamplesInline ? <section className="original-examples" id="original-examples" aria-labelledby="original-examples-title">
            <p className="learning-label">对应上文的中文用法</p>
            <h2 id="original-examples-title">英文对话原例</h2>
            {learning.originalExamples.map((example) => <blockquote lang="en" key={example.text}>{example.text}</blockquote>)}
          </section> : null}
          {article.emptySections.length ? <aside className="learning-note source-note">
            <strong>关于视频文字稿</strong>
            <p>本次获取的英文原文只有文字稿标题，没有提供文字稿内容。需要视频或配套材料时，请<a href={sourceUrl} target="_blank" rel="noreferrer">查看课程原页</a>。</p>
          </aside> : null}
          {learning?.check ? <section className="learning-check" id="learning-check" aria-labelledby="learning-check-title">
            <p className="learning-label">中文学习辅助</p>
            <h2 id="learning-check-title">{learning.check.title}</h2>
            {learning.check.questions ? <dl className="learning-questions">{learning.check.questions.map((item) => <div key={item.question}><dt><span>问</span>{item.question}</dt><dd><span>答</span>{item.answer}</dd></div>)}</dl> : <CheckList>
              {learning.check.items.map((item) => <li key={item}><ReactMarkdown allowedElements={['p', 'code']} unwrapDisallowed components={{ p: ({ children }) => <>{children}</> }}>{item}</ReactMarkdown></li>)}
            </CheckList>}
          </section> : null}
          {related.length > 0 ? (
            <section className="related-reading" aria-labelledby="related-reading-title">
              <p className="article-kicker">下一步学习</p>
              <h2 id="related-reading-title">{learning?.kind === 'dictionary' ? '相关概念与延伸阅读' : '关联阅读'}</h2>
              <div className="related-grid">
                {related.map((item) => (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} key={item.href}>
                    <span>{item.format}</span>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <em>{item.href.startsWith('http') ? '打开原文资源 ↗' : '继续阅读中文内容'}</em>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
          <footer className="article-meta">
            <span>作者：{author}</span>
            {sourceUpdatedAt ? <span>原文更新：{new Date(sourceUpdatedAt).toLocaleDateString('zh-CN')}</span> : null}
            {!chineseOnlyLinks ? <a href={sourceUrl} target="_blank" rel="noreferrer">查看英文原文 ↗</a> : null}
            {review ? (
              <details className="review-metadata">
                <summary>查看审核信息</summary>
                <p>源文校验：{sourceHash.slice(0, 12)}</p>
                {translatedAt ? <p>样本生成：{new Date(translatedAt).toLocaleDateString('zh-CN')}</p> : null}
              </details>
            ) : null}
          </footer>
        </article>
        <ArticleLearningTools sections={sections} glossary={glossary} />
      </div>
    </main>
  );
}
