# 全站中文化实施进度

更新：2026-10-13。工作区：[AIHero](E:/dev/projects/AIHero)。

## 当前入口

- 规格：[GitHub #1](https://github.com/Penn-dev/AI-hero/issues/1)、[本地规格](E:/dev/projects/AIHero/docs/specs/full-site-chinese.md)。依赖：#2、#3 → #4 → #5 → #6。
- 实施分支：codex/full-site-chinese；起点 f61f0d5，已整合实现 c7f791a；[草稿 PR #7](https://github.com/Penn-dev/AI-hero/pull/7)。
- 初始未提交的 CONTEXT.md、两份规格入口、work-order-review.md 已原样提交保存。
- GitHub 组件读写正常，Git push 正常；不用失效的 gh 登录。2026-10-13 闪退后已核对所有工作树，保留草稿和未提交修复，恢复原代理。

## 实际状态

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| #2 来源与规范 | 完成并关闭 | 固定195页；链接提取离线修正 aaeebfe 已合入 c192ec9 |
| #3 安全接页 | 工程与返修已整合 | 公共渲染真实页面证据随 #4 补齐后关闭 |
| #4 三类样本 | 三篇正文与逐节检查已保存 | 内容A在样本树合入 a4c86c9，preview/apply、构建、桌面/窄屏检查 |
| #5 全站制作 | 等待 #4 | 内容A 110页、内容B 82页；三篇样本另计 |
| #6 本地交付 | 等待 #5 | 全站覆盖、首页接入、启动/停止/再启动、交付说明 |

## 来源与已通过验证

- [固定范围与缺口](E:/dev/projects/AIHero/reports/full-site/source-scope-2026-10-13.md)：195个唯一公开页面，113页Markdown、82页HTML；取得时间及范围固定，不重新全量取源。
- [现行制作规范](E:/dev/projects/AIHero/docs/localization.md)：完整忠实中文、保留作者语气/结构/原代码，英文Prompt另附完整中文；明确译注和来源缺口。只用Codex小批次制作，不用API翻译器。
- 来源195份与HTML原始响应hash已核验。离线修正77个含空格href，5项提取回归通过，14个原代码块不变。分配清单中的sourceManifestSha256已刷新。
- 工程 b3a268c、1fcf51c、655437a 已整合 c7f791a。通用接页、隔离写入/失败恢复、上下文相对资源、外部入口、同hash共享证据迁址、旧中文目标/原站绝对URL修复通过相关回归。33项初版测试与build、39项返修回归、5项新增定向测试、scoped lint及真实AGENTS preview证据见[工程记录](E:/dev/projects/AIHero/reports/full-site/assembly/README.md)。
- 原17个中文页保留；当前内容校验仅10处旧译稿sourceHash差异，由#4/#5逐篇对照后更新，不只改hash。旧目标可链接不代表按新来源制作完成。历史lint31项、新增0。
- content/** -text 保持Git检出原字节，避免core.autocrlf改变受hash保护内容。合并时保留此规则。

## 当前执行与接续

原批准方案共4名、最多同时3名；内容A/B与工程 gpt-6.1-sol / xhigh，合并 gpt-6.1-sol / medium。不增员、不改职责/模型、不递归委派。

| 角色 | ID | 当前工作树/状态 |
| --- | --- | --- |
| 内容A Galileo | 01a13350-d890-7923-9685-7d0e4222814b | [样本树](E:/dev/projects/AIHero/work/full-site-samples)，codex/full-site-samples；活动 |
| 工程 Confucius | 01a13350-da7c-7603-b6df-12e2ef76ddb1 | work/full-site-assembly；655437a，干净，暂关闭，后续#6复用 |
| 合并 Hooke | 01a13372-83fa-7a23-8edc-f47e7ead3459 | 主目录；暂关闭，后续批次复用 |
| 内容B | 尚未启动 | #4完成后启动既定第四名，承担#5其余82页 |

- 内容A样本文件在其树 reports/full-site/samples/；三篇为system-prompt、AGENTS.md指南、Output。原稿/检查/配置及shared/source-snapshots尚未提交，保留，不清理。来源修正 aaeebfe 已独立提交整合。
- 当前最后通知内容A：工程门槛已解除，合入主树 a4c86c9（实现 c7f791a）后接页和真实浏览器验收，不再等待；样本完成并提交后主代理检查，再恢复合并代理整合。
- [生产路由分配](E:/dev/projects/AIHero/reports/full-site/production-assignment.json)：A110、B82、样本3，总195，无重漏。只表示归属；按实际文章长度分完整小批次，逐页保存五项检查，不以机械计数代替语义/页面验收。
- 两内容树并行时共享index/manifest冲突由合并代理按各目标配置整合，保留其他路由，不用ours/theirs整份覆盖。
- Kimi地址127.0.0.1:10086，session aihero-local-delivery，标签组“AI Hero 本地交付”；当前内容A独占。其本地预览用4322，主项目4321。闪退后浏览器桥接可用，会话需要重新打开本地页；不按旧PID终止程序。

## 剩余边界

- #6需让app/page.tsx实际读取已制作首页内容，并保证全站入口可达；现状是固定展示文案。旧预览状态的PID24812已确认不存在，不据此结束程序。
- 邮件课程正文、报名后材料、Output视频/文字稿/运行环境/解答等取得缺口按来源报告及具体页面披露；不补答案、不声称课程代码已运行。
- 全部内容和本地验收完成后做主代理最终code-review、更新关闭完成任务、PR转待审；不自动合并、不在线部署。交付前安全清理本次工作树，先保留必要证据与交付物。
