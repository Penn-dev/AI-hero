# 核心概念与规则收口

2026-09-24。范围：接续单名 Sol/medium 的只读候选整理，由治理窗口定点复核并落实三个概念及规则适用范围。

## 已完成

- 在[共享补充层](E:/dev/projects/AIHero/content/learning/shared/learning-map.json)增加 `message`、`model-provider`、`output-tokens`，附定义、别名、依赖、适用范围和原文行号。原29个概念保持原样，补充层从7个增至10个，共39个。
- 消息不等同于提示词；模型提供商包含远程服务或本地程序；输出 Token 不等同于最终可见回答。价格倍数、等待时间、具体产品推理计量未写成通用规则。
- 学习顺序先介绍模型提供商和一次请求，再解释输入与输出 Token；保留现有186条文章粗分类、3个教学配置和所有 PARTIAL/HOLD 状态。
- 在[分工与适用范围](E:/dev/projects/AIHero/reports/knowledge-foundation/astra-exit-plan.md)明确新中文链接规则优先、旧 Terra→Sol 仅限历史样本、旧规范中不冲突的保真要求继续适用。旧样本说明和试验文件保留历史版本，不追溯改写其证据。
- [系统提示词输入](E:/dev/projects/AIHero/content/learning/system-prompt/input.json)仅更新地图引用和兼容性复核记录。17个既有概念的上游记录与依赖未变；保留文章特有别名增强，不重写文章、页面配置或历史 A/B。

## 验证

- `node scripts/knowledge/check-learning-map.mjs`：通过，186篇、29个基础概念、10个补充概念、7个学习阶段、190个引用文件。覆盖来源哈希、依赖无环、学习顺序、证据范围和既有状态保留。
- `node scripts/validate-system-prompt.mjs`：通过，17个术语、11个原始概念链接、2个英文原例。
- `npm run learning:validate`：通过，现有3篇教学配置。
- 本轮写入前检查所有39个概念的中英文名称和别名，无跨概念冲突；比较全部既有页面术语的上游记录，未发生语义或依赖变化。
- 未改渲染代码或页面正文，因此没有重跑浏览器验收；以上均不代表零基础读者认可或全站正文已审。

## 已有问题与下一步

修改前，旧 `foundation.mjs check` 已报 `Read-only input drift content/learning/pilot-knowledge.json`，说明旧试验快照与后续页面配置不再一致。本轮保持原基础知识与旧包不变，没有改旧哈希掩盖问题；该历史总校验仍未恢复。

后续文章准备从基础知识和补充层按需取定义，不把39个概念全部塞入每篇页面。推理 Token 暂留相关文章，API 暂列应用开发分支先修候选。若复用旧试验包开展新生产，先按当前规则重新装配；Output练习的版本和运行材料疑点仍为HOLD。
