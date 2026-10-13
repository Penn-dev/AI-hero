# 内容 B 首批：LLM、Token 与上下文

基线：`68c107143560cf63017411e604c06ba8e599fc51`。固定来源不变。

三篇完整正文位于 `drafts/`，逐篇接页配置位于 `configs/`，五项记录位于 `checks/`。两篇旧稿保留合格主体并局部修订，一篇新制。前四项已完成；第五项、preview/apply 和共享索引更新由工程负责人执行。本批不计为三篇最终验收完成。

执行的结构校验：

```sh
node reports/full-site/batches/content-b/verify-batch.mjs batch-01 > reports/full-site/batches/content-b/batch-01/structure-check.json
```

该检查复用接页入口的 `validateArticle`，核对固定源文、原围栏、行内代码、资源、标题和技术 frontmatter，不写索引，也不替代语义或浏览器验收。逐篇正文由内容 B 对照全文完成语义检查。

工程可在保留其他页面的前提下逐个 preview/apply 三个配置，随后保存第五项结果。LLM 页需要检查 Mermaid 原例的显示；Token 与上下文页需要检查图片和疑误译注。外部原资源均保留，不新增 planned 中文目标。

下一批准备继续 MCP 基础与相关完整短文章；保留两分钟 MCP 现有稿，其他页面逐篇阅读后决定批次，不机械按固定篇数切割。
