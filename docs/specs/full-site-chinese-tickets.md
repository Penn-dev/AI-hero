# 全站中文化任务入口

2026-10-13。私有仓库：[Penn-dev/AI-hero](https://github.com/Penn-dev/AI-hero)。本次仅发布规格和任务，尚未实施。

完整规格已发布至[规格总览 #1](https://github.com/Penn-dev/AI-hero/issues/1)，本地源文件为[实施规格](E:/dev/projects/AIHero/docs/specs/full-site-chinese.md)。规格全文在Issue中保存，因此远端执行不依赖尚未提交的本地文档。

| 任务 | 交付 | 实际依赖 |
| --- | --- | --- |
| [#2 来源与规范](https://github.com/Penn-dev/AI-hero/issues/2) | 同步固定首版来源与缺口，统一中文化规范 | 无，可开始 |
| [#3 安全接页](https://github.com/Penn-dev/AI-hero/issues/3) | 不覆盖其他页面、先校验后写入的可复用入口 | 无，可用现有数据独立开发 |
| [#4 三类样本](https://github.com/Penn-dev/AI-hero/issues/4) | 修订并验证词条、长文章、代码教程的完整页面 | #2、#3 |
| [#5 全站制作](https://github.com/Penn-dev/AI-hero/issues/5) | 小批次完成固定范围并保持可续接记录 | #4 |
| [#6 本地交付](https://github.com/Penn-dev/AI-hero/issues/6) | 全站覆盖核对与本地启动、停止、再次启动验证 | #5 |

建议先执行 #2。每个Issue已保存相应验收与边界，整体内容要求在 #1；不按旧公共能力工作单扩建知识平台。全站内容制作以 #5 的批次进度持续推进，不预先为每篇建立Issue。

GitHub组件可用，本机gh在此次检查返回401；发布通过组件完成。组件没有原生阻塞链接接口，依赖暂记在各任务正文和总览中。未设置默认ready标签，也未关闭总览。后续使用gh执行时需先恢复登录，或继续使用已授权组件。
