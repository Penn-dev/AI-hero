import Link from 'next/link';
import type { Metadata } from 'next';
import content from '@/content/zh/index.json';
import { LocalizedArticle } from '@/components/localized-article';

const home = content.pages['/'];

export const metadata: Metadata = {
  title: `${home.title} | AI Hero 中文学习版`,
  description: '依据固定公开来源制作的 AI Hero 中文学习版。',
};

export default function Home() {
  return <>
    <LocalizedArticle {...home} />
    <nav className="shell markdown-body" aria-label="全部中文页面" id="all-pages">
      <h2>全部中文页面</h2>
      <p>以下是本站导航，不属于英文首页正文。</p>
      <details>
        <summary>展开全部 {Object.keys(content.pages).length - 1} 个中文页面</summary>
        <ul>
          {Object.entries(content.pages).filter(([route]) => route !== '/').map(([route, page]) => (
            <li key={route}><Link href={route} prefetch={false}>{page.title}</Link></li>
          ))}
        </ul>
      </details>
    </nav>
  </>;
}
