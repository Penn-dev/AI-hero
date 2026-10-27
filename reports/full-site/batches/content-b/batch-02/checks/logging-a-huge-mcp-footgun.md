# MCP 日志陷阱：逐页检查

来源：`content/source/logging-a-huge-mcp-footgun.md`。固定来源 SHA-256：`eef196ed9aa582bbfcc3ab7c3e5761f264461ce4a57c14a83642a71a925a1767`。译稿 SHA-256 见 `structure-check.json`。生产基线为 `68c107143560cf63017411e604c06ba8e599fc51`。

1. 信息完整准确：逐节核对 stdout 冲突、SSE 分离、文件日志四个步骤、通知的不确定性、stderr/tee 的 TODO 和总结两种选择。未把作者的猜想与待办写成已验证方案。
2. 中文自然：通读全文，console 输出、协议消息和日志文件的区别清楚，保留作者口吻。
3. 必要概念讲清：译注解释输入输出通道、SSE、同步写入和 stderr/tee，说明原例的方法省略及环境缺项。
4. 代码与链接保真：4 个原围栏及全部行内代码保持原样；2 个资源完整保留。源文 /discord 为原站社区入口，改用显式 https://www.aihero.dev/discord，避免错误本地路由。实际复用 `validateArticle` 进行结构检查，结果通过；外部地址按固定原文核对，没有额外请求网站以宣称链接当前有效。
5. 页面正常显示：未验证。检查代码块、原站 Discord 入口和 TODO 标识。未运行日志代码，也未将通知或 stderr 方案宣称已实测。

本批没有执行 preview/apply，未修改共享索引。第五项由工程整合后补验，不能用结构通过或制作记录代替页面验收。
