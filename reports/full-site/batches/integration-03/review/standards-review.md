# 第三轮固定候选 Standards 审查

基线829a10e7eebcc6fc935e82a385e5b72e60a125a0；候选d41b9a8703917c0eef4c0891703ad70e97e2e46a。git独立确认候选tree精确等于已预审ddf4f4e17a61b98d9d5dbe95776d38afca042bd1，因此固定快照检查结果可直接对应该commit。

## 代码、配置与装配

未见新增阻断。公共组件/renderer/样式没有变化。58新目标生产稿与固定草稿字节相同，索引markdown/sourceHash/sourceUrl相同；既有36索引全部保留，索引增至94，恰好58目标内容变化，来源目录不变。19条非目标manifest仅刷新相关装配信息。原始独立检查在 ../standards-ddf4f4e/manifest-check.json。

42/42独立回归、learning:validate、sync:validate通过，94份实际manifest译稿强调AST零命中。日志及emphasis.json在同一tree检查目录。

验收入口新增词典落地页71链接实际点击、七个原英文锚点冷开/刷新到位检查，增加可选择复制的中文Prompt段落检查。围栏预期由三反引号正则改为现有Markdown AST，保留实际系统剪贴板完整内容比对；对B10四反引号复现稿独立复算七块全文hash，最后两块894/517字符，RED→GREEN接受。强调扫描的单星号变体已随本候选纳入，仍排除代码与转义标记。工具改动聚焦真实发现，没有扩展公共渲染架构。

## 真实UI待核

Actions38398534538运行中；58目标、62视口。未把代码/静态验证标成第五项完成。后续需独立核commit/译稿hash/截图hash并目视全部本轮证据，重点新词典落地页、密集列表/表格、原英文fragment与中文Prompt实际复制。

## 实际 run 结果与目视复核（12:59 UTC）

只读取得run38398534538：总状态failed。62视口中61通过，唯一失败是context-pointer 390的第二个中文Prompt定位。脚本使用子串 hasText + first，将“请查看 internal/deploy.md”误选成前面的“部署流程：请查看 internal/deploy.md”，严格全文断言如实失败。该页仅第一条Prompt实际复制完成，后续图片/展示/刷新未执行；不能记成全页通过。无需修改译稿，需定位器精确匹配并实际复验。

artifact11812858630原ZIP的SHA-256与GitHub返回摘要一致：0bce7ca0eefe2fe77f6e34f56d3b7fa5a172280f9f7daf00a805bd44c04da0c5。已解压本目录run-38398534538/，全部151张图逐一核hash/byte且独立目视完成。所有62组译稿哈希均与候选一致。可核原始计数：10次成功Prompt复制、61次概念链接点击、词典首页71个条目实际点击、7个原英文锚点×2视口冷开与刷新，共14组。

现有图中的表格、双语例子、译注、列表未见新增视觉缺陷。词典首页16张桌面/窄屏顶屏与7分类图配合71条点击及14锚点组，可接受这一页的UI结论。

**证据覆盖缺口仍开放：** 大多数词条的 body selector=h2 截到了文末订阅CTA；example第一blockquote有时也只是译注。主定义段未被这套截图充分覆盖。双审已要求57个新词条逐页补主定义定点图，而不是再截只有hero的窄屏顶屏。工程同意在第四候选中补57词条定义图及context-pointer完整复验。不能把61组机器通过扩大为57词条的最终目视通过。

详细逐图与计数清单：ui-verification.json。第三批目前只有词典入口页标准UI轴闭环，57词条保留待补范围。
