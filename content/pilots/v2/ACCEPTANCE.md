# AGENTS.md 完整页面样本验收记录

## 样本范围

- 英文原文：`https://www.aihero.dev/a-complete-guide-to-agents-md`
- 正式中文路由：`/a-complete-guide-to-agents-md`
- 审核路由：`/review/a-complete-guide-to-agents-md`
- 对比路由：`/review/a-complete-guide-to-agents-md/compare`
- 翻译流程：Terra/medium 初译，Sol/medium 编辑审核

## 内容对应

| 原文章节 | 中文章节 | 关键内容 |
| --- | --- | --- |
| What is AGENTS.md? | 什么是 AGENTS.md？ | 定义、个人范围、项目范围、CLAUDE.md 符号链接 |
| Why Massive AGENTS.md Files are a Problem | 为什么超大的 AGENTS.md 文件是个问题 | 反馈循环、指令预算、过时文档 |
| Cutting Down Large AGENTS.md Files | 缩减庞大的 AGENTS.md 文件 | 最低内容、一句话说明、包管理器 |
| Use Progressive Disclosure | 使用渐进式披露 | 语言规则、嵌套文档、Agent Skills |
| AGENTS.md in Monorepos | 多项目单仓库中的 AGENTS.md | 根目录和包级规则、两组双语示例 |
| Fix A Broken AGENTS.md With This Prompt | 用这个 Prompt 修复有问题的 AGENTS.md | 英文 Prompt 原版和完整中文理解版 |
| Don't Build A Ball Of Mud | 别让 AGENTS.md 变成难以维护的“大杂烩” | 本地化比喻、位置选择表、总结 |

## 验收要求

- [x] 原文与译文的标题层级、章节数、列表、表格、引用、链接和组件结构通过机械对应检查。
- [x] 所有代码块保持英文原版，可直接复制。
- [x] 自然语言示例和 Prompt 紧邻中文理解版。
- [x] 保留的关键英文技术词在正文或术语小词典中得到解释。
- [x] 两个折叠内容块可以展开，且生产预览浏览器无 hydration、脚本错误或资源错误。
- [x] 正式页、审核页、对比页均返回成功，可直接刷新和通过深层链接打开。
- [x] 桌面和 390px 手机宽度均无非预期横向滚动；手机正文字号不小于 16px。
- [x] “启动中文预览”和“停止中文预览”已完成启动、停止、端口释放和再次启动测试。
- [ ] 用户完成译文准确性、自然度和零基础可理解性的最终阅读验收。

最终勾选由自动检查结果和人工阅读验收共同完成；自动检查不能替代对译文自然度与准确性的判断。
