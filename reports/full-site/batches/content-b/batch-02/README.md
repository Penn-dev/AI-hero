# 内容 B 第二批：MCP

本批包含八篇完整页面：两分钟介绍、工作原理、教程介绍、单文件服务器、NPM 发布、有状态服务器、日志、提示词。

基线为 `68c107143560cf63017411e604c06ba8e599fc51`。两分钟介绍保留既有合格正文，只明确辅助词典身份；另外七篇按固定来源新制。正文、配置和逐页五项记录分别位于 `drafts/`、`configs/`、`checks/`。

前四项检查完成；第五项、接页及共享索引由工程负责。本批没有运行教程、安装示例包、发布 NPM、创建 Issue 或访问外部账户。历史协议/CLI 说法、原例疑误、依赖和视频材料缺口在相关段落明确标出，没有静默改写原代码。

实际结构检查：

```sh
node reports/full-site/batches/content-b/verify-batch.mjs batch-02 > reports/full-site/batches/content-b/batch-02/structure-check.json
```

八页均通过原围栏、行内标识符、章节、资源和技术字段校验。`using-mcp-prompts` 增加了与本页所给英文逐行对应的完整中文版 Prompt；原文省略的约两百术语没有补造。工程需实际复制比对这个新 Prompt，并检查两页 Scrollycoding、Mermaid 原例和代码中的长行。

`/discord` 和未纳入本批的前篇始终指向明确的原站资源。未新增待制作本地中文链接；后续可在确认目标可用后由工程统一刷新链接状态。

下一批继续基础 LLM 文章及其课程入口。每页完成全文后交付，不把本批结构检查或文案完成记成最终验收。
