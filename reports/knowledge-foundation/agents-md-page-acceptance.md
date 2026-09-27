# AGENTS.md 指南页面接入与技术验收

2026-09-24。`/a-complete-guide-to-agents-md` 已接入已审修订稿，并完成构建后本地桌面、手机真实浏览器技术验收。此结论不代替真实零基础读者试读。

## 接入结果

- `content/zh/index.json` 的本 route 正文改为 `content/learning/agents-md/article.md` 去除 frontmatter 后的完整内容；标题、说明和来源更新时间同步，阅读时间更新为 18 分钟。
- `content/learning/pilot-knowledge.json` 新增 `guide-revised-translation`，修订稿 SHA-256 为 `cb1a80668e3dc15eed967e775bca4ec4612c1003ea892025d09d9d5e3ae94ac5`。英文来源 `eea031fa3bb5804320bd25fcd0b89035ef503b2afeb1c69aeade63e1d05b5ee5`、旧译 `71354a92d54e45c964f6c5733a0305825cc94980462a0fcdfb66fa68305dc0f1` 保留且仍锁定。
- 本篇 profile 使用 13 个当前术语定义与别名；9 组英文原例标为正文内联，未在页尾重复生成。旧起步示例保留为中文学习辅助，并明确不是英文原文示例。页尾英文 related 改为已有中文的“智能体”和“渐进式披露”。
- `content/zh/manifest.json` 的本 route 指向修订稿及新哈希。`app/globals.css` 只为 `guide` 类型补充桌面两列、单数尾卡跨行和手机单列规则，没有 slug 特判。
- `scripts/assemble-agents-md-page.mjs` 提供确定性 apply/check；`scripts/verify-agents-md-browser.mjs` 提供本篇 Chrome 桌面/手机交互验收。

## 检查证据

- 通过：`node scripts/assemble-agents-md-page.mjs check`、`node scripts/validate-agents-md.mjs`、`node scripts/knowledge/prepare-first-batch-inputs.mjs check`、`npm run learning:validate`、新增两个脚本的定点 `oxlint`、`npm run build`。
- 非目标数据执行前后结构指纹完全一致：index 其他 16 route 为 `383327b8…571`，其他 2 个 profile 为 `89d4f89a…a16`，manifest 其他 16 条为 `98d0b1e8…848`；数量仍为 17/3/17。系统提示词页和 Output 练习数据未改变，Output 继续 HOLD。
- 全仓 `npm run lint` 仍被既存错误阻塞，涉及 `components/ui/*`、`flow-validation`、`foundation.mjs` 等；本次新增脚本已单独 lint 通过。

## 真实浏览器验收

构建后由本机 Google Chrome 以 1440×1000 和 390×844 两种视口访问独立预览。桌面三卡为两列且尾卡跨行，手机为单列；两种视口均无页面级横向溢出。实际点击验证：正文术语打开释义、`symlink` 与 `Token` 搜索、目录定位、系统提示词中文页跳转、页尾中文阅读卡；抽查首个短例和最终长 Prompt，英文完整示例后紧接中文理解；页尾没有重复英文原例。

截图位于 `reports/knowledge-foundation/agents-md-page-evidence/`：`desktop-top.png`、`desktop-glossary.png`、`desktop-related.png`、`mobile-top.png`、`mobile-glossary.png`、`mobile-related.png`。

治理补验发现旧 `mobile-top.png` 与旧 `mobile-glossary.png` 的字节数和 SHA-256 完全相同，确认旧脚本只检查了 DOM 文本，截图时没有等待 sheet 过渡稳定。修正验收脚本后，没有发现生产 UI 缺陷：

- 手机正文点击“系统提示词”后，sheet 矩形为 `top=520.42, bottom=844, width=390`；解释条目完整可见。关闭后再点击正文“Token”，选中内容从 `term-system-prompt` 替换为 `term-token`；切换到全部术语并搜索 `Token` 后，结果矩形为 `top=564.17, bottom=676.19`，在视口和 sheet 内完整可见。sheet 均已等待动画与几何稳定，最终为 `opacity=1`、`transform=none`。两次关闭前后 `scrollY` 都是 `1492`。
- 新 `mobile-glossary.png` 为 77,542 字节，SHA-256 `cbf8365f9d6a3c3b2be5808721bc0a56c96f16c21c0a49b94bd50b694c54c3a4`；它与 `mobile-top.png` 的 SHA-256 `175e9fd65f053c409e979189550a1851ce971c6fc8916c67003aa5df7e04cc03` 不同，截图中可直接看到稳定的术语面板、搜索框和 Token 结果。
- 桌面目录目标“缩减庞大的 AGENTS.md 文件”跳转后标题矩形 `top=30, bottom=97.30`；手机目录 sheet 关闭后，目标“别让 AGENTS.md 变成难以维护的大杂烩”标题矩形 `top=29.61, bottom=126.80`。两者都完整进入视口，采样命中元素均为目标 `H2`，未被固定元素遮挡。

结构化实测结果、全部关键几何、可见性、预览信息及六张截图的字节数与 SHA-256 保存于 `reports/knowledge-foundation/agents-md-page-evidence/browser-results.json`。本次只修改浏览器验收脚本、报告和生成证据，没有修改生产代码，因此按范围没有重复构建。

Codex 浏览器工具受环境限制：子代理不支持可见 IAB，浏览器清单随后返回 `nodeRepl.fetch request failed`。未安装扩展或修改全局设置，改用已安装 Chrome 与现有 bundled Playwright 完成真实浏览器验收。

## 预览与剩余边界

本地预览：`http://127.0.0.1:4322/a-complete-guide-to-agents-md`，当前进程 PID `28948`，错误日志为空。该服务由本任务启动，可继续供主窗口核验；没有发布、提交或调用外部模型/API。

G2 页面技术验收成立；真实零基础读者试读尚未进行，不能由本代理代为宣布通过。Token、Skill、AGENTS.md 中文词条仍按既定清单待建，但本篇已有本地解释，不阻塞阅读。

## 治理接收

治理窗口已复核桌面与手机首屏及补验后的手机术语截图，并核对手机面板可见性、释义替换、关闭后滚动恢复和两种视口目录实际落点记录。六张截图的字节数与SHA-256均与browser-results.json一致。

治理复跑页面装配check及 `node node_modules/typescript/bin/tsc --noEmit --incremental false`，均通过；本地页面HTTP 200且返回修订稿内容。接收本轮页面技术交付，保留真实零基础试读待完成及既有全仓lint问题，不据此声称全站验收或发布完成。

非目标 index/profile/manifest 的三个执行前指纹来自接入阶段写入前的控制台结果，并已在接入后逐项比对通过；当时没有另存独立的执行前基线文件。报告与 `browser-results.json` 只引用该既有记录，不将接入后的值表述为新生成的 before 证据。
