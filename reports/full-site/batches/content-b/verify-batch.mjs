import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { validateArticle, nodes, markdownResources, sha256 } = await import(pathToFileURL(path.resolve('scripts/lib/page-content.mjs')));
const batch = process.argv[2];
assert.match(batch ?? '', /^batch-\d{2}$/);
const root = `reports/full-site/batches/content-b/${batch}`;
const manifest = JSON.parse(fs.readFileSync('content/source/manifest.json', 'utf8'));
const results = [];
for (const name of fs.readdirSync(`${root}/configs`).sort()) {
  const config = JSON.parse(fs.readFileSync(`${root}/configs/${name}`, 'utf8'));
  const record = manifest.pages.find(page => page.route === config.route);
  assert.equal(config.source.path, record.sourcePath);
  assert.equal(config.source.sha256, record.sourceHash);
  const source = fs.readFileSync(config.source.path, 'utf8');
  const translation = fs.readFileSync(config.chineseFile, 'utf8');
  assert.equal(sha256(source), config.source.sha256);
  const { tree } = validateArticle(source, translation, record.url);
  const unparsedEmphasis = nodes(tree, node => node.type === 'text' && node.value.includes('**'));
  const nestedStrong = nodes(tree, node => node.type === 'strong' && nodes(node, child => child.type === 'strong').length > 1);
  assert.equal(unparsedEmphasis.length, 0, `${config.route}: unparsed emphasis markers`);
  assert.equal(nestedStrong.length, 0, `${config.route}: nested strong emphasis needs review`);
  results.push({
    route: config.route,
    sourceHash: config.source.sha256,
    translationHash: sha256(translation),
    structuralValidation: 'passed',
    emphasisAst: 'no literal double-asterisk text or nested strong nodes',
    fencedBlocks: nodes(tree, node => node.type === 'code').length,
    headings: nodes(tree, node => node.type === 'heading').length,
    resources: markdownResources(tree),
    assembly: 'not run; integration owner only',
    browser: 'not run',
  });
}
console.log(JSON.stringify({ batch, results }, null, 2));
