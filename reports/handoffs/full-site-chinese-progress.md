# 全站中文化实施进度

更新：2026-10-13。工作区：[AIHero](E:/dev/projects/AIHero)。

## 当前入口

- 规格：[GitHub #1](https://github.com/Penn-dev/AI-hero/issues/1)、[本地规格](E:/dev/projects/AIHero/docs/specs/full-site-chinese.md)。
- 任务：[任务入口](E:/dev/projects/AIHero/docs/specs/full-site-chinese-tickets.md)。依赖：#2、#3 → #4 → #5 → #6。
- 实施分支：`codex/full-site-chinese`；起点：`f61f0d5`（原 `main`）。
- 已核对并原样保留初始未提交文件：`CONTEXT.md`、`docs/specs/full-site-chinese.md`、`docs/specs/full-site-chinese-tickets.md`、`reports/knowledge-foundation/work-order-review.md`。
- GitHub 组件已成功读取 #1–#6，均开放且无评论；继续使用组件，不依赖失效的 gh 登录。

## 实际状态

| 任务 | 状态 | 下一步 |
| --- | --- | --- |
| #2 来源与规范 | 内容 A 执行中 | 同步一次公开源文，核对与固定范围，再整合简短规范 |
| #3 安全接页 | 工程代理执行中 | 复用现有解析和目标更新，先测失败无写入与页面隔离 |
| #4 三类样本 | 等待 #2、#3 | 逐节核对三篇，修订、接页并真实检查页面 |
| #5 全站制作 | 等待 #4 | 按固定来源分配完整文章批次，保存每篇五项检查 |
| #6 本地交付 | 等待 #5 | 覆盖核对、启动/停止/再启动、使用说明 |

初始清单仍是历史快照：186 份已取得源文、17 个可渲染中文页，不代表当前来源范围或全站验收。`node scripts/validate-content.mjs` 初始运行通过；该脚本只检查 `translated` 状态，而现有 17 页使用其他译稿状态，覆盖缺陷由 #3 修复。

初始 lint 实际失败记录见[基线日志](E:/dev/projects/AIHero/reports/full-site/lint-baseline.log)，仅要求修复本次新增问题。Git 推送 dry-run 已成功，PR 可使用 Git 推送与 GitHub 组件创建。

待后续处理的已确认点：`app/page.tsx` 使用固定展示文案，没有读取中文索引；#5 应制作固定来源的 `/` 页面，#6 核对首页实际渲染与全站入口。旧本地预览状态指向 2026-09-22 的 PID 24812；本次检查无该进程及 4321/5173 监听，不据此终止任何程序。

## 子代理方案与授权

用户已明确批准完整方案，并将前三名推理强度指定为 xhigh。共 4 名，最多同时运行 3 名：内容 A（#2、#4、#5 词条/指南），内容 B（#5 其余文章/教程），工程（#3、#6 与相关返修），合并（整合工作树和冲突核对）。前三名 `gpt-6.1-sol / xhigh`，合并 `gpt-6.1-sol / medium`。主代理负责协调、验收核对、最终 code-review 与 GitHub 更新。复用上述人员返修，不递归委派；变化须另获批准。

- 内容 A：`01a13350-d890-7923-9685-7d0e4222814b`（Galileo）；[工作树](E:/dev/projects/AIHero/work/full-site-source)，分支 `codex/full-site-source`。
- 工程：`01a13350-da7c-7603-b6df-12e2ef76ddb1`（Confucius）；[工作树](E:/dev/projects/AIHero/work/full-site-assembly)，分支 `codex/full-site-assembly`。
- 内容 B、合并：尚未启动；按依赖和成果就绪情况启动。

## 持续执行边界

- 保留合格既有成果；首轮通过 Codex 小批次制作，不启用 API 翻译器。
- 工程行为使用 TDD 验证关键风险；内容以逐节语义检查、结构校验和真实页面检查验收。
- 内容完成才关闭对应任务。首批合入后开草稿 PR，全部验收后改为待审，PR 不自动合并。
- 本轮为本地交付；在线部署另行安排。暂未创建 PR、关闭任务、同步源文或生产新译稿。
- 续接先核对本文件、当前 Git 状态、GitHub 任务和代理授权；每批更新完成页面、具体缺口与下一步，避免重做有效检查。
