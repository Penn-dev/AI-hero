import { notFound } from 'next/navigation';

import { LocalizedArticle } from '@/components/localized-article';
import pilot from '@/content/pilots/v2/index.json';
import { learningProfile } from '@/lib/article-learning';

export default function PilotArticlePage() {
  const page = pilot.final ?? pilot.terra;
  if (!page) notFound();

  return (
    <LocalizedArticle
      title={page.title}
      description={page.description}
      markdown={page.markdown}
      sourceUrl={pilot.sourceUrl}
      sourceHash={pilot.sourceHash}
      sourceUpdatedAt={page.sourceUpdatedAt}
      translatedAt={pilot.generatedAt}
      learning={learningProfile('/a-complete-guide-to-agents-md')}
      review
    />
  );
}
