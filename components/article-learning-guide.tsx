import { CopyCodeButton } from '@/components/copy-code-button';
import type { LearningProfile } from '@/lib/article-learning';
import type { GlossaryEntry } from '@/lib/article-structure';

export function ArticleLearningGuide({ profile, glossary }: { profile: LearningProfile; glossary: GlossaryEntry[] }) {
  const { start } = profile;
  const prerequisites = glossary.filter((entry) => profile.prerequisiteIds.includes(entry.id.replace(/^term-/, '')));
  return (
    <section className={`learning-start learning-start--${profile.kind}`} id="learning-start" aria-labelledby="learning-start-title">
      <p className="learning-label">中文学习辅助</p>
      <h2 id="learning-start-title">{start.title}</h2>
      {start.summary ? <p className="learning-summary">{start.summary}</p> : null}
      <div className="learning-start-grid">
        {start.cards.map((card) => <div key={card.title}><strong>{card.title}</strong><p>{card.text}</p></div>)}
      </div>
      {prerequisites.length ? <div className="learning-prerequisites">
        <p>先认识这几个词 <span>点击即可查看解释</span></p>
        <div>{prerequisites.map((entry) => <button type="button" className="prerequisite-term" data-glossary-id={entry.id} key={entry.id}>{entry.term}</button>)}</div>
      </div> : null}
      {start.example ? <div className="starter-example">
        <div><span>可直接理解的最小示例</span><CopyCodeButton code={start.example.text} /></div>
        <pre><code>{start.example.text}</code></pre>
        <p>{start.example.explanation}</p>
      </div> : null}
    </section>
  );
}
