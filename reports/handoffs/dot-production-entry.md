# 固定范围中文制作接续

2026-10-13。三样本和接页工程已完成独立审查。已实测的源码候选为 `85cbc224c8fd8e6a609112d248cc673b1e79fe90`，后续本批只保存报告和截图，不改应用/来源/正文。证据提交的准确SHA在发布后回执中记录。[验收汇总](../full-site/samples/dot-validation/README.md) · [独立审查](../full-site/samples/dot-validation/independent-review.md) · [三页状态](../full-site/samples/progress.json)。

## 下一任务

进入 #5，沿用 [production-assignment.json](../full-site/production-assignment.json)：样本3、内容A词条/Skills110、内容B文章/教程82。只使用固定195来源，不重新同步、不使用API翻译器。每页先检查旧稿，保留合格内容；依据 [制作规范](../../docs/localization.md)逐节核对并保存五项实际检查。

内容检查仍有8篇旧稿来源差异，均属于内容A分组：skills-codebase-design、agent、context-window、tool-call、prefix-cache、memory-system、hallucination、progressive-disclosure。必须对照新旧原文处理，不能只改hash。

## 隔离与合入

内容A与B各用独立worktree/分支，从本次确认的实施tip开始，路径由整合负责人提供。各自负责分组内的正文、对应接页配置和批次检查/进度文件，不直接修改其他工作树。批次目录分别用 `reports/full-site/batches/content-a/` 与 `reports/full-site/batches/content-b/`，避免报告路径冲突。

每批保持完整文章单位，先preview、再apply，只记录实际完成的检查。可复用本轮未受影响的公共展示证据；新结构或公共渲染变化交整合负责人补实际页面验证，不以构建代替看图。不同来源中的不支持/动态组件按规范转为等价静态文字和明确原站入口，不扩建renderer或编造课程内容。

完成批次前取得实施分支最新tip并合入自己的分支。若共享index、manifest或知识记录冲突，保留两边目标的证据并交整合负责人逐目标处理，不整份选择ours/theirs。整合负责人是共享记录唯一写入人，以目标配置串行preview/apply核验并合入；不得在同一工作树并行运行接页写入。报告批次分支/准确SHA、完整目标route、正文与配置、五项记录、展示证据复用依据、新结构/未决项。

目标中文页完成后，整合负责人重新接入引用它的页面，清理已解决的planned/stale装配记录，保留显式原站资源入口。后续更新只核对新增/变化原文并重验受影响部分。

## 交付边界

#1/#6保持开放，PR#7保持草稿。全站制作和覆盖核对、首页接入、最终代码审阅与Windows最小现场验收尚未完成。Output缺失的课程材料和未运行声明继续保留。没有自动合并或在线部署。
