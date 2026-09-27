'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button className="copy-code" type="button" onClick={copy} aria-label="复制代码">
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {copied ? '已复制' : '复制'}
    </button>
  );
}
