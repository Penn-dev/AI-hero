# #4 接页与展示问题

2026-10-13。配置和初次 preview 错误已落盘；三篇语义制作继续，不改冻结来源或范围外词条。

## 关联中文目标与旧来源

[AGENTS.md 配置](E:/dev/projects/AIHero/reports/full-site/samples/configs/agents-md.json)保持原稿的智能体与渐进式披露链接、profile.related。实际 preview 在第一项报 `Unavailable Chinese target: /ai-coding-dictionary/agent: Source route/hash mismatch`，见[初次日志](E:/dev/projects/AIHero/reports/full-site/samples/agents-md-preview-initial.log)。

触发位置是 `assemble-page.mjs` 的 requiredTargets 与当前 source manifest 比较。该词条是已有中文页，属于 #5 的旧稿复核范围；不能只换 hash，也不能把已存在中文页标 planned 来掩盖版本差异。建议工程明确分批阶段对已有旧版本页面的处理与读者披露方式，继续保留其真实旧来源 hash 和待复核状态。本任务只处理三篇样本。

系统提示词采用独立的 `samples-system-prompt-source` 引用新快照，保留共享 `dictionary-source` 的历史记录。旧共享记录当前路径已对应新 bytes，后续全局 learning 校验会报 hash 差异；这是共享历史来源与当前来源身份的问题，不能盲改共享定义的依据。

## 资源解析上下文

[Output 配置](E:/dev/projects/AIHero/reports/full-site/samples/configs/output.json)使用原页 URL 下的正确 Solution 地址。初次 preview 报 `Source resource missing: generating-objects-via-output~dkm2k/solution`，见[初次日志](E:/dev/projects/AIHero/reports/full-site/samples/output-preview-initial.log)。已交工程处理基于原页 URL 的相对资源解析。本任务不访问或补写 Solution。

系统提示词的 LinkedIn 原 HTML 入口含空格，而冻结 Markdown 未用尖括号包住 URL。原解析器把该来源截到 `?author=Matt`；译稿用尖括号保留完整 URL，因此初次 preview 报该截断地址缺失，见[初次日志](E:/dev/projects/AIHero/reports/full-site/samples/system-prompt-preview-initial.log)。须结合原 HTML 核对，不添加一个错误截断入口来凑校验。

## 外部入口被隐藏

系统提示词、AGENTS.md 的 `learning.profile.glossary` 非空，`localized-article.tsx` 因此开启 `chineseOnlyLinks`。`localized-markdown.tsx` 的 a 渲染分支将外部链接变成纯文字，related 也过滤外部入口。实际受影响的来源：系统提示词分享入口及原站订阅入口、AGENTS.md 的 Humanlayer/Corepack 链接及两处 CTA 原站入口。

源 CTA 组件在当前 renderer 中还会被 `aside[data-content-card]` 分支丢弃，因此本组把其可见文案转为等价 Markdown；原站具体按钮地址未在公开 Markdown 提供时，明确保留原文章入口，不发明目标。

另需确保标为“原站页面”的同 route 绝对 URL 不会被 articleLink 重写成当前本地页，否则用户无法到原站订阅。保留术语释义按钮与已有中文词条入口的独立身份，同时允许真正的原资源链接。

## 已处理的来源依赖

含空格 URL 提取问题已修正并单独提交 `aaeebfef0fadfea8e5567aa59c2f728086599905`。同批已保存 HTML 离线比较：77 个 href 完整保留，195 文件 hash 核对通过，14 个代码块不变。旧系统提示词原文从 Git `071bde5` 归档，实际字节为 2167，hash 仍为 `3afe0ee8…`；通过接页配置迁址，新 profile 使用独立新来源 ID。

## 暂停时的最终状态

上述来源与接页阻塞已解除，三篇已实际 preview/apply。学习检查的旧 URL/type/空文字稿假设经主代理修复后，在样本树完整通过。Output 中文 Prompt 框误标由 b9b70a6 修复并已合入构建，但浏览器补检尚未执行。没有新的已确认产品阻塞；剩余项是用户要求暂停时未完成的验收，见[检查点](E:/dev/projects/AIHero/reports/full-site/samples/checkpoint.md)。
