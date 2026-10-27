# 首版来源范围与缺口（#2）

2026-10-13。依据[规格 #1](https://github.com/Penn-dev/AI-hero/issues/1)实施[任务 #2](https://github.com/Penn-dev/AI-hero/issues/2)。制作从[统一规范](E:/dev/projects/AIHero/docs/localization.md)与[逐页固定清单](E:/dev/projects/AIHero/reports/full-site/source-scope-2026-10-13.json)开始；不再沿用历史 186 篇作为目标。

## 已固定的范围

| 项目 | 本次实际结果 |
| --- | --- |
| 公开来源 | [AI Hero](https://www.aihero.dev/)、[Sitemap](https://www.aihero.dev/sitemap.xml) |
| 取得时间 | 2026-10-13 11:37:35–11:44:11，中国标准时间（UTC+8） |
| 固定时间 | 2026-10-13 12:00:11，中国标准时间（UTC+8） |
| Sitemap | 196 条；`/what-are-tokens` 重复一次，195 个唯一地址 |
| 首版公开文字范围 | 195 页，含根页 `/`、词条、指南、文章、教程及公开介绍/订阅页 |
| 最终来源方式 | 113 页公开 Markdown；82 页公开 HTML 提取 |
| 旧缓存冒充本次取得 | 0 页；所有纳入页都有本次实际请求依据 |
| 尚未取得的 Sitemap 正文 | 0 页；外围材料缺口见下表，不计为完成 |

[来源 manifest](E:/dev/projects/AIHero/content/source/manifest.json)与逐页固定清单记录原地址、取得日期、文件、SHA-256、状态与取得方式。`downloaded` 只代表已取得来源；#2 未对中文稿填写完成、语义检查或页面验收声明。

首先真实执行现有[同步脚本](E:/dev/projects/AIHero/scripts/sync-content.mjs)，使用 `--force`，取得 114 份 Markdown，另外 81 页的 Markdown 请求返回 HTTP 404。随后只对这些页面补取公开 HTML，并补取根页的实际首页正文；五份本次 HTML 探查响应直接复用。没有再次全量同步。Markdown 404 不等于网页缺失，本次 82 份 HTML 均返回 HTTP 200。

根页的 Markdown 是面向工具的发现说明，与首页可见正文不同。最终根页使用本次公开 HTML 中的首页文字；最初取得的发现说明另存压缩依据，SHA-256 与 Git 基点中的同一原文相同。这个相同哈希用于恢复依据，不用旧 Git 文件替代本次取得状态。

与旧清单相比，7 个地址新增，9 页首次取得正文（含原先未纳入的两个订阅介绍页）；80 份原文哈希相同、106 份变化，无旧地址移出。变化包含原站内容变化、HTML 提取表示方式和页面外壳差异，不能仅凭哈希变化判断语义变化。详细地址在固定清单的 `sourceChanges` 中。

2026-10-13 离线提取修正：原 HTML 的 77 份链接含空格，旧 Markdown 表示会截断 href。修正后用尖括号包裹完整 URL，并从同一批已保存 HTML 离线重提取；没有网络请求，没有更改 195 页范围、原取得时间或 HTML 原件。仅链接表示改变，教学文字与 14 个原代码块不变。195 文件及清单 hash 再核对通过，77 个含空格原 href 经实际 Markdown 解析核对完整保留。详见[提取修正记录](E:/dev/projects/AIHero/reports/full-site/source-url-extraction-correction-2026-10-13.json)；系统提示词下列 hash 为修正后的值。

## 来源缺口与使用边界

| 材料 | 已取得 | 未取得或未验证 |
| --- | --- | --- |
| [邮件课程介绍](https://www.aihero.dev/skills/subscribe)、[订阅介绍](https://www.aihero.dev/newsletter) | 公开文案、七课介绍、表单文字 | 七封课程邮件正文；原文说明课程通过邮件交付，本次未订阅 |
| [AI SDK 课程](https://www.aihero.dev/workshops/ai-sdk-v6-crash-course)、[AI Coding 课程](https://www.aihero.dev/workshops/ai-coding-crash-course) | 公开课程介绍 | 完整报名后课程视频、环境材料、练习与答案；介绍页不代表整套课程取得 |
| [Output 教程](https://www.aihero.dev/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k) | 公开步骤、原代码、Solution 及登录入口 | 提取正文只有 Video Transcript 标题，未提取到文字稿正文；不生成文字稿，也不据此断言原站没有稿件 |
| Output 的 Solution 与运行准备 | 原文提供的入口与运行说明 | Solution 目标不在本次 Sitemap，未另取答案；环境、版本材料与代码运行未验证 |
| 登录与个人进度 | 原文中的登录入口 | 登录流程、个人进度及需要权限的材料；未登录或提交表单 |

外围资源没有完整公开清单，本报告只登记实际来源能确定的材料边界，不宣称穷尽整个付费/邮件课程体系。视频与资源保留原入口，不虚构文字稿、练习答案或可用本地表单。

HTML 提取稿保留了 `main` 中的正文、CTA、导航、作者和订阅/分享外壳，且解析了响应中已提供的流式 HTML 片段，没有执行原站脚本。制作时须对照原响应区分教学正文与外壳，CTA 文案与原站入口须保留并说明身份。特殊组件可转为等价 Markdown；具体展示问题在后续页面检查中处理。

## 可核对的证据

- [Markdown 取得记录](E:/dev/projects/AIHero/reports/full-site/source-sync-2026-10-13.json)：Sitemap、逐次 URL、HTTP 状态、日期与哈希。附压缩 Sitemap 和前次 manifest，原源文恢复依靠 Git 基点 `071bde50a3d470a70fa931169c647e85c3598d0b`，不复制历史源文集合。
- [HTML 取得记录](E:/dev/projects/AIHero/reports/full-site/source-html-2026-10-13.json)：82 份实际匿名公开响应的地址、HTTP 状态、原响应与压缩文件哈希。原始响应无损压缩后约 2.67 MB；它们是正文提取依据，保留以便追溯。五份探查响应被复用，无重复原件。
- [提取结果](E:/dev/projects/AIHero/reports/full-site/source-extraction-2026-10-13.json)：82 页提取成功，无提取缺口。复用原浏览器恢复脚本的语义转换规则，用 Python 标准库处理已保存响应。
- [核对结果](E:/dev/projects/AIHero/reports/full-site/source-verification-2026-10-13.json)：195 份来源逐文件哈希、82 份 HTML 压缩与解压哈希、Sitemap、根页发现说明及覆盖一致性均通过；14 个 HTML 原代码块逐块一致。
- [系统提示词浏览器抽查](E:/dev/projects/AIHero/reports/full-site/source-browser-system-prompt.json)由主代理实际执行；[本地对照](E:/dev/projects/AIHero/reports/full-site/source-browser-comparison-2026-10-13.json)确认四段正文、Usage 两句及 11 个链接属性一致。此证据仅覆盖这篇来源，不代表全站语义或页面验收。

工程检查：Node CLI 行为测试 6 项、Python 提取测试 4 项通过；改动的三个 JavaScript 文件定向 lint 退出码为 0。复用 `node scripts/validate-content.mjs` 的来源校验通过。该脚本的既有译稿状态覆盖限制由 #3 处理，结果不证明现有 17 个中文页已验收。#2 未改变页面渲染行为，不以构建代替内容检查。

## 规范覆盖与续接

[统一规范](E:/dev/projects/AIHero/docs/localization.md)已覆盖 #1 的内容与制作要求：文章边界、人称、语气、条件和顺序；完整自然的中文；必要背景解释与译注；有依据的更新说明；原代码/命令/配置保留；完整可复制的中文 Prompt 与对话理解；术语按需复用；视频、CTA、中文目标与资源入口；五项页面检查、小批次制作、既有稿保留和按需更新。模型、篇数、卡片、问答和文末词典均不是全站固定要求。

#4 复用以下本次原文：

- [系统提示词](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/system-prompt.md)，哈希 `280e76f1e360a136463e07681767779189f0487d1d7e94096153600571e3bc9a`。
- [AGENTS.md 指南](E:/dev/projects/AIHero/content/source/a-complete-guide-to-agents-md.md)，哈希 `eea031fa3bb5804320bd25fcd0b89035ef503b2afeb1c69aeade63e1d05b5ee5`，与旧源文相同。
- [Output 教程](E:/dev/projects/AIHero/content/source/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k.md)，哈希 `c098f9cf144ff3b8663f35e39f19ed607904fd5f8095db40391e1066f3818dc5`。运行与文字稿缺项沿用上表，特别核对 CTA、原 Prompt 与页面外壳。

后续制作使用这份固定快照，不重跑本次来源取得。若按需更新来源，先核对新增或变化的原文，再修改对应译稿并重查受影响内容。当前等待 #3 完成及主代理续接 #4；#5 的词条/指南沿用同一清单与规范。
