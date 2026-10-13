import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const browserRoot = process.env.DOT_BROWSER_ROOT;
const evidenceDir = process.env.DOT_EVIDENCE_DIR;
assert.ok(browserRoot && evidenceDir, 'The isolated browser and evidence directories are required');
const require = createRequire(path.join(browserRoot, 'package.json'));
const { chromium, expect } = require('@playwright/test');
const baseUrl = 'http://127.0.0.1:4321';
const articleRoute = '/a-complete-guide-to-agents-md';
const report = {
  repository: process.env.GITHUB_REPOSITORY,
  commit: process.env.GITHUB_SHA,
  runId: process.env.GITHUB_RUN_ID,
  node: process.version,
  scope: 'Technical smoke check of the existing remote pages, not content acceptance',
  startedAt: new Date().toISOString(),
  status: 'running',
  viewports: [],
  screenshots: [],
};
await mkdir(evidenceDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
report.browser = { name: 'Chromium', version: browser.version(), playwright: require('@playwright/test/package.json').version };

async function checkViewport(name, viewport, mobile) {
  const result = { name, viewport, checks: [], pageErrors: [], sameOriginHttpErrors: [], status: 'running' };
  report.viewports.push(result);
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => result.pageErrors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(baseUrl + '/') && response.status() >= 400) {
      result.sameOriginHttpErrors.push({ url: response.url(), status: response.status() });
    }
  });
  try {
    const home = await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
    assert.equal(home?.status(), 200, 'Homepage must return HTTP 200');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('工程基本功');
    result.checks.push('Homepage returns HTTP 200 and displays its Chinese heading');

    const article = await page.goto(baseUrl + articleRoute, { waitUntil: 'networkidle', timeout: 30000 });
    assert.equal(article?.status(), 200, 'Article must return HTTP 200');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AGENTS.md');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, 'Article must not overflow horizontally');
    result.checks.push('Existing article loads and fits the viewport');

    let glossary;
    if (mobile) {
      await page.locator('#mobile-glossary-trigger').click();
      glossary = page.locator('[data-slot="sheet-content"]');
    } else {
      await page.getByRole('button', { name: /^术语速查/ }).click();
      glossary = page.locator('.desktop-glossary');
    }
    await expect(glossary).toBeVisible();
    const search = glossary.getByPlaceholder('搜索术语或解释');
    await search.fill('dot-capability-no-matching-term-20261013');
    await expect(glossary).toContainText('没有匹配的术语');
    await search.fill('symlink');
    await expect(glossary.locator('.glossary-list')).toContainText('符号链接');
    await expect(glossary).not.toContainText('没有匹配的术语');
    result.checks.push('Glossary search rejects an absent term and finds symlink');

    await glossary.getByRole('button', { name: '清空术语搜索' }).click();
    await expect(search).toHaveValue('');
    assert.ok(await glossary.locator('[data-term-id]').count() > 1, 'Clearing search must restore multiple terms');
    result.checks.push('Clearing search restores the term list');

    if (mobile) {
      await page.keyboard.press('Escape');
      await expect(glossary).toBeHidden();
      await page.locator('#mobile-glossary-trigger').click();
      glossary = page.locator('[data-slot="sheet-content"]');
      await expect(glossary).toBeVisible();
      await expect(glossary.getByPlaceholder('搜索术语或解释')).toHaveValue('');
      result.checks.push('Mobile glossary closes and reopens with an empty search');
    }
    await glossary.getByPlaceholder('搜索术语或解释').fill('symlink');
    await expect(glossary.locator('.glossary-list')).toContainText('符号链接');
    await glossary.evaluate(async element => {
      await Promise.allSettled(element.getAnimations({ subtree: true }).map(animation => animation.finished));
    });
    assert.deepEqual(result.pageErrors, [], 'Pages must have no unhandled browser errors');
    assert.deepEqual(result.sameOriginHttpErrors, [], 'Pages must have no failing same-origin HTTP responses');
    result.checks.push('No unhandled page errors or failing same-origin HTTP responses');
    result.status = 'passed';
  } catch (error) {
    result.status = 'failed';
    result.error = { name: error.name, message: error.message, stack: error.stack };
  } finally {
    try {
      const filename = name + '.png';
      const file = path.join(evidenceDir, filename);
      await page.screenshot({ path: file, fullPage: false, animations: 'disabled' });
      const bytes = await readFile(file);
      report.screenshots.push({ file: filename, viewport, url: page.url(), bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
    } catch (error) {
      result.screenshotError = error.message;
      result.status = 'failed';
    }
    await context.close();
  }
}

try {
  await checkViewport('desktop', { width: 1440, height: 1000 }, false);
  await checkViewport('mobile', { width: 390, height: 844 }, true);
  report.status = report.viewports.every(viewport => viewport.status === 'passed') && report.screenshots.length === 2 ? 'passed' : 'failed';
} catch (error) {
  report.status = 'failed';
  report.error = { name: error.name, message: error.message, stack: error.stack };
} finally {
  await browser.close();
  report.finishedAt = new Date().toISOString();
  await writeFile(path.join(evidenceDir, 'browser-results.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({ status: report.status, commit: report.commit, viewports: report.viewports.map(({ name, status, checks }) => ({ name, status, checks })) }, null, 2));
if (report.status !== 'passed') process.exitCode = 1;
