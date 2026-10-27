import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateArticle, sha256, nodes } from '../../../scripts/lib/page-content.mjs';

const manifest = JSON.parse(await readFile('content/source/manifest.json', 'utf8'));
for (const path of process.argv.slice(2)) {
  const config = JSON.parse(await readFile(path, 'utf8'));
  const source = manifest.pages.find(page => page.route === config.route);
  assert.equal(config.source.path, source.sourcePath);
  const original = await readFile(config.source.path, 'utf8');
  const chinese = await readFile(config.chineseFile, 'utf8');
  assert.equal(sha256(original), source.sourceHash);
  assert.equal(config.source.sha256, source.sourceHash);
  const { tree } = validateArticle(original, chinese, source.url);
  const literalEmphasis = nodes(tree, node => node.type === 'text' && /(?:_[^_\n]+_|\*\*[^\n]+?\*\*)/.test(node.value));
  assert.equal(literalEmphasis.length, 0, `Unparsed emphasis: ${config.route}`);
  console.log(JSON.stringify({ route: config.route, sourceHash: source.sourceHash, draftHash: sha256(chinese), structure: 'passed', emphasis: 'passed', browser: 'not-run' }));
}
