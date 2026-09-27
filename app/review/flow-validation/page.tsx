import Link from 'next/link';
export default function ComparisonEntry() {
  return <main className="shell article-shell"><h1>系统提示词 · 页面对照</h1><p>两份完整页面采用相同展示能力，内容等待审核。请分别阅读后记录观察。</p><p><Link href="/review/flow-validation/x">打开 X 页面</Link></p><p><Link href="/review/flow-validation/y">打开 Y 页面</Link></p><p>匿名标签仅用于阅读顺序，不代表严格盲测。</p></main>;
}
