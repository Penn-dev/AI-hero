import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const playwrightPath = process.env.AIHERO_PLAYWRIGHT_PATH;
assert.ok(playwrightPath, 'Set AIHERO_PLAYWRIGHT_PATH to the existing Playwright package');
const { chromium } = require(playwrightPath);
const chromePath = process.env.AIHERO_CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseUrl = process.env.AIHERO_PREVIEW_URL ?? 'http://127.0.0.1:4322';
const route = '/a-complete-guide-to-agents-md';
const evidenceDir = 'reports/knowledge-foundation/agents-md-page-evidence';
const resultsPath = path.join(evidenceDir, 'browser-results.json');
await mkdir(evidenceDir, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath, headless: true });
const report = {
  browser: { name: 'Google Chrome', version: browser.version(), executablePath: chromePath },
  preview: { baseUrl, route, url: `${baseUrl}${route}`, processId: Number(process.env.AIHERO_PREVIEW_PID || 0) || null },
  desktop: { viewport: { width: 1440, height: 1000 } },
  mobile: { viewport: { width: 390, height: 844 } },
  screenshots: [],
  nonTargetBaselineEvidence: {
    scope: 'Values were captured in the prior task console and copied into the acceptance report; no separate pre-change baseline artifact was saved.',
    indexOtherRoutes: '383327b83fbbfdd6f5a1ad2fd47e69f0fde3544e31ebd82f9161c3afc606b571',
    profileOtherRoutes: '89d4f89a6d605bedb3341f36cc9369385a0119545b0da0523fc7e83d34c0ba16',
    manifestOtherRoutes: '98d0b1e8c21092fef22a3794a25d1c164654d1ba2c4849d404185de4c92c2848',
  },
};

async function waitForAnimationsAndStableBox(locator) {
  await locator.waitFor({ state: 'visible' });
  await locator.evaluate(async element => {
    await Promise.allSettled(element.getAnimations({ subtree: true }).map(animation => animation.finished));
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  let previous;
  let stable = 0;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const box = await locator.boundingBox();
    assert.ok(box, 'Visible element has no bounding box');
    const current = [box.x, box.y, box.width, box.height];
    stable = previous && current.every((value, index) => Math.abs(value - previous[index]) <= 0.5) ? stable + 1 : 0;
    if (stable >= 3) return;
    previous = current;
    await locator.page().waitForTimeout(50);
  }
  assert.fail('Element geometry did not stabilize after animation or smooth scrolling');
}

async function geometry(locator) {
  return locator.evaluate(element => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const sampleX = Math.max(0, Math.min(innerWidth - 1, rect.left + rect.width / 2));
    const sampleY = Math.max(0, Math.min(innerHeight - 1, rect.top + Math.min(12, rect.height / 2)));
    const hit = document.elementFromPoint(sampleX, sampleY);
    return {
      rect: { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height },
      viewport: { width: innerWidth, height: innerHeight },
      style: { display: style.display, visibility: style.visibility, opacity: Number(style.opacity), transform: style.transform },
      intersectsViewport: rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth,
      fullyInViewport: rect.top >= -1 && rect.left >= -1 && rect.bottom <= innerHeight + 1 && rect.right <= innerWidth + 1,
      hitTest: { tag: hit?.tagName ?? null, id: hit?.id || null, className: typeof hit?.className === 'string' ? hit.className : null, withinTarget: Boolean(hit && (hit === element || element.contains(hit))) },
    };
  });
}

async function closeSheetAndCheckScroll(page, sheet, before) {
  await sheet.getByRole('button', { name: '关闭' }).click();
  await sheet.waitFor({ state: 'hidden' });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const after = await page.evaluate(() => scrollY);
  assert.ok(Math.abs(after - before) <= 1, `Scroll changed when closing sheet: ${before} -> ${after}`);
  return { before, after, restored: true };
}

async function headingGeometryAfterNavigation(page, targetId, sheet) {
  if (sheet) await sheet.waitFor({ state: 'hidden' });
  const heading = page.locator(`#${targetId}`);
  await waitForAnimationsAndStableBox(heading);
  const result = await geometry(heading);
  assert.ok(result.intersectsViewport, `Target heading is outside the viewport: ${targetId}`);
  assert.ok(result.rect.top >= 0, `Target heading is above the viewport: ${targetId}`);
  assert.ok(result.hitTest.withinTarget, `Target heading is covered at its sampled text line: ${targetId}`);
  return { id: targetId, hash: decodeURIComponent(new URL(page.url()).hash), ...result, sheetClosed: sheet ? await sheet.isHidden() : null };
}

