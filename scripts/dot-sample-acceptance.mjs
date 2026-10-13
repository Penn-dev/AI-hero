import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const browserRoot = process.env.DOT_BROWSER_ROOT;
const evidenceDir = process.env.DOT_EVIDENCE_DIR;
assert.ok(browserRoot && evidenceDir, 'Isolated browser and evidence directories are required');
const require = createRequire(path.join(browserRoot, 'package.json'));
const { chromium, expect } = require('@playwright/test');
const baseUrl = 'http://127.0.0.1:4321';
const samples = [
  { id: 'system-prompt', route: '/ai-coding-dictionary/system-prompt', title: '系统提示词' },
  { id: 'agents-md', route: '/a-complete-guide-to-agents-md', title: 'AGENTS.md 完整指南' },
  { id: 'output', route: '/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k', title: '通过 Output 生成对象' },
];
const report = {
  repository: process.env.GITHUB_REPOSITORY, commit: process.env.GITHUB_SHA,
  runId: process.env.GITHUB_RUN_ID, node: process.version,
  scope: 'Three preserved samples: real page interaction, clipboard, anchors, desktop/mobile layout. Not semantic review or Windows acceptance.',
  startedAt: new Date().toISOString(), status: 'running', pages: [], screenshots: [],
};
await mkdir(evidenceDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
report.browser = { name: 'Chromium', version: browser.version(), playwright: require('@playwright/test/package.json').version };
const hash = text => createHash('sha256').update(text).digest('hex');

async function screenshot(page, filename, result) {
  const file = path.join(evidenceDir, filename);
  await page.screenshot({ path: file, fullPage: false, animations: 'disabled' });
  const bytes = await readFile(file);
  report.screenshots.push({ file: filename, viewport: result.viewport, url: page.url(), bytes: bytes.length, sha256: hash(bytes) });
}

async function copyFigure(page, figure, expected, result, label) {
  await expect(figure).toBeVisible();
  await expect(figure.locator('pre code')).toHaveText(expected + '\n');
  await figure.getByRole('button', { name: '复制代码', exact: true }).click();
  await expect(figure.getByRole('button', { name: '复制代码', exact: true })).toContainText('已复制');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  assert.equal(copied, expected, `${label}: the real clipboard must match the complete text`);
  result.clipboard.push({ label, chars: copied.length, sha256: hash(copied), match: true });
}

async function glossary(page, result, term) {
  const button = page.locator('#reading-body button.glossary-term').filter({ hasText: term }).first();
  await button.click();
  const panel = result.mobile ? page.locator('[data-slot="sheet-content"]') : page.locator('.desktop-glossary');
  await expect(panel).toBeVisible();
  await expect(panel.locator('.glossary-list')).toContainText(term);
  await screenshot(page, `${result.id}-${result.viewport.width}-term.png`, result);
  if (result.mobile) {
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
  } else {
    await page.getByRole('button', { name: '返回目录', exact: true }).click();
    await expect(panel).toBeHidden();
  }
  result.checks.push(`Term explanation opens and closes: ${term}`);
}

async function independentTermLink(page, result) {
  const link = page.locator('#reading-body .term-source-link[href^="/"]').first();
  assert.ok(await link.count(), 'There must be an independent link to an existing Chinese term page');
  const href = await link.getAttribute('href');
  await link.click();
  await page.waitForURL(baseUrl + href);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  result.checks.push(`Independent term link opens a Chinese page: ${href}`);
  await page.goBack({ waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(samples.find(sample => sample.id === result.id).title);
}

async function currentOutline(page, result, id) {
  if (result.mobile) await page.locator('#mobile-contents-trigger').click();
  await expect(page.locator('.article-outline:visible a[aria-current="location"]')).toHaveAttribute('href', '#' + id);
  if (result.mobile) await page.keyboard.press('Escape');
}

async function anchorAndRefresh(page, result, explicitId) {
  const heading = explicitId ? page.locator(`[id="${explicitId}"]`).first() : page.locator('#reading-body h2[id]').first();
  const id = await heading.getAttribute('id');
  assert.ok(id, 'The article heading must have a stable ID');
  const title = await heading.textContent();
  await page.goto(baseUrl + result.route + '#' + encodeURIComponent(id), { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.locator(`[id="${id}"]`).first()).toHaveText(title);
  assert.equal(decodeURIComponent(new URL(page.url()).hash.slice(1)), id);
  await expect.poll(async () => Math.abs(await heading.evaluate(element => element.getBoundingClientRect().top))).toBeLessThan(180);
  result.checks.push(`Direct deep link and refresh preserve the heading: ${id}`);
  await screenshot(page, `${result.id}-${result.viewport.width}-anchor.png`, result);
  await currentOutline(page, result, id);
  result.checks.push(`Visible contents highlight matches the refreshed heading: ${id}`);
  const next = page.locator('#reading-body h2[id]').last();
  const nextId = await next.getAttribute('id');
  assert.ok(nextId && nextId !== id, 'A second section is required for the ordinary-scroll check');
  const offset = await next.evaluate(element => element.getBoundingClientRect().top - 70);
  await page.mouse.wheel(0, offset);
  await expect.poll(async () => Math.abs(await next.evaluate(element => element.getBoundingClientRect().top) - 70)).toBeLessThan(20);
  await currentOutline(page, result, nextId);
  result.checks.push(`Ordinary page scrolling updates the contents highlight: ${nextId}`);
  await screenshot(page, `${result.id}-${result.viewport.width}-scrolled-section.png`, result);
}

async function checkSample(sample, viewport, mobile) {
  const result = { ...sample, viewport, mobile, checks: [], clipboard: [], pageErrors: [], sameOriginHttpErrors: [], status: 'running' };
  report.pages.push(result);
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => result.pageErrors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(baseUrl + '/') && response.status() >= 400) result.sameOriginHttpErrors.push({ url: response.url(), status: response.status() });
  });
  try {
    const response = await page.goto(baseUrl + sample.route, { waitUntil: 'networkidle', timeout: 30000 });
    assert.equal(response?.status(), 200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(sample.title);
    await expect(page.locator('#reading-body')).toBeVisible();
    result.width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    assert.ok(result.width.scroll <= result.width.client + 1, 'Page must not overflow horizontally');
    const original = page.getByRole('navigation', { name: '文章导航' }).getByRole('link', { name: '英文原文', exact: true });
    await expect(original).toHaveAttribute('href', 'https://www.aihero.dev' + sample.route);
    await expect(original).toHaveAttribute('target', '_blank');
    result.checks.push('HTTP 200, actual Chinese article, no page overflow, explicit original-page entry');
    await screenshot(page, `${sample.id}-${viewport.width}-top.png`, result);

    if (sample.id === 'system-prompt') {
      await expect(page.locator('#reading-body')).toContainText('Two harnesses, same model, totally different behavior on the same prompt.');
      await expect(page.locator('#reading-body')).toContainText("Different system prompts. One's tuned for terse code edits, the other for explaining");
      await expect(page.locator('#reading-body')).toContainText('两个执行框架使用同一个模型');
      await glossary(page, result, 'Token');
      await independentTermLink(page, result);
      result.checks.push('Both English examples and their Chinese explanations remain visible');
      await page.locator('#reading-body blockquote').first().scrollIntoViewIfNeeded();
      await screenshot(page, `${sample.id}-${viewport.width}-examples.png`, result);
      const secondExample = page.locator('#reading-body blockquote').filter({ hasText: "Different system prompts. One's tuned for terse code edits" });
      await secondExample.scrollIntoViewIfNeeded();
      await expect(secondExample).toBeVisible();
      const secondChinese = page.locator('#reading-body p').filter({ hasText: '因为系统提示词不同。一个侧重简洁地修改代码' });
      await expect(secondChinese).toBeVisible();
      await screenshot(page, `${sample.id}-${viewport.width}-second-example.png`, result);
    }
    if (sample.id === 'agents-md') {
      await glossary(page, result, 'Markdown');
      await independentTermLink(page, result);
      for (const name of ['CLAUDE.md', 'Corepack']) {
        const details = page.locator('details').filter({ has: page.locator('summary').filter({ hasText: name }) }).first();
        const summary = details.locator('summary');
        await summary.click();
        await expect(details).toHaveAttribute('open', '');
        await screenshot(page, `${sample.id}-${viewport.width}-${name.replace('.', '-')}.png`, result);
        await summary.click();
        await expect(details).not.toHaveAttribute('open', '');
      }
      const body = await readFile('content/learning/agents-md/article.md', 'utf8');
      const expected = [...body.matchAll(/```text\r?\n([\s\S]*?)\r?\n```/g)].map(match => match[1].replace(/\r\n/g, '\n')).find(text => text.startsWith('我希望你重构我的'));
      assert.ok(expected && expected.includes('5.'), 'Expected full five-step Chinese prompt must be present');
      const figure = page.locator('figure.code-frame').filter({ hasText: '我希望你重构我的' }).first();
      await copyFigure(page, figure, expected, result, 'Complete Chinese five-step prompt');
      await screenshot(page, `${sample.id}-${viewport.width}-prompt.png`, result);
      await anchorAndRefresh(page, result);
    }
    if (sample.id === 'output') {
      await expect(page.locator('.source-note')).toContainText('没有提供文字稿内容');
      const solution = page.locator('#reading-body a').filter({ hasText: '解答入口（原站，未取得正文）' });
      await expect(solution).toHaveAttribute('href', 'https://www.aihero.dev' + sample.route + '/solution');
      await expect(solution).toHaveAttribute('target', '_blank');
      const sourceNote = page.locator('.source-note');
      await sourceNote.scrollIntoViewIfNeeded();
      await expect(sourceNote).toBeVisible();
      const lowerSolution = page.locator('#reading-body a').filter({ hasText: '通过 Output 生成对象：解答入口（原站）' });
      await expect(lowerSolution).toBeVisible();
      await expect(lowerSolution).toHaveAttribute('href', 'https://www.aihero.dev' + sample.route + '/solution');
      await screenshot(page, `${sample.id}-${viewport.width}-resources.png`, result);
      const texts = ['请写出一个发生在虚构星球上的故事的第一段。', '关于这个虚构星球的事实。请用科学家的口吻写。'];
      for (const text of texts) {
        const figure = page.locator('figure.code-frame').filter({ has: page.locator('pre code').filter({ hasText: text }) }).first();
        await expect(figure.locator('figcaption span')).toHaveText('文本片段');
        await copyFigure(page, figure, text, result, text);
      }
      const source = await readFile('content/source/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k.md', 'utf8');
      const code = [...source.matchAll(/```[^\r\n]*\r?\n([\s\S]*?)\r?\n```/g)].map(match => match[1].replace(/\r\n/g, '\n'));
      assert.equal(code.length, 2);
      for (let index = 0; index < code.length; index++) {
        const figure = page.locator('figure.code-frame[data-language="typescript"]').nth(index);
        await copyFigure(page, figure, code[index], result, `Original code block ${index + 1}`);
      }
      await screenshot(page, `${sample.id}-${viewport.width}-code.png`, result);
      await anchorAndRefresh(page, result, 'steps-to-complete');
      result.checks.push('Current text/code captions, missing-transcript notice, correct original Solution URL, original code and Chinese prompt clipboard comparison');
    }
    assert.deepEqual(result.pageErrors, []);
    assert.deepEqual(result.sameOriginHttpErrors, []);
    result.status = 'passed';
  } catch (error) {
    result.status = 'failed';
    result.error = { name: error.name, message: error.message, stack: error.stack };
    try { await screenshot(page, `${sample.id}-${viewport.width}-failure.png`, result); } catch (captureError) { result.screenshotError = captureError.message; }
  } finally {
    await context.close();
    await writeFile(path.join(evidenceDir, 'browser-results.json'), JSON.stringify(report, null, 2) + '\n');
  }
}
try {
  for (const sample of samples) {
    await checkSample(sample, { width: 1440, height: 1000 }, false);
    await checkSample(sample, { width: 390, height: 844 }, true);
  }
  report.status = report.pages.length === 6 && report.pages.every(page => page.status === 'passed') ? 'passed' : 'failed';
} finally {
  await browser.close();
  report.finishedAt = new Date().toISOString();
  await writeFile(path.join(evidenceDir, 'browser-results.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({ status: report.status, commit: report.commit, pages: report.pages.map(({ id, viewport, status, error }) => ({ id, viewport, status, error })) }, null, 2));
if (report.status !== 'passed') process.exitCode = 1;
