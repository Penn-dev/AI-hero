'use client';

import { LocalizedMarkdown } from '@/components/localized-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Version = {
  key: 'source' | 'terra' | 'final';
  label: string;
  markdown?: string;
  className?: string;
  lang?: string;
};

function VersionBody({ version, idPrefix }: { version: Version; idPrefix: string }) {
  return (
    <article className={`compare-column ${version.className ?? ''}`} lang={version.lang}>
      <span>{version.label}</span>
      {version.markdown ? <div className="markdown-body"><LocalizedMarkdown markdown={version.markdown} headingIdPrefix={`${idPrefix}-${version.key}`} showHeadingAnchors={false} /></div> : <p className="empty-copy">此版本没有对应内容</p>}
    </article>
  );
}

export function ComparisonSection({ id, context, heading, source, terra, final }: { id: string; context?: string; heading: string; source?: string; terra?: string; final?: string }) {
  const versions: Version[] = [
    { key: 'source', label: '英文原文', markdown: source, className: 'source-column', lang: 'en' },
    { key: 'terra', label: 'Terra / medium 初稿', markdown: terra },
    { key: 'final', label: 'Sol / medium 编辑稿', markdown: final, className: 'final-column' },
  ];
  const edited = Boolean(terra && final && terra.replace(/\s+/g, '') !== final.replace(/\s+/g, ''));

  return (
    <section className="compare-section" id={id}>
      <header className="compare-section-heading">
        <div>{context ? <p>{context}</p> : null}<h2>{heading}</h2></div>
        {edited ? <span>Sol 有编辑调整</span> : null}
      </header>
      <div className="compare-grid compare-desktop">
        {versions.map((version) => <VersionBody version={version} idPrefix={`${id}-desktop`} key={version.label} />)}
      </div>
      <Tabs className="compare-mobile" defaultValue="final">
        <TabsList className="compare-tabs-list">
          <TabsTrigger value="final">Sol 编辑稿</TabsTrigger>
          <TabsTrigger value="terra">Terra 初稿</TabsTrigger>
          <TabsTrigger value="source">英文</TabsTrigger>
        </TabsList>
        <TabsContent value="final"><VersionBody version={versions[2]} idPrefix={`${id}-mobile`} /></TabsContent>
        <TabsContent value="terra"><VersionBody version={versions[1]} idPrefix={`${id}-mobile`} /></TabsContent>
        <TabsContent value="source"><VersionBody version={versions[0]} idPrefix={`${id}-mobile`} /></TabsContent>
      </Tabs>
    </section>
  );
}