async function contentChecks(page) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  const text = await page.locator('body').innerText();
  assert.match(text, /这里说的“位置”有范围/);
  assert.doesNotMatch(text, /最高优先级基础说明/);
  assert.match(text, /中文学习辅助：它依次说明/);
  assert.equal(await page.locator('.original-examples').count(), 0, 'Inline examples were duplicated at the page end');
  assert.equal(await page.locator('.related-grid a').count(), 2);
  const related = await page.locator('.related-grid a').evaluateAll(links => links.map(link => new URL(link.href).pathname));
  assert.deepEqual(related, ['/ai-coding-dictionary/agent', '/ai-coding-dictionary/progressive-disclosure']);
  const arrows = await page.locator('.term-source-link').evaluateAll(links => links.map(link => new URL(link.href).pathname));
  const sortRoutes = values => values.sort((a, b) => a.localeCompare(b));
  assert.deepEqual(sortRoutes([...new Set(arrows)]), sortRoutes(['/ai-coding-dictionary/agent', '/ai-coding-dictionary/progressive-disclosure', '/ai-coding-dictionary/system-prompt']));
  const firstExample = page.locator('.code-frame').filter({ hasText: 'This is a React component library for accessible data visualization.' });
  assert.equal(await firstExample.count(), 1);
  assert.match(await firstExample.evaluate(node => node.nextElementSibling?.textContent ?? ''), /无障碍数据可视化/);
  const finalExample = page.locator('.code-frame').filter({ hasText: 'I want you to refactor my AGENTS.md file' });
  assert.equal(await finalExample.count(), 1);
  assert.match(await finalExample.evaluate(node => [node.nextElementSibling?.textContent, node.nextElementSibling?.nextElementSibling?.textContent].join(' ')), /我希望你重构我的 AGENTS.md/);
  return { related, arrows: [...new Set(arrows)], examplesAdjacent: 2 };
}

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const page = await desktop.newPage();
  Object.assign(report.desktop, await contentChecks(page));
  const grid = page.locator('.learning-start-grid');
  report.desktop.cardColumns = await grid.evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length);
  report.desktop.tailCardColumn = await grid.locator(':scope > div').last().evaluate(node => getComputedStyle(node).gridColumnEnd);
  assert.equal(report.desktop.cardColumns, 2);
  assert.equal(report.desktop.tailCardColumn, '-1');
  report.desktop.horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  assert.equal(report.desktop.horizontalOverflow, false);
  await page.screenshot({ path: path.join(evidenceDir, 'desktop-top.png'), fullPage: false });
  report.screenshots.push({ file: 'desktop-top.png', viewport: 'desktop', state: 'page top' });

  const systemPrompt = page.getByRole('button', { name: '查看“系统提示词（system prompt）”的术语解释' }).first();
  await systemPrompt.click();
  await page.locator('.desktop-glossary [data-term-id="term-system-prompt"]').waitFor();
  assert.match(await page.locator('.desktop-glossary').innerText(), /随模型请求提供的基础指令/);
  await page.getByRole('button', { name: '查看全部术语' }).click();
  await page.getByPlaceholder('搜索术语或解释').fill('symlink');
  const searchText = await page.locator('.desktop-glossary').innerText();
  assert.match(searchText, /符号链接/);
  report.desktop.glossarySearch = 'symlink -> 符号链接';
  await page.screenshot({ path: path.join(evidenceDir, 'desktop-glossary.png'), fullPage: false });
  report.screenshots.push({ file: 'desktop-glossary.png', viewport: 'desktop', state: 'stable glossary search result' });

  await page.getByRole('button', { name: '返回目录' }).click();
  const contentsLink = page.locator('.article-outline a').filter({ hasText: '缩减庞大的' }).first();
  await contentsLink.click();
  report.desktop.contentsNavigation = decodeURIComponent(new URL(page.url()).hash);
  assert.equal(report.desktop.contentsNavigation, '#缩减庞大的-agents-md-文件');
  report.desktop.contentsTarget = await headingGeometryAfterNavigation(page, '缩减庞大的-agents-md-文件');

  const localArrow = page.locator('.term-source-link[href="/ai-coding-dictionary/system-prompt"]').first();
  await localArrow.scrollIntoViewIfNeeded();
  await localArrow.click();
  await page.waitForLoadState('networkidle');
  assert.equal(new URL(page.url()).pathname, '/ai-coding-dictionary/system-prompt');
  assert.match(await page.locator('h1').innerText(), /系统提示词/);
  report.desktop.chineseLinkNavigation = new URL(page.url()).pathname;
  await page.goBack({ waitUntil: 'networkidle' });
  await page.locator('.related-reading').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(evidenceDir, 'desktop-related.png'), fullPage: false });
  report.screenshots.push({ file: 'desktop-related.png', viewport: 'desktop', state: 'related reading' });
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const mobilePage = await mobile.newPage();
  Object.assign(report.mobile, await contentChecks(mobilePage));
  report.mobile.cardColumns = await mobilePage.locator('.learning-start-grid').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length);
  assert.equal(report.mobile.cardColumns, 1);
  report.mobile.horizontalOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  assert.equal(report.mobile.horizontalOverflow, false);
  assert.notEqual(await mobilePage.locator('.mobile-learning-bar').evaluate(node => getComputedStyle(node).display), 'none');
  await mobilePage.screenshot({ path: path.join(evidenceDir, 'mobile-top.png'), fullPage: false });
  report.screenshots.push({ file: 'mobile-top.png', viewport: 'mobile', state: 'page top' });

  const mobileSystemPrompt = mobilePage.getByRole('button', { name: '查看“系统提示词（system prompt）”的术语解释' }).first();
  await mobileSystemPrompt.scrollIntoViewIfNeeded();
  const beforeSystemPrompt = await mobilePage.evaluate(() => scrollY);
  await mobileSystemPrompt.click();
  let mobileSheet = mobilePage.locator('[data-slot="sheet-content"]');
  await waitForAnimationsAndStableBox(mobileSheet);
  const firstSelected = mobileSheet.locator('[data-term-id="term-system-prompt"]');
  await firstSelected.waitFor({ state: 'visible' });
  const firstSheetGeometry = await geometry(mobileSheet);
  const firstTermGeometry = await geometry(firstSelected);
  assert.ok(firstSheetGeometry.fullyInViewport && firstSheetGeometry.style.opacity === 1, 'System prompt sheet is not stably visible in the viewport');
  assert.ok(firstTermGeometry.intersectsViewport, 'System prompt explanation is not visible');
  const firstClose = await closeSheetAndCheckScroll(mobilePage, mobileSheet, beforeSystemPrompt);

  const mobileToken = mobilePage.getByRole('button', { name: '查看“Token”的术语解释' }).first();
  await mobileToken.scrollIntoViewIfNeeded();
  const beforeToken = await mobilePage.evaluate(() => scrollY);
  await mobileToken.click();
  mobileSheet = mobilePage.locator('[data-slot="sheet-content"]');
  await waitForAnimationsAndStableBox(mobileSheet);
  const secondSelected = mobileSheet.locator('[data-term-id="term-token"]');
  await secondSelected.waitFor({ state: 'visible' });
  assert.equal(await mobileSheet.locator('[data-term-id="term-system-prompt"]').count(), 0, 'Selected term did not change');
  const secondTermGeometry = await geometry(secondSelected);
  assert.ok(secondTermGeometry.intersectsViewport, 'Replacement Token explanation is not visible');
  await mobileSheet.getByRole('button', { name: '查看全部术语' }).click();
  await mobileSheet.getByPlaceholder('搜索术语或解释').fill('Token');
  const tokenResult = mobileSheet.locator('[data-term-id="term-token"]');
  await waitForAnimationsAndStableBox(tokenResult);
  const stableSheetGeometry = await geometry(mobileSheet);
  const tokenResultGeometry = await geometry(tokenResult);
  assert.ok(stableSheetGeometry.fullyInViewport && stableSheetGeometry.style.opacity === 1, 'Token search sheet is not stably visible in the viewport');
  assert.ok(tokenResultGeometry.fullyInViewport && tokenResultGeometry.hitTest.withinTarget, 'Token search result is not visibly reachable in the sheet');
  report.mobile.glossary = {
    openedFromBodyTerm: 'term-system-prompt',
    replacementTerm: 'term-token',
    replacementConfirmed: true,
    search: 'Token',
    systemPromptSheet: firstSheetGeometry,
    systemPromptResult: firstTermGeometry,
    tokenResult: tokenResultGeometry,
    stableSearchSheet: stableSheetGeometry,
    firstClose,
  };
  await mobilePage.screenshot({ path: path.join(evidenceDir, 'mobile-glossary.png'), fullPage: false });
  report.screenshots.push({ file: 'mobile-glossary.png', viewport: 'mobile', state: 'stable visible Token search result' });
  report.mobile.glossary.finalClose = await closeSheetAndCheckScroll(mobilePage, mobileSheet, beforeToken);

  await mobilePage.getByRole('button', { name: '目录', exact: true }).click();
  const contentsSheet = mobilePage.locator('[data-slot="sheet-content"]');
  await waitForAnimationsAndStableBox(contentsSheet);
  const mobileContents = contentsSheet.locator('.article-outline a').filter({ hasText: '别让 AGENTS.md' }).first();
  await mobileContents.click();
  report.mobile.contentsNavigation = decodeURIComponent(new URL(mobilePage.url()).hash);
  assert.equal(report.mobile.contentsNavigation, '#别让-agents-md-变成难以维护的-大杂烩');
  report.mobile.contentsTarget = await headingGeometryAfterNavigation(mobilePage, '别让-agents-md-变成难以维护的-大杂烩', contentsSheet);
  await mobilePage.locator('.related-reading').scrollIntoViewIfNeeded();
  await mobilePage.screenshot({ path: path.join(evidenceDir, 'mobile-related.png'), fullPage: false });
  report.screenshots.push({ file: 'mobile-related.png', viewport: 'mobile', state: 'related reading' });
  await mobile.close();
} finally {
  await browser.close();
}

for (const screenshot of report.screenshots) {
  const bytes = await readFile(path.join(evidenceDir, screenshot.file));
  screenshot.bytes = bytes.length;
  screenshot.sha256 = createHash('sha256').update(bytes).digest('hex');
}
await writeFile(resultsPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
