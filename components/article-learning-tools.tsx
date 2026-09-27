'use client';

import { useEffect, useRef, useState } from 'react';
import { BookOpenText, ListTree, Search, X } from 'lucide-react';

import type { ArticleSection, GlossaryEntry } from '@/lib/article-structure';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function Contents({ sections, activeId, onNavigate }: { sections: ArticleSection[]; activeId: string; onNavigate?: () => void }) {
  return (
    <nav className="article-outline" aria-label="本文目录">
      {sections.map((section) => (
        <a
          className={section.id === activeId ? 'is-active' : undefined}
          aria-current={section.id === activeId ? 'location' : undefined}
          data-level={section.level}
          href={`#${section.id}`}
          key={section.id}
          onClick={onNavigate}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}

function Glossary({ entries }: { entries: GlossaryEntry[] }) {
  return (
    <dl className="glossary-list">
      {entries.map((entry) => (
        <div data-term-id={entry.id} key={entry.id}>
          <dt>{entry.term}</dt>
          <dd>{entry.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

function GlossarySearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="glossary-search">
      <Search aria-hidden="true" />
      <span className="sr-only">搜索术语</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="搜索术语或解释" />
      {value ? <button type="button" onClick={() => onChange('')} aria-label="清空术语搜索"><X aria-hidden="true" /></button> : null}
    </label>
  );
}

export function ArticleLearningTools({ sections, glossary }: { sections: ArticleSection[]; glossary: GlossaryEntry[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [progress, setProgress] = useState(0);
  const [contentsOpen, setContentsOpen] = useState(false);
  const [desktopGlossaryOpen, setDesktopGlossaryOpen] = useState(false);
  const [mobileGlossaryOpen, setMobileGlossaryOpen] = useState(false);
  const [glossaryQuery, setGlossaryQuery] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');
  const desktopScroller = useRef<HTMLDivElement>(null);
  const selectedTerm = glossary.find((entry) => entry.id === selectedTermId);
  const filteredGlossary = glossary.filter((entry) => `${entry.term} ${(entry.aliases ?? []).join(' ')} ${entry.definition}`.toLocaleLowerCase('zh-CN').includes(glossaryQuery.trim().toLocaleLowerCase('zh-CN')));
  const visibleGlossary = selectedTerm ? [selectedTerm] : filteredGlossary;

  function showAllTerms() {
    setSelectedTermId('');
    setGlossaryQuery('');
  }

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-18% 0px -70% 0px' },
    );
    headings.forEach((heading) => observer.observe(heading));

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, [sections]);

  useEffect(() => {
    function openGlossary(event: Event) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-glossary-id]') : null;
      if (!target) return;
      const termId = target.dataset.glossaryId;
      if (!termId || !glossary.some((entry) => entry.id === termId)) return;
      setGlossaryQuery('');
      setSelectedTermId(termId);
      if (window.matchMedia('(max-width: 820px)').matches) setMobileGlossaryOpen(true);
      else setDesktopGlossaryOpen(true);
    }
    document.addEventListener('click', openGlossary);
    return () => document.removeEventListener('click', openGlossary);
  }, [glossary]);

  useEffect(() => {
    desktopScroller.current?.scrollTo({ top: 0 });
  }, [desktopGlossaryOpen, selectedTermId]);

  return (
    <>
      <div className="reading-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <aside className="article-tools" aria-label="学习工具">
        <div className="article-tools-sticky" ref={desktopScroller}>
          <button className="glossary-open" type="button" onClick={() => { showAllTerms(); setDesktopGlossaryOpen((open) => !open); }}>
            {desktopGlossaryOpen ? <ListTree aria-hidden="true" /> : <BookOpenText aria-hidden="true" />}
            {desktopGlossaryOpen ? '返回目录' : `术语速查 · ${glossary.length}`}
          </button>
          {desktopGlossaryOpen ? (
            <section className="desktop-glossary" aria-label={selectedTerm ? '术语解释' : '术语速查'}>
              {selectedTerm ? (
                <button className="glossary-all" type="button" onClick={showAllTerms}>查看全部术语</button>
              ) : (
                <>
                  <p className="tool-copy">点击正文中的术语，右侧只显示这个词的解释。</p>
                  <GlossarySearch value={glossaryQuery} onChange={setGlossaryQuery} />
                </>
              )}
              <div aria-live="polite" aria-atomic="true">
                {visibleGlossary.length ? <Glossary entries={visibleGlossary} /> : <p className="empty-copy">没有匹配的术语</p>}
              </div>
            </section>
          ) : (
            <>
              <p className="tool-label">本文目录</p>
              <Contents sections={sections} activeId={activeId} />
            </>
          )}
        </div>
      </aside>
      <div className="mobile-learning-bar" aria-label="移动端学习工具">
        <Sheet open={contentsOpen} onOpenChange={setContentsOpen}>
          <SheetTrigger id="mobile-contents-trigger" className="mobile-tool-button"><ListTree aria-hidden="true" />目录</SheetTrigger>
          <SheetContent className="learning-sheet" side="bottom">
            <SheetHeader>
              <SheetTitle>本文目录</SheetTitle>
              <SheetDescription>选择章节，快速回到需要学习的位置。</SheetDescription>
            </SheetHeader>
            <div className="learning-sheet-body"><Contents sections={sections} activeId={activeId} onNavigate={() => setContentsOpen(false)} /></div>
          </SheetContent>
        </Sheet>
        <Sheet open={mobileGlossaryOpen} onOpenChange={setMobileGlossaryOpen}>
          <SheetTrigger id="mobile-glossary-trigger" className="mobile-tool-button" onClick={showAllTerms}><BookOpenText aria-hidden="true" />术语</SheetTrigger>
          <SheetContent className="learning-sheet" side="bottom">
            <SheetHeader>
              <SheetTitle>{selectedTerm ? '术语解释' : '术语速查'}</SheetTitle>
              <SheetDescription>{selectedTerm ? '这里显示你刚才点击的词及其解释。' : '搜索本文中的术语和解释。'}</SheetDescription>
            </SheetHeader>
            <div className="learning-sheet-search">
              {selectedTerm ? <button className="glossary-all" type="button" onClick={showAllTerms}>查看全部术语</button> : <GlossarySearch value={glossaryQuery} onChange={setGlossaryQuery} />}
            </div>
            <div className="learning-sheet-body" key={selectedTermId}>
              {visibleGlossary.length ? <Glossary entries={visibleGlossary} /> : <p className="empty-copy">没有匹配的术语</p>}
            </div>
          </SheetContent>
        </Sheet>
        <span className="mobile-progress">{Math.round(progress)}%</span>
      </div>
    </>
  );
}
