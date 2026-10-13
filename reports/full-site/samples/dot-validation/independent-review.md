# 三样本独立审查结论

2026-10-13。审查候选：`85cbc224c8fd8e6a609112d248cc673b1e79fe90`。实际应用修复：`060ec4230bdcc124249dc7e0905894e244f5e649`。后续提交仅完善验收脚本与记录，应用、正文、来源及索引没有再变。

## 结论

#3/#4 的内容整合、公共渲染与剩余页面验收通过。建议在最终证据和逐页五项状态保存后关闭这两项，进入 #5。

Standards 当前阻塞0项。Spec 当前样本阻塞0项。此前目录高亮错误已修复，遗漏的第二英文原例/中文理解、Output材料/解答区域显示证据已补齐并实际看图。未把自动全绿当作视觉验收。

本次是批准的独立审查角色执行的分轴审查，未递归派发，也不声称执行了 mattpocock-code-review 的两个独立并行审查角色。最终全站正式代码审阅仍按最终交付安排进行。

## Standards

依据仓库 AGENTS.md、docs/agents/workflow.md、docs/localization.md、docs/full-site-assembly.md，以及规格 #1、任务 #3/#4 和交接入口。未发现本次整合或最小修复新增的规范阻塞。

- 实施基线4adfca71到初始候选d9e24261，17页索引和17条manifest中只有三个样本目标改变，其余14页逐项相同。三份正文与样本2861de1字节一致。
- 固定content/source目录的Git tree在实施基线和候选中同为87a3e922500109a93df6ad5988febc08ea2e2c2e。最终85cbc224与d9e24261的content/source、content/learning、content/zh/index.json和manifest.json差异为空，没有重新取源或用新hash掩盖旧差异。
- pilot-knowledge共享概念、模板、规则及其他页面profile保留。dictionary-source迁址的归档实际SHA-256仍为3afe0ee860b06c6ccb0531bec7dbc5b5b3f1a8fcc723a9b40bc80d1b437a07f0。
- 三份配置切换到受content/** -text保护的实际正文，preview/apply真实执行。装配事实、语义检查和浏览器验收分开记录。
- components/article-learning-tools.tsx:77-99去除窄观察带的IntersectionObserver，复用scroll事件按实际标题位置更新目录，并处理resize和事件清理。没有hash特判、添加第二份状态模型或其他无关生产改动。
- 接页失败无写入、恢复、目标隔离和共享记录等42项既有回归在准确候选Actions中通过。学习校验、构建通过。未把这三类检查当作语义或浏览器证据；没有声称全仓lint已清零。

## Spec

### 页面与交互

最终[Actions run38386427504](https://github.com/Penn-dev/AI-hero/actions/runs/38386427504)绑定85cbc224，六组页面/视口均通过。独立通过GitHub作业及artifact工具核实success。artifact11807490489的ZIP digest为c088209190622339ca17626f612b504a32fb87c085a9a01c7091aaadc4eb1370。32张图的大小和SHA-256逐一匹配browser-results.json。

证据目录为reports/full-site/samples/dot-validation/run-38386427504/。

实际目视复核了最终12张受影响截图：

- agents-md-1440-anchor.png、agents-md-390-anchor.png、output-1440-anchor.png、output-390-anchor.png。
- agents-md-1440-scrolled-section.png、agents-md-390-scrolled-section.png、output-1440-scrolled-section.png、output-390-scrolled-section.png。
- system-prompt-1440-second-example.png、system-prompt-390-second-example.png。
- output-1440-resources.png、output-390-resources.png。

桌面目录高亮与当前章节相符；窄屏标题及正文可读。移动目录当前项由脚本实际打开面板并断言，然后关闭，截图并不单独证明面板高亮。第二英文原例及中文理解完整可见，没有被底部工具栏遮挡。Output空文字稿说明、材料缺口和正确原站解答入口可见。原代码框中的长行局部滚动，没有页面整体横向溢出。

其余不受此次定位改动影响的视觉证据复用已实际看过的首轮24张图，以及历史两张AGENTS.md折叠/Prompt图。未声称看过最终全部32张图。最新执行仍覆盖术语弹层开关、独立中文词条跳转、两处折叠、代码与Prompt复制、原站入口和页面宽度。

10次剪贴板比对均来自实际复制按钮和navigator.clipboard.readText的严格相等比较。AGENTS.md完整五步中文版每视口514字符；Output每视口保留两个固定原代码块和两段完整中文Prompt。原代码期望值从固定英文来源读取，没有只核“已复制”标签。

### 返修与失败归因

- cb30755 / run38384003445在应用未改时暴露四个目录当前项断言失败，符合原始截图。真实RED结果保留在contents-repair/。
- 060ec423修复应用后，后续失败分别落在测试滚轮未产生文档滚动、截图边缘裁切、尚未结束同文档平滑跳转便reload。这些运行保留failed，没有改记passed。
- 79a923只新增刷新前等待真实标题top为30±2px。它没有程序滚动锚点、禁用smooth、放宽刷新后位置条件或移除目录断言，该运行全GREEN。
- 最终85cbc224在scripts/dot-sample-acceptance.mjs:84-109明确先about:blank，再完整深链新文档导航；等待真实标题定位后执行reload，再验标题、hash、位置及可见目录当前项。锚点步骤没有强制scrollTo，因此不能用程序滚动伪造直达成功。
- 后续文档滚动测试才使用浏览器原生scrollTo，验证实际标题位置、当前目录和hash未改变。这证明文档滚动后的目录重算，未宣称物理滚轮或真实手机触摸手势已经验证。

### 五项检查真实性

前三项复用制作执行者已有逐节对照、中文通读和概念检查记录。审查定点核对完整系统提示词及两句原例、Output完整步骤和代码，记录与正文相符。没有重新翻译合格内容或要求逐页独立模型认证。

第四项的原块、英文Prompt及中文Prompt完整性、资源入口和共享来源与实际文件/脚本相符。第五项通过以上真实页面行为与实际目视补齐；逐页文件应链接到本次证据并保留历史失败事实。

## 剩余范围

- 全站仍有8篇非样本旧稿sourceHash差异，须由#5对照固定来源复核；没有只改hash消除，不妨碍三样本自身通过。
- 195页全站制作、最终覆盖对账尚未完成。
- Output视频、文字稿正文、项目准备、锁定依赖/环境、解答正文和教程实际运行仍未取得或未验证，页面已明确披露。这些缺口不因样本通过而消失。
- 目标Windows机器的最小启动、停止、重启和深层页面现场验收未执行，#6与#1继续开放，PR #7继续草稿。不自动合并或部署。
