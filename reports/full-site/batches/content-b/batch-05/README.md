# 内容 B 第五批：AI SDK 入门与 PDF

八篇完整页面：SDK 是什么、统一接口、教程入口、生成文本、系统提示词、切换模型、流式文本、PDF 结构化数据。PDF 旧稿保留合格正文和代码，局部修正语气并补齐完整可复制中文 Prompt；其余七篇新制。

基线为 `68c107143560cf63017411e604c06ba8e599fc51`。前四项检查完成，第五项、接页和共享索引由工程处理。本批没有安装包、配置密钥、上传文件或调用模型；历史接口/模型和环境缺项均在正文披露。

实际执行：

```sh
node reports/full-site/batches/content-b/verify-batch.mjs batch-05 > reports/full-site/batches/content-b/batch-05/structure-check.json
```

八页全部通过结构检查。新增 11 段完整中文 Prompt，需工程实际复制比对。另需检查提供商模型长表、Scrollycoding 多步骤、评价人头像/静态评价、原资源入口及 PDF 示例的未运行说明。

下一批继续结构化输出、枚举/数组、图片与工具调用等完整教程；不改原代码解决历史版本问题，也不把片段补造成课程答案。
