# 三篇样本与后续批次

本批依据[规格 #1](https://github.com/Penn-dev/AI-hero/issues/1)、[现行规范](E:/dev/projects/AIHero/docs/localization.md)、[固定 195 来源范围](E:/dev/projects/AIHero/reports/full-site/source-scope-2026-10-13.md)和[统一接页入口](E:/dev/projects/AIHero/docs/full-site-assembly.md)。本批不重新同步来源。制作执行者逐节对照原文并通读中文；工程校验、构建和浏览器检查分开记录。

| 样本 | 正文与必要配置 | 五项记录 |
| --- | --- | --- |
| 系统提示词 | [正文](E:/dev/projects/AIHero/content/learning/system-prompt/article.md)、[配置](E:/dev/projects/AIHero/reports/full-site/samples/configs/system-prompt.json) | [检查记录](E:/dev/projects/AIHero/reports/full-site/samples/system-prompt-check.md) |
| AGENTS.md | [正文](E:/dev/projects/AIHero/content/learning/agents-md/article.md)、[配置](E:/dev/projects/AIHero/reports/full-site/samples/configs/agents-md.json) | [检查记录](E:/dev/projects/AIHero/reports/full-site/samples/agents-md-check.md) |
| Output | [正文](E:/dev/projects/AIHero/content/zh/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k.md)、[配置](E:/dev/projects/AIHero/reports/full-site/samples/configs/output.json) | [检查记录](E:/dev/projects/AIHero/reports/full-site/samples/output-check.md) |

当前为用户要求暂停的 WIP：三篇语义检查、preview/apply、learning 校验和构建已完成；浏览器仅部分完成，不宣称 #4 完成。最新事实见[暂停检查点](E:/dev/projects/AIHero/reports/full-site/samples/checkpoint.md)。已解除的历史工程阻塞有[具体配置、错误和触发条件](E:/dev/projects/AIHero/reports/full-site/samples/engineering-blockers.md)。没有用来源或结构检查代替页面验收。

显式绝对原站 URL 用于保留原资源、课程、订阅等外部入口；站内根路径用于中文概念链接及尚未制作页面的英文回退。既有中文页是否可显示，与是否按本次快照复核完成分别记录：旧来源 hash 保持真实，目标待复核状态公开记录，全站校验继续报告差异。

来源提取的必要修正已单独提交 `aaeebfef0fadfea8e5567aa59c2f728086599905`，见[同批 HTML 的提取修正](E:/dev/projects/AIHero/reports/full-site/source-url-extraction-correction-2026-10-13.md)。只改变含空格 URL 的 Markdown 表示，未重取来源或改变教学文字；系统提示词 profile 使用修正后的固定来源 hash。

## 下一批怎样继续

1. 从固定来源清单选择完整页面，读取对应源文、此规范和必要术语。已有中文先逐节对照；合格内容保留，只修明确问题。不要从历史通过报告直接推定当前通过。
2. 保留原文直接教学的人称、语气、条件和章节顺序。必要背景标“译注”；可靠核实的操作差异标“更新说明”并链接依据。
3. 保留原代码和完整英文 Prompt，另附完整可复制中文。区别原例、解释、TODO 和答案。特殊组件的可见文字与资源入口可转为等价 Markdown；导航、订阅、分享等页面外壳说明身份，使用真实原站入口。
4. 使用统一入口 preview，再 apply，只接当前页面。对应来源与译稿 hash、profile 和链接目标状态必须真实；源码版本不同先比较内容，不能只换 hash。共享历史来源需保留旧字节、ID 和 hash，新页面使用新的来源 ID；同内容迁址也走统一入口。
5. 每页保存五项结论和具体缺项。桌面与窄屏实际检查适用的复制、折叠、术语释义/独立跳转、深层链接及异常横向滚动；看过截图再引用。构建、结构和语义分别记录。修正实质失败后只复核受影响部分。

## 本批边界与待制内容

旧中文索引保留 17 页。接页前全站内容检查发现 10 页来源 hash 失配；其中系统提示词、Output 在本组三篇核对，其他旧稿属于 #5。三篇样本成功不代表 195 页中文化完成，也不代表剩余旧稿已经通过语义检查。

Output 只制作已取得的公开文字；视频、文字稿正文、准备材料、锁定环境与版本、解答正文及课程代码运行均有明确缺项。课程/解答/登录只保留原站入口，不编造这些材料或功能。AGENTS.md 的 CTA 组件没有公开具体按钮 href，保留完整文案和原文章入口并说明此缺口。

词条使用已有本页释义与必要相关链接，不统一强制卡片、问答或文末词典。共享概念有语境差异时保持本页范围，出现真实工程问题交工程处理，不为通过检查修改范围外词条或削弱校验。
