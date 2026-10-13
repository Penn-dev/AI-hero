# AI Hero 中文版：交付候选与现场入口

2026-10-13。固定 195 页已完成中文制作及双轴独立审查，#2–#5 已关闭。目标 Windows 机器的最小现场验收尚未执行，#1/#6 保持开放，PR #7 保持草稿。

## 准确候选

- 代码与内容候选：[1e86ac0caad08a7da54d57a9a473a5b6ef909450](https://github.com/Penn-dev/AI-hero/commit/1e86ac0caad08a7da54d57a9a473a5b6ef909450)
- 实施分支：`codex/full-site-chinese`；沿用 [PR #7](https://github.com/Penn-dev/AI-hero/pull/7)
- [Windows 使用说明](../../docs/local-preview.md)；[现场结果模板](../full-site/delivery/onsite-result-template.md)
- [最后代码候选 Actions](https://github.com/Penn-dev/AI-hero/actions/runs/38413956876)：两个任务通过，包括 46 个真实组件/接页测试、来源学习校验、195 稿强调检查、构建、首页桌面/手机以及 Windows 4 项生命周期回归。

后续只归档文档/证据的提交不改变这份代码候选。签收记录始终填写实际取得的完整 SHA；目标 Windows 可以直接验上面固定提交，或最终回执中明确与其代码相同的文档归档提交。

## 完成范围与证据

- 固定195：保留3篇样本，完整制作71篇词典、82篇文章/教程、39篇Skills。来源 manifest 未重新同步，原代码、命令、英文 Prompt/对话和资源入口保留；中文 Prompt 与译注逐页核对。
- [逐页五项验收表](../full-site/acceptance-status.json)按当前正文哈希绑定实际通过的候选和 run，不把失败 run 中未完成的页面算通过。
- [规格轴全站通过报告](../full-site/batches/integration-08/review/spec-verdict.md)、[标准轴最终 UI 报告](../full-site/batches/integration-08/review/standards-review.md)。完整原图已逐批独立查看；失败记录和定向返修证据都保留。
- 中文首页含全部194个非首页深链。最后全目录验证实际点击194项并核路径集合，头部首页/品牌真实返回通过；1269条范围内中文入口对账无失效目标。公共页眉现为中性“AI Hero 中文学习版”，没有未经核实的授权宣称。
- [最终启停/文案差异证据](../full-site/delivery/candidate-evidence.json)、[Windows RED→GREEN](../full-site/delivery/windows-lifecycle/README.md)。旧 PID 不得结束无关进程、其他监听不得被认作项目、旧启动锁不得自动回收；正常启动/复用/停止/重启实测通过。
- 原始 UI ZIP 的文件名、版本、SHA256、Actions artifact ID 见[证据归档索引](../full-site/batches/evidence-archives.json)。原 ZIP 同时持久保存在用户文件附件；仓库保存逐图哈希、JSON、日志、独立审查和代表图，不提交私有下载地址。

最终代码差异与现场说明已由两轴独立复核：[规格报告](../full-site/delivery/review/final-review-1e86ac0.md)、[标准报告](../full-site/delivery/review/standards-review.md)。它们允许进入目标机器现场验收，不表示目标机器已通过。

## 仍需现场完成

按使用说明取得候选、启动、阅读首页与三类代表页、新标签直达深链并刷新、停止、再启动并最终停止；只有遇到遗留状态时做必要检查并记录。无需重做完整中文制作或全站浏览器验收。

返回填写好的现场模板及必要失败证据后，由 Dot 完成返修和 GitHub 收尾。现场未通过不关闭 #1/#6，不将 PR 转为正式待审；不自动合并，在线部署另行安排。

## 不属于已取得材料

[来源与功能缺口](../full-site/delivery/source-gaps.md)列明邮件课、报名后课程、未取得视频/文字稿、Solution、登录个人进度、动态报名/价格和教程运行的边界。原站入口保留，未虚构材料或实际可运行承诺。

## 历史可追溯性

本次由远端入口指定的 `4adfca71cff3f2b2d4d13e34532f260dcc361e74` 接续，保留样本分支 `codex/full-site-samples` 的 `2861de1a7afcfafe4ec29044abbab7d51d052974` 和原始证据。历史暂停/未验记录描述当时状态；现行入口是本文件，不改写过去失败为成功。
