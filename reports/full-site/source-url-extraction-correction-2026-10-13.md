# 同批 HTML 的链接提取修正

2026-10-13。#4 样本发现 LinkedIn 分享地址中的空格在旧 Markdown 表示中截断了原 href。经用户授权修复 #2 的必要来源依赖；没有重新取得公开来源。

先添加公开 `extract()` 接口的回归用例，确认旧实现失败；再只为含空白的链接目标加尖括号，保留完整原 URL。5 项提取测试通过，见[失败记录](E:/dev/projects/AIHero/reports/full-site/source-url-extraction-red.log)和[通过记录](E:/dev/projects/AIHero/reports/full-site/source-url-extraction-green.log)。

从本次已保存的 82 份压缩 HTML 离线比较，77 份 Markdown 受影响，5 份输出字节相同。逐份确认改动仅为链接目标包裹表示，教学文字、Frontmatter 和 14 个代码块不变。只写入受影响文件及对应 manifest、scope、extraction、verification 记录；HTML 原件、取得时间、固定时间和 195 页范围均保持原样。

实际 Markdown 解析确认 77 个含空格 href 全文保留；195 个来源文件与 manifest、scope 哈希一致。系统提示词修正后 SHA-256 为 `280e76f1e360a136463e07681767779189f0487d1d7e94096153600571e3bc9a`。此差异是同一份已取得 HTML 的提取修正，不是再次来源同步或作者正文更新。

逐页旧/新 hash、原 HTML hash、修正时间及核对结果见[修正清单](E:/dev/projects/AIHero/reports/full-site/source-url-extraction-correction-2026-10-13.json)。共享历史系统提示词证据仍使用 Git 基点 `071bde5` 的原始字节，留到样本配置通过统一入口迁址；本提交不更改共享概念或任何中文页面。
