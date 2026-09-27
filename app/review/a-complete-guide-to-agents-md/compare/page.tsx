import Link from 'next/link';

import { ComparisonSection } from '@/components/comparison-section';
import pilot from '@/content/pilots/v2/index.json';
import { comparisonChunks } from '@/lib/comparison-structure';

export default function PilotComparisonPage() {
  const sourceSections = pilot.source?.sections ?? [];
  const terraSections = pilot.terra?.sections ?? [];
  const finalSections = pilot.final?.sections ?? [];
  const sectionCount = Math.max(sourceSections.length, terraSections.length, finalSections.length);
  const sections = Array.from({ length: sectionCount }, (_, sectionIndex) => {
    const parentHeading = finalSections[sectionIndex]?.heading ?? terraSections[sectionIndex]?.heading ?? sourceSections[sectionIndex]?.heading ?? `第 ${sectionIndex + 1} 节`;
    const sourceChunks = comparisonChunks(sourceSections[sectionIndex]?.markdown, parentHeading);
    const terraChunks = comparisonChunks(terraSections[sectionIndex]?.markdown, parentHeading);
    const finalChunks = comparisonChunks(finalSections[sectionIndex]?.markdown, parentHeading);
    const chunkCount = Math.max(sourceChunks.length, terraChunks.length, finalChunks.length);
    return Array.from({ length: chunkCount }, (_, chunkIndex) => ({
      id: `compare-${sectionIndex + 1}-${chunkIndex + 1}`,
      context: chunkIndex > 0 ? parentHeading : undefined,
      heading: finalChunks[chunkIndex]?.heading ?? terraChunks[chunkIndex]?.heading ?? sourceChunks[chunkIndex]?.heading ?? parentHeading,
      source: sourceChunks[chunkIndex]?.markdown,
      terra: terraChunks[chunkIndex]?.markdown,
      final: finalChunks[chunkIndex]?.markdown,
    }));
  }).flat();

  return (
    <main>
      <div className="announcement"><span>对比</span>英文原文、Terra 初稿与 Sol 编辑稿</div>
      <header className="site-header shell">
        <Link className="brand" href="/" prefetch={false}>AI<span>Hero</span></Link>
        <nav aria-label="样本导航"><Link href="/review/a-complete-guide-to-agents-md" prefetch={false}>最终阅读页</Link></nav>
        <a className="search-link" href={pilot.sourceUrl} target="_blank" rel="noreferrer">英文原文 ↗</a>
      </header>
      <section className="compare-shell">
        <div className="compare-intro">
          <p className="article-kicker">逐节对齐 · 完整上下文</p>
          <h1>译稿对比</h1>
          <p>各栏按章节对齐；中文稿新增的学习辅助内容会单独展示，并明确标注原文无对应章节。</p>
        </div>
        {sections.map((section) => (
          <ComparisonSection {...section} key={section.id} />
        ))}
      </section>
    </main>
  );
}
