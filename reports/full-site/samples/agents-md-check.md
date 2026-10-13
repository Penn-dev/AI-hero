# AGENTS.md 指南样本检查

2026-10-13，制作执行者对照固定原文完成语义检查。来源 SHA-256：`eea031fa3bb5804320bd25fcd0b89035ef503b2afeb1c69aeade63e1d05b5ee5`。[原文](E:/dev/projects/AIHero/content/source/a-complete-guide-to-agents-md.md) · [修订稿](E:/dev/projects/AIHero/reports/full-site/samples/drafts/agents-md.md) · [接页配置](E:/dev/projects/AIHero/reports/full-site/samples/configs/agents-md.json)。

| 五项 | 当前结论 | 实际依据 |
| --- | --- | --- |
| 信息完整准确 | 语义检查通过 | 逐节核对：引言与定义、CLAUDE.md、增长反馈、指令预算、过时文档、最小根文件、两种项目说明、渐进式披露及嵌套/Skill、两处 CTA、monorepo、五步 Prompt 和文末放置判断。主体合格翻译保留，恢复教学指令的直接语气及“我”“我们”，不统一转述为作者观点。 |
| 中文自然 | 通读通过 | 消除反复“作者建议/作者认为”的疏离表达，保留原语气。译注另列，不削弱作者的强烈建议。 |
| 必要概念讲清 | 检查通过 | Git/Markdown/智能体、系统提示词、预算估计、类 Unix 符号链接和具体工具加载范围沿用合格解释，并明确译注身份。系统提示词的输入位置没有被解释为所有产品的“最高优先级”。 |
| 代码与链接保真 | 原块/资源及接页检查通过 | 9 个英文围栏原块逐块保留；7 个自然语言指令/Prompt 块附完整可复制中文。保留 Humanlayer 和 Corepack 原资源。两处 CTA 文案转为 Markdown，具体按钮地址未提供时明确保留原文章入口。 |
| 页面正常显示 | 部分验证；未完成 | 390×844：整体宽度 390；术语弹层正常；两处 details 可开关；完整中文五步 Prompt 实际复制且系统剪贴板 514 字符完全相符。1440 仅切换视口，下一条验收语句 SyntaxError 中断；桌面、完整深链/术语跳转尚未验证。390 页首/术语截图已看，折叠/Prompt 截图已保存但未看。 |

实际 preview 拒绝已有 `/ai-coding-dictionary/agent` 的旧 sourceHash；未把该词条声明为新来源已完成。CLAUDE.md 和 Corepack 两处折叠、代码及中英文 Prompt 复制、术语释义与独立跳转、深层链接和溢出仍待真实页面检查。

必要配置仅修改本页 profile 与对应翻译引用，不修改共享术语定义或冻结质量参考。后续状态见[工程问题记录](E:/dev/projects/AIHero/reports/full-site/samples/engineering-blockers.md)。

## 用户要求暂停后的状态

390×844：整体宽度 390；术语弹层正常；两处 details 可开关；完整中文五步 Prompt 实际复制且系统剪贴板 514 字符完全相符。1440 仅切换视口，下一条验收语句 SyntaxError 中断；桌面、完整深链/术语跳转尚未验证。390 页首/术语截图已看，折叠/Prompt 截图已保存但未看。

此前初次 preview/工程问题段落保留为历史记录，不代表当前仍被阻断。接页已完成；learning 校验与最新构建通过。#4 尚未完成，详见[暂停检查点](E:/dev/projects/AIHero/reports/full-site/samples/checkpoint.md)。

## dot 接续后的最新页面结果

2026-10-13，准确候选 `85cbc224c8fd8e6a609112d248cc673b1e79fe90` 的 [run38386427504](https://github.com/Penn-dev/AI-hero/actions/runs/38386427504) 已通过1440和390两视口实际页面检查，相关截图已查看。五项中的“页面正常显示”更新为通过；原语义与保真检查、未取得材料披露继续有效。实际交互、剪贴板比对、冷开深链/刷新和目录返修见 [最新汇总](./dot-validation/README.md) 与 [原始结果](./dot-validation/run-38386427504/browser-results.json)。上方暂停状态保留为历史，不代表当前仍未执行。[独立审查](./dot-validation/independent-review.md)通过，GitHub收尾见任务记录。
