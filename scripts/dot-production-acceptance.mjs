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
const batch = JSON.parse(await readFile('reports/full-site/browser-batch.json', 'utf8'));
const index = JSON.parse(await readFile('content/zh/index.json', 'utf8'));
const manifest = JSON.parse(await readFile('content/zh/manifest.json', 'utf8'));
const baseUrl = 'http://127.0.0.1:4321';
const hash = value => createHash('sha256').update(value).digest('hex');
const report = {
  batch: batch.id, commit: process.env.GITHUB_SHA, runId: process.env.GITHUB_RUN_ID,
  scope: 'Actual assembled production pages and content-specific structures; reuses unchanged sample interaction evidence. Not semantic review or tutorial execution.',
  startedAt: new Date().toISOString(), pages: [], screenshots: [], status: 'running',
};
await mkdir(evidenceDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
report.browser = { name: 'Chromium', version: browser.version(), playwright: require('@playwright/test/package.json').version };

async function screenshot(page, result, label) {
  const file = `${result.id}-${result.viewport.width}-${label}.png`;
  await page.screenshot({ path: path.join(evidenceDir, file), animations: 'disabled' });
  const bytes = await readFile(path.join(evidenceDir, file));
  report.screenshots.push({ file, url: page.url(), sha256: hash(bytes), bytes: bytes.length });
}

async function check(target, viewport) {
  const config = JSON.parse(await readFile(target.config, 'utf8'));
  const record = manifest.pages.find(page => page.route === config.route);
  assert.ok(record, `Missing assembled page ${config.route}`);
  const body = await readFile(record.translationPath, 'utf8');
  assert.equal(hash(body), record.translationHash);
  const result = { id: target.id, route: config.route, viewport, translationHash: record.translationHash, checks: [], clipboard: [], images: [], errors: [], status: 'running' };
  report.pages.push(result);
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => result.errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(baseUrl + '/') && response.status() >= 400) result.errors.push(`HTTP ${response.status()}: ${response.url()}`);
  });
  try {
    const response = await page.goto(baseUrl + config.route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText(index.pages[config.route].title);
    await expect(page.locator('#reading-body')).toBeVisible();
    const original = page.getByRole('navigation', { name: '文章导航' }).getByRole('link', { name: '英文原文', exact: true });
    await expect(original).toHaveAttribute('href', record.sourceUrl);
    await expect(original).toHaveAttribute('target', '_blank');
    result.checks.push('HTTP 200, Chinese title/body and exact original-source entry');
    if (target.captureTop) await screenshot(page, result, 'top');

    const figures = page.locator('#reading-body figure.code-frame');
    const blocks = [...body.matchAll(/```[^\r\n]*\r?\n([\s\S]*?)\r?\n```/g)].map(match => match[1].replace(/\r\n/g, '\n'));
    assert.equal(await figures.count(), blocks.length, 'Every authored fenced block must render');
    for (let i = 0; i < blocks.length; i++) {
      const figure = figures.nth(i);
      await expect(figure.locator('pre code')).toHaveText(blocks[i] + '\n');
      await figure.getByRole('button', { name: '复制代码', exact: true }).click();
      await expect(figure.getByRole('button', { name: '复制代码', exact: true })).toContainText('已复制');
      const copied = await page.evaluate(() => navigator.clipboard.readText());
      assert.equal(copied, blocks[i], 'Actual clipboard must equal the complete authored block');
      result.clipboard.push({ block: i + 1, chars: copied.length, sha256: hash(copied), match: true });
    }
    for (const img of await page.locator('#reading-body img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
      result.images.push(await img.evaluate(element => ({ src: element.currentSrc, width: element.naturalWidth, alt: element.alt })));
    }
    for (const feature of target.features ?? []) {
      const element = page.locator('#reading-body').locator(feature.selector).filter(feature.text ? { hasText: feature.text } : {}).nth(feature.nth ?? 0);
      await element.scrollIntoViewIfNeeded();
      await expect(element).toBeVisible();
      await screenshot(page, result, feature.label);
      result.checks.push(`Visible content-specific structure: ${feature.label}`);
    }
    for (const heading of await page.locator('#reading-body h2, #reading-body h3, #reading-body h4, #reading-body h5, #reading-body h6').all()) {
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeInViewport();
    }
    const width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    assert.ok(width.scroll <= width.client + 1, 'Document must not overflow horizontally');
    result.width = width;
    result.checks.push('All section headings reachable; images loaded; document has no horizontal overflow');
    if (target.chineseLink) {
      const link = page.locator('#reading-body').locator(`a[href="${target.chineseLink}"]`).first();
      await link.click();
      await page.waitForURL(baseUrl + target.chineseLink);
      await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText(index.pages[target.chineseLink].title);
      result.checks.push(`Actual Chinese concept link click: ${target.chineseLink}`);
      await page.goBack({ waitUntil: 'networkidle' });
    }
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText(index.pages[config.route].title);
    result.checks.push('Direct route refresh returns the same Chinese page');
    assert.deepEqual(result.errors, []);
    result.status = 'passed';
  } catch (error) {
    result.status = 'failed';
    result.error = { name: error.name, message: error.message, stack: error.stack };
    try { await screenshot(page, result, 'failure'); } catch (captureError) { result.screenshotError = captureError.message; }
  } finally {
    await context.close();
    await writeFile(path.join(evidenceDir, 'production-results.json'), JSON.stringify(report, null, 2) + '\n');
  }
}

try {
  for (const target of batch.pages) {
    for (const viewport of target.viewports ?? [{ width: 390, height: 844 }]) await check(target, viewport);
  }
  const expectedPages = batch.pages.reduce((sum, target) => sum + (target.viewports?.length ?? 1), 0);
  report.status = report.pages.length === expectedPages && report.pages.every(page => page.status === 'passed') ? 'passed' : 'failed';
} finally {
  await browser.close();
  report.finishedAt = new Date().toISOString();
  await writeFile(path.join(evidenceDir, 'production-results.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({ status: report.status, commit: report.commit, pages: report.pages.map(({ id, viewport, status, error }) => ({ id, viewport, status, error })) }, null, 2));
if (report.status !== 'passed') process.exitCode = 1;
