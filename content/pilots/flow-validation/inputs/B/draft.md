# B路 初译

使用 gpt-5.6-terra / medium。以独立新上下文按原文制作正文和全部辅助。

先读共同contract、issues和schema。顺序固定dictionary→workshop；当前dictionary READY、workshop HOLD，因此仅完成词典，在stage.json为workshop记HOLD。解除HOLD只能由治理通知，不能自行替换样本、查网或继续制作。

B另读取inputs/B的本篇知识输入，已剔除旧译文与审计入口；不要沿来源链接或路径寻找既有中文答案。

写入只限以下文件（不存在的HOLD产物不创建）：
- content/pilots/flow-validation/B/draft/dictionary.md
- content/pilots/flow-validation/B/draft/dictionary.learning.json
- content/pilots/flow-validation/B/draft/workshop.md
- content/pilots/flow-validation/B/draft/workshop.learning.json
- content/pilots/flow-validation/B/draft/stage.json

完整读取白名单：
- content/pilots/flow-validation/inputs/B/draft.md
- content/pilots/flow-validation/inputs/common/contract.json
- content/pilots/flow-validation/inputs/common/issues.json
- content/pilots/flow-validation/inputs/common/learning.schema.json
- content/pilots/flow-validation/inputs/common/stage.schema.json
- content/pilots/flow-validation/inputs/common/dictionary.md
- content/pilots/flow-validation/inputs/common/workshop.md
- content/pilots/flow-validation/inputs/common/TRANSLATION_SPEC.md
- content/pilots/flow-validation/inputs/common/glossary.json
- scripts/flow-validation/validate.mjs
- content/pilots/flow-validation/inputs/B/dictionary.json
- content/pilots/flow-validation/inputs/B/workshop.json

可读取自己刚写的文件；除此之外不要扫描目录、读取金标准或既有译稿、完整历史聊天、对方产物、全站资产、前端代码或任何白名单外资料。仅调用本地结构校验：node scripts/flow-validation/validate.mjs B draft；按需修复本次格式错误，不将脚本PASS当语义PASS。

所有中文解释由本任务写入learning.json；不让页面调用旧样本辅助补缺。语义审核覆盖共同12维度。初译一次、编校一次，最多一次后续治理授权的局部修正；不额外调用模型/API、建任务、发布、构建、启动服务、安装依赖或运行课程。结束记录阶段边界、输入哈希、文章状态、失败/重试与未知，不虚构单篇用量。通过 send_message_to_thread 向治理任务 01a0a64d-34d3-7b60-8559-f70d4eadd91f（local）回报文件路径、检查和未知，随后停止。
