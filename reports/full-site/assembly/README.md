# #3 安全逐篇接页验证

2026-10-13，工作树 `E:/dev/projects/AIHero/work/full-site-assembly`，分支 `codex/full-site-assembly`。实施基点 `071bde5`，已合入集成分支 `caf667d`。仅实施 #3；当前来源与 17 页正文使用现有快照，最终制作样本仍应以任务 1 固定来源为准。

[入口用法](E:/dev/projects/AIHero/docs/full-site-assembly.md)说明普通正文、可选 profile、未完成中文目标与恢复方式。主要入口是[assemble-page.mjs](E:/dev/projects/AIHero/scripts/assemble-page.mjs)；它复用原文章专属入口的 frontmatter 解析与目标索引更新，继续写入现有数据源。

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| TDD 与回归 | 33 项通过；普通正文、辅助配置、错误哈希/配置/链接无写入、原块保真、目标隔离、恢复、并行记录保留、路径越界与符号链接 | [测试日志](E:/dev/projects/AIHero/reports/full-site/assembly/tests.log) |
| 实际站点记录保留 | 在临时目录加入测试页，真实索引中的全部原 17 页和 manifest 记录保持不变；另一用例更新 17 页中的一页，保留其他 16 页 | [测试源码](E:/dev/projects/AIHero/scripts/assemble-page.test.mjs) |
| 内容校验 | 186 个已下载来源、17 个可渲染译稿，哈希与索引一致，错误 0 | [内容检查](E:/dev/projects/AIHero/reports/full-site/assembly/content-check.log) |
| 现有辅助页面 | 3 页通过，8 个来源、15 个共享概念 | [辅助检查](E:/dev/projects/AIHero/reports/full-site/assembly/learning-check.log) |
| 原专属接页入口 | check 通过，提取共享逻辑后结果保持一致 | [兼容检查](E:/dev/projects/AIHero/reports/full-site/assembly/legacy-assembly-check.log) |
| 原 pilot 校验 | 通过；原围栏保真校验改为允许明确标记的中文 Prompt 追加 | [pilot 检查](E:/dev/projects/AIHero/reports/full-site/assembly/pilot-check.log) |
| 真实入口预览 | 现有普通文章预览通过；只读展示拟写正文与元数据 | [预览结果](E:/dev/projects/AIHero/reports/full-site/assembly/preview.log) |
| 构建 | 成功 | [构建日志](E:/dev/projects/AIHero/reports/full-site/assembly/build.log) |
| 全仓 lint | 31 项历史错误，新增 0、消失 0；validate-pilot 的旧错误仅行号变化 | [对比结果](E:/dev/projects/AIHero/reports/full-site/assembly/lint-comparison.json)、[完整日志](E:/dev/projects/AIHero/reports/full-site/assembly/lint.log) |
| 本次脚本 lint | 新增模块与相关修改检查通过；validate-pilot 已有 sort 规则错误保留于全仓基线 | [定向日志](E:/dev/projects/AIHero/reports/full-site/assembly/changed-lint.log) |

关键路径按 red → green 开发：普通正文接口缺失、profile 未接入、错误来源未拒绝、路径/配置无保护、失效链接被接受、未标记新增代码与未知 MDX 被接受、磁盘失败未恢复、17 页目标来源哈希未更新、内容校验不覆盖历史状态、符号链接与中断、准备期间索引变化、目标译稿路径变化。测试通过公共 `assemblePage`/`validateContent` 接口操作真实临时文件，仅在磁盘错误路径注入文件系统故障。

本次没有更改 renderer，无需追加浏览器展示检查。`assembled` 只记录装配和机械检查事实，不代表语义、教程运行或浏览器验收。源文同步由并行任务负责；根页真实接入与全站可达性属于 #6；保留现有 31 项 lint 基线。未改主进度记录，未批量重做正文。
