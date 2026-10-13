# 内容 B 第三批：LLM 基础与应用选择

六篇完整页面：LLM 基础课程入口、LLM 用途、选择模型的五个问题、消息与推理 Token、工具、智能体。

基线为 `68c107143560cf63017411e604c06ba8e599fc51`，使用原固定来源。六篇均完成正文、配置及前四项检查。每篇第五项明确待工程接页和真实页面验收，没有把产品历史说法改写为当前事实。

执行：

```sh
node reports/full-site/batches/content-b/verify-batch.mjs batch-03 > reports/full-site/batches/content-b/batch-03/structure-check.json
```

六页结构校验通过。消息页和工具页共新增四段可复制的中文 Prompt，原英文保留。课程入口的 Video 转为原封面、明确的原站入口和资源标识说明，没有推测视频 URL 或生成文字稿。

工程重点检查四段中文 Prompt 的真实复制、原图、LLM 用途的 Mermaid 原例及课程封面。选型文章涉及的厂商分类、模型排名、上下文窗口和价格趋势按原时点保留，未给出当前选型推荐。

下一批继续 AI 工程与评估文章，来源不重新同步。
