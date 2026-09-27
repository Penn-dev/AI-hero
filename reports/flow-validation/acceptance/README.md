# Dictionary 匿名页面交接

装配 PASS；浏览器运行验收 PARTIAL；语义与教学质量待治理评定；Workshop 继续 HOLD。

先阅读 [页面 X](http://127.0.0.1:4327/review/flow-validation/x) 与 [页面 Y](http://127.0.0.1:4327/review/flow-validation/y)，也可从 [最小入口](http://127.0.0.1:4327/review/flow-validation) 打开。均为当前电脑上的本地预览。首次交接不揭示路线对应关系。

## 已验证的页面行为

| 检查 | 结果与边界 |
|---|---|
| 六份 edited 文件 | SHA-256 全部与治理提供的值一致；生产者文件保持原样 |
| 统一装配 | 两条原例各插入一次对应中文理解；移除插入片段后，正文完全恢复 |
| 内容来源 | 每页只使用该页的正文与 learning JSON；不调用旧学习知识装载器，不补写定义或别名 |
| 类型适配 | 保留各自的摘要、卡片、前置概念、术语、相关概念；dictionary 不新增练习 |
| 类型检查和构建 | `tsc --noEmit --incremental false`、`npm run build` 均通过 |
| 桌面与手机 | 1280×900、390×844 下完成两页读取；记录中无横向溢出 |
| 术语 | 单词解释、替换为第二个词、全部列表、prefix 搜索以及手机底部入口重置已观察成功 |
| 英文原例 | 页面 DOM 中原例与各自中文理解相邻；完整 DOM 与关键区域截图已保存 |
| 链接 | 正文/相关概念保留英文来源地址；目标检查不代表外站可用性验收 |

## 仍然是 PARTIAL 的事项

1. 手机目录能更新 `#reading-body`，但点击后观察到正文标题仍在视口上方（X 约 -1109px、Y 约 -1469px）。尚未区分滚动锁恢复、动画时序或其他原因，不能宣称目录落点通过。
2. 浏览器记录到 `RSC prefetch setup error: TypeError: f is not a function`。直接打开页面与已测试的术语交互可用；预取行为未验收。没有证据把它归因于本次装配，也没有改动范围外的公共运行时。
3. 正文可直接点击的术语较少：X 为 0 个、Y 为 1 个。两页使用相同的“本文术语”入口，分别提供原产物中的 4 和 13 项定义。未通过补写别名改变差异。
4. 整页截图及一次正文区域截图超时。保留清晰的关键区域图片和完整 DOM 记录；不把失败截图计为整页视觉证据。截图中的固定侧栏位置会受实际滚动位置影响。

上述结果仅完成装配与行为取证，不替代治理的忠实度、教学组织和最终等质量判断。

## Token 计量

| 阶段 | 请求数 | 总 Token | 状态 |
|---|---:|---:|---|
| A 初译 · Terra / medium | 11 | 478,912 | 已完成轮次 |
| A 编校 · Sol / medium | 22 | 1,073,223 | 已完成轮次 |
| B 初译 · Terra / medium | 10 | 479,672 | 已完成轮次 |
| B 编校 · Sol / medium | 13 | 689,226 | 已完成轮次 |
| 历史知识底座制作与修订 | 25 | 2,197,146 | 历史一次性投入 |
| 本轮共同准备 | 19 | 3,077,506 | 共同新增投入 |

本轮页面装配/浏览器验收的最新快照见 [计量汇总](E:/dev/projects/AIHero/reports/flow-validation/acceptance/cost-summary.json)，状态为 `PARTIAL_ACTIVE_TURN`，尚未包含后续整理、最终回复及交接。截图超时和反复取证均发生在这一共同阶段。治理成本为 unknown，不能填 0；本次未取得授权日期范围内的治理日志，也没有可确认的试验轮次边界。

按 responseId 去重后累加每次请求计量，累计计数只用于对账。cached input 已包含在 input 中，reasoning 已包含在 output 中，不重复相加。这是 Token 账，不是订阅额度或货币费用。失败/重试次数保持 null；计量按完整阶段轮次归集，包含 HOLD 处理，不能当成精确隔离的单篇操作成本。

## 可追溯性与例外

四个任务的模型和推理强度已由计量记录的 turn_context 验证。A 两份 stage.json 中的 unknown taskId 已在独立报告映射；B 初译的相对路径已解析，B 编校将 taskId 放入 usage.turnIds 的情况也已单列，原件未改。所有记录中的项目内输入哈希均匹配；A 初译只记录入口文件哈希，不能据此声称输入清单完整。文件哈希匹配也不证明每次请求实际读过哪些文件。

B 初译交接自报读取 MEMORY.md 关键词索引；A 编校在 stage.json 披露项目历史记忆索引查询。其“未读取或使用旧样本答案”的声明仍属于自报，无法独立证明完全没有影响。A 初译未报例外；B 编校声明没有白名单外读取。本试验不能标为严格独立，不能据单个词典样本推出胜负、普遍等质量或节省结论。

## 证据与运行

- [装配与六份文件哈希](E:/dev/projects/AIHero/reports/flow-validation/acceptance/assembly-validation.json)
- [浏览器交互、完整 DOM 与错误记录](E:/dev/projects/AIHero/reports/flow-validation/acceptance/browser-evidence.json)
- [截图清单与哈希](E:/dev/projects/AIHero/reports/flow-validation/acceptance/screenshot-manifest.json)
- [任务和输入哈希映射](E:/dev/projects/AIHero/reports/flow-validation/acceptance/producer-mapping.json)
- [例外台账](E:/dev/projects/AIHero/reports/flow-validation/acceptance/exceptions.json)
- [逐请求原始计量证据](E:/dev/projects/AIHero/reports/flow-validation/preparation/usage-evidence.json)
- [本地服务状态](E:/dev/projects/AIHero/reports/flow-validation/runtime/state.json)

服务使用独立端口 4327；原有 4321 服务未停止。项目目录没有 Git 元数据，无法提供 Git 差异证明；本次文件边界、六份 edited 哈希与生成产物由上述文件记录支持。

![X 手机单项术语](E:/dev/projects/AIHero/reports/flow-validation/acceptance/screenshots/X-mobile-390-term.jpg)

![Y 手机术语搜索](E:/dev/projects/AIHero/reports/flow-validation/acceptance/screenshots/Y-mobile-390-search.jpg)
