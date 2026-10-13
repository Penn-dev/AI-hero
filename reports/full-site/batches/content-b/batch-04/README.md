# 内容 B 第四批：AI 工程、评估与研究介绍

八篇完整页面：AI 工程师、路线图、工程思维、评估、三种评估、有效智能体、提示词报告、STORM 简介。

基线为 `68c107143560cf63017411e604c06ba8e599fc51`。正文、接页配置与前四项检查齐备；第五项由工程接页后检查。本批未执行教程、调用模型、启动任务或同步新来源。

验证命令：

```sh
node reports/full-site/batches/content-b/verify-batch.mjs batch-04 > reports/full-site/batches/content-b/batch-04/structure-check.json
```

八页通过结构检查。Link、ThemeImage、SkillsCta 的可见信息已转成现有页面支持的静态内容；图的深浅色资源均保留。CTA 缺少原按钮地址时只提供标明身份的原文章入口。

工程重点检查比较表窄屏、图表/PDF链接、CTA、三段评估中文 Prompt 和一段完整中文术语树的复制。length 示例的原注释与代码含义不一致已经译注披露；原配置、原代码与统计数值未改。STORM 仅有已取得的介绍和图，没有补造后续内容。

下一批按完整篇幅继续 AI SDK 教程，优先复核已有 PDF 结构化数据译稿。
