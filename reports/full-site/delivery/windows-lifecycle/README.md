# Windows 本项目预览启停回归

范围：#6 指定的本项目服务身份、遗留状态、停止与再次启动。沿用已有 GitHub Actions 验收，不建立新 CI 平台；此记录不替代目标 Windows 机器现场验收。

首条公开行为回归：临时目录复制现有停止入口，状态指向测试自行启动、但并非项目预览服务器的 Node 进程。实际执行 PowerShell 停止命令，要求身份不匹配时拒绝停止且进程存活。finally 仅清理测试自己启动的进程和临时目录。旧实现按 PID taskkill 会违反此要求，待取得真实 RED 后修复。

首两次回归未达到预期危险分支：临时目录使用 Windows 用户 Temp 的短路径别名，PowerShell 的项目根路径展开后不同，旧脚本提前拒绝。第一轮仅检查存活/非零退出，误给绿色；第二轮增加明确身份错误原因检查后正确失败。下一轮把自建测试目录放在仓库根下，避免路径别名，仍保留所有原始结果；只有触发到目标行为的结果才算 RED。

真实 RED：3385c7b / run38408904274 / windows-preview job115335887902，旧停止入口返回成功却结束了自建无关测试进程，survivor=false。修复仅通过当前进程句柄、Node 可执行文件和当前项目绝对服务器脚本命令行确认身份后停止；不再 taskkill 历史 PID 或整个进程树。依据微软 [Process 句柄文档](https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.process) 与 [进程 ID 复用说明](https://devblogs.microsoft.com/oldnewthing/20110107-00/?p=11803)。Inspect 仅查询当前实例及监听所属，供启动入口复用。

第一条 GREEN：c9545805 / run38409450389 / windows-preview job115337603098，实际停止入口以明确身份不符拒绝，测试无关进程仍存活。下一条纵向回归验证启动入口不会把 4321 上仅含 AI Hero 字样的其他测试服务认成本项目；先保留旧启动实现取得 RED。
