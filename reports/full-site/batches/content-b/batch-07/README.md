# 内容 B 第七批：SDK 多步骤与消息

六篇完整页面：智能体循环、嵌入向量、本地模型、消息历史、下一步问题建议、think 工具。

基线 `68c107143560cf63017411e604c06ba8e599fc51`。前四项完成，原例与历史接口完整保留；原回调缺 async、包名缺 @、未导入函数、日志描述与实际返回值等问题明确译注，没有静默修代码或虚构运行结果。

验证命令：

```sh
node reports/full-site/batches/content-b/verify-batch.mjs batch-07 > reports/full-site/batches/content-b/batch-07/structure-check.json
```

六页通过结构与强调 AST 检查。新增 14 个中文复制块，包括请求、完整消息例与输出理解。工程需实际复制，并检查大量 Scrollycoding 步骤、日志长行、服务器/原型代码和停止条件说明。

think 页保留 SDK 教程原站入口，并补中文根路径，配置登记 planned，等待工程按真实目标状态刷新。

本次没有查询真实天气、运行嵌入模型、启动本地模型/服务器、修改网络或请求内部推理。下一批继续剩余 AI 工程文章及长文。
