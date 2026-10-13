# 系统提示词样本检查

2026-10-13，制作执行者对照固定原文完成语义检查。来源 SHA-256：`280e76f1e360a136463e07681767779189f0487d1d7e94096153600571e3bc9a`。[原文](E:/dev/projects/AIHero/content/source/ai-coding-dictionary/system-prompt.md) · [修订稿](E:/dev/projects/AIHero/reports/full-site/samples/drafts/system-prompt.md) · [接页配置](E:/dev/projects/AIHero/reports/full-site/samples/configs/system-prompt.json)。

| 五项 | 当前结论 | 实际依据 |
| --- | --- | --- |
| 信息完整准确 | 语义检查通过 | 逐段核对四段正文：工作说明内容与会话稳定性；厂商默认规则、Token/工作轮次计费、个人规则；前缀缓存；相对用户消息的优先级和可自定义例外。恢复原段落顺序和语气。两句 Usage 保留英文并逐句配中文理解。 |
| 中文自然 | 通读通过 | 保留“你”的人称、直接解释和原文比喻，使用稳定的“智能体执行框架”。 |
| 必要概念讲清 | 检查通过 | 保留合格本页术语释义；缓存、请求和工作轮次的边界集中在明确译注中，未把厂商默认规则绝对化为不可修改。 |
| 代码与链接保真 | 原文与接页检查通过 | 无代码或待翻译 Prompt；11 个正文术语入口、作者图片、导航、订阅和分享入口保留。LinkedIn 原 HTML 的完整 URL 与冻结 Markdown 解析结果不同；未添加错误截断 URL 来通过检查。 |
| 页面正常显示 | 未验证 | 三篇统一入口已成功 preview/apply。本页尚未执行本地浏览器检查；1440/390、术语独立跳转、深链和溢出均待续接。 |

旧稿可用的解释和两句中文理解保留；原有按问题重新分段的包装撤回，以原文四段为界。页面外壳与教学正文分开：翻译订阅文案、表单字段说明、分享标签，提供原站入口，不提供本地订阅表单。两个英文对话原例设为 inline，避免 profile 再重复显示。

待处理：[工程问题记录](E:/dev/projects/AIHero/reports/full-site/samples/engineering-blockers.md)。范围外旧词条不会只更新 hash；页面链接状态必须如实披露。

## 用户要求暂停后的状态

三篇统一入口已成功 preview/apply。本页尚未执行本地浏览器检查；1440/390、术语独立跳转、深链和溢出均待续接。

此前初次 preview/工程问题段落保留为历史记录，不代表当前仍被阻断。接页已完成；learning 校验与最新构建通过。#4 尚未完成，详见[暂停检查点](E:/dev/projects/AIHero/reports/full-site/samples/checkpoint.md)。

## dot 接续后的最新页面结果

2026-10-13，准确候选 `85cbc224c8fd8e6a609112d248cc673b1e79fe90` 的 [run38386427504](https://github.com/Penn-dev/AI-hero/actions/runs/38386427504) 已通过1440和390两视口实际页面检查，相关截图已查看。五项中的“页面正常显示”更新为通过；原语义与保真检查、未取得材料披露继续有效。实际交互、剪贴板比对、冷开深链/刷新和目录返修见 [最新汇总](./dot-validation/README.md) 与 [原始结果](./dot-validation/run-38386427504/browser-results.json)。上方暂停状态保留为历史，不代表当前仍未执行。[独立审查](./dot-validation/independent-review.md)通过，GitHub收尾见任务记录。
