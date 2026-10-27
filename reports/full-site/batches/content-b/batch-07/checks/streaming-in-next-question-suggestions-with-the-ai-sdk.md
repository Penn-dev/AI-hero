# 下一步问题建议：逐页检查

来源：`content/source/streaming-in-next-question-suggestions-with-the-ai-sdk.md`。固定 SHA-256：`ee57548775269cf7d533ea7b81c1f11dea24ee991d2d33f808174bb5bd8e1f4c`。译稿哈希见 `structure-check.json`。生产基线 `68c107143560cf63017411e604c06ba8e599fc51`。

1. 信息完整准确：逐节核对父流与双流、初始响应消费、建议历史拼接、固定dataPartId、undefined过滤、自定义类型、useChat、按钮默认问题与总结。所有原代码及3个自然语言输入完整保留。
2. 中文自然：全文通读，明确初始回复先结束后生成建议，未把框架片段扩展成现成功能。
3. 必要概念讲清：译注解释消息格式/Writer/类型与未给ChatInput实现及model变量，指出原Gemini名称仅来自正文。
4. 代码与链接保真：7个原围栏完整保留，新增3个完整中文Prompt，所有行内代码、技术字段和标题顺序通过。资源按固定来源核对，不另取来源。
5. 页面正常显示：未验证。检查3个复制块、TypeScript/TSX长代码显示；没有构建或验证可点击界面。

前四项由内容 B 对照全文完成，结构实际复用 `validateArticle` 和强调AST检查。共享索引、preview/apply与第五项交由工程负责。
