import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import content from '@/content/zh/index.json';
import { LocalizedArticle } from '@/components/localized-article';
import { learningProfile } from '@/lib/article-learning';

type PageEntry = {
  title: string;
  description?: string;
  markdown: string;
  sourceUrl: string;
  sourceHash: string;
  sourceUpdatedAt?: string;
  translatedAt?: string;
  readingTime?: string;
};

type ContentIndex = {
  generatedAt: string | null;
  pages: Record<string, PageEntry>;
};

const index: ContentIndex = content;

function routeFor(slug: string[]) {
  return `/${slug.map((part) => encodeURIComponent(decodeURIComponent(part))).join('/')}`;
}

export function generateStaticParams() {
  return Object.keys(index.pages).filter((route) => route !== '/').map((route) => ({ slug: route.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = index.pages[routeFor(slug)];
  return page ? { title: `${page.title} | AI Hero 中文学习版`, description: `AI Hero 教程《${page.title}》的中文本地化版本` } : {};
}

export default async function LocalizedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const route = routeFor(slug);
  const page = index.pages[route];
  if (!page) notFound();

  return <LocalizedArticle title={page.title} description={page.description} markdown={page.markdown} sourceUrl={page.sourceUrl} sourceHash={page.sourceHash} sourceUpdatedAt={page.sourceUpdatedAt} translatedAt={page.translatedAt} readingTime={page.readingTime} learning={learningProfile(route)} />;
}
