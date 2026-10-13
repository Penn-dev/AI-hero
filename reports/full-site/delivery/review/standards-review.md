# 最终代码候选 Standards 审查

结论：无阻断。固定代码 SHA：`1e86ac0caad08a7da54d57a9a473a5b6ef909450`。本报告只承担 Standards 轴，不替代独立 Spec 结论，也不代表目标 Windows 现场通过；#1/#6 继续开放，PR #7 保持草稿、不合并。

## 范围与标准

固定比较：`git diff c9545805d6ef053b893b349cbab413e50e32d86f...1e86ac0caad08a7da54d57a9a473a5b6ef909450`。范围为后续五个提交：fa3b09f、a367047、be6985a、43cc000、1e86ac0；重点复核 Windows 启动/既有停止入口、锁保护及公共页眉删除无依据“授权”字样。依据 AGENTS.md、CONTEXT.md、docs/agents/workflow.md、docs/localization.md、docs/full-site-assembly.md；未找到 CODING_STANDARDS.md 或 CONTRIBUTING.md。应用代码气味基线，未发现值得返工的标准违例或维护性问题。

## 独立证据

- 逐一读取固定 Git 对象：195 页译稿字节、SHA256 与 c9545805 完全一致，索引条目一致；整个 content 树相同（`52f3447b74972b1d093fd4cd8f4f06fba5f2af50`）。重新绑定既有192页制作UI与3篇原样本证据，未用本轮首页冒充全站重验。
- 最后6张原图全部核字节/hash并目视；1440与390顶屏均显示“AI Hero 中文学习版”，正文、图片、资源入口正常。生产结果两视口通过、浏览器错误为空，根宽1440/1440、390/390。源码页眉只删两字，公共渲染与导航逻辑未改。
- Windows原始日志4/4、零跳过：旧PID身份不符时拒绝且无关进程仍活；同名外部网页占用4321时拒绝、不创建状态、不终止服务；已存在锁逐字节保留；真实项目启动、重复启动复用、4条中文路由重复请求、Inspect核监听归属、停止、重复停止、重启及最终停止全部通过。它是隔离Windows runner证据，不是用户机器实测。
- 复核停止入口先持有Process Handle，再核Node可执行文件、完整项目脚本命令行，保持句柄至Kill；启动不再以网页名称判断归属，失败仅清理当次子进程及仍相同的状态。旧锁自动删除路径已移除，原P2竞争阻断关闭。重新运行原样acquireStartLock的两个真实Node进程：已有锁零赢家且原字节保留，无锁恰好一个赢家。
- 在固定候选独立快照重新执行page:test，46/46、零跳过。另外独立执行tsc --noEmit --incremental false退出0；继承并核读该快照sync:validate（195可渲染、errors空）及learning:validate通过日志；没有在Linux上冒充运行Windows专用测试。
- 从GitHub只读重取run38413956876的job与artifact元数据，两个artifact均绑定同一SHA；本地ZIP digest与GitHub相等，全部解压文件逐字节相同。Windows job115353284433的实际测试步骤成功，非只看CI总绿。

## 交付文档边界

当前README、Windows说明、现场模板、缺口说明及候选入口已只读检查，检查到的本地链接均存在；Node≥22.13、PowerShell7、旧锁先确认无人启动再改名、无关进程不结束、现场待验均明确。它们尚未属于上述代码SHA，已另外固定文档hash供归档提交复核，不将工作树文档伪称已提交。

## 证据文件与方法

本目录：`successor-verification.json`（195页及6图逐项hash）、`remote-provenance.json`、`lock-green.json`、`successor-page-tests.log`、`successor-tsc.log`、`draft-docs-links.json`。既有UI报告：`../../batches/integration-08/review/standards-review.md`；竞争RED：`../windows-lifecycle/README.md`。最终原件：`../run-38413956876/`、`../windows-lifecycle/final-green.log`（原图见候选ZIP及逐图哈希）。

Standards：0项阻断，0项需处理建议；Spec由另一独立审查者报告。
