param([switch]$Inspect)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$projectRoot = Split-Path -Parent $PSScriptRoot
$statePath = Join-Path $projectRoot '.sites-runtime/local-preview.json'
if (-not (Test-Path -LiteralPath $statePath)) {
  if ($Inspect) { '{"running":false}' } else { Write-Host '没有找到由本项目创建的运行实例。' }
  exit 0
}

$stateText = Get-Content -LiteralPath $statePath -Raw
$state = $stateText | ConvertFrom-Json
if (-not [string]::Equals((Resolve-Path -LiteralPath $state.projectRoot).Path, $projectRoot, [StringComparison]::OrdinalIgnoreCase)) {
  throw '预览状态与当前项目不匹配，已拒绝停止操作。'
}
if ($state.processId -isnot [long] -and $state.processId -isnot [int]) { throw '无效的预览进程身份。' }
if ($state.processId -le 0 -or $state.port -ne 4321) { throw '无效的预览进程身份或端口。' }

$process = Get-Process -Id $state.processId -ErrorAction SilentlyContinue
if ($process) {
  try {
    # Bind the live process before inspecting it; retain this handle through Kill.
    $null = $process.Handle
    $info = Get-CimInstance Win32_Process -Filter "ProcessId = $($state.processId)"
    $scriptPath = Join-Path $PSScriptRoot 'local-preview-server.mjs'
    $expectedCommand = '^\s*"?' + [regex]::Escape($process.Path) + '"?\s+"?' + [regex]::Escape($scriptPath) + '"?\s*$'
    if (-not $info -or [IO.Path]::GetFileName($process.Path) -ine 'node.exe' -or
        -not [string]::Equals($info.ExecutablePath, $process.Path, [StringComparison]::OrdinalIgnoreCase) -or
        $info.CommandLine -notmatch $expectedCommand) {
      throw '预览进程身份不匹配 (identity mismatch)，已拒绝停止；没有结束任何其他程序。'
    }
    if ($Inspect) {
      $listeners = @(Get-NetTCPConnection -LocalPort 4321 -State Listen -ErrorAction SilentlyContinue)
      @{ running = $true; processId = $process.Id; ownsPort = [bool]($listeners | Where-Object { $_.OwningProcess -eq $process.Id -and $_.LocalAddress -eq '127.0.0.1' }) } | ConvertTo-Json -Compress
      exit 0
    }
    Write-Host '正在停止已核对身份的 AI Hero 中文预览……'
    $process.Kill()
    if (-not $process.WaitForExit(5000)) { throw '本项目预览未能在五秒内停止。' }
  } finally {
    $process.Dispose()
  }
} elseif ($Inspect) {
  '{"running":false}'
  exit 0
}

if ((Get-Content -LiteralPath $statePath -Raw) -ne $stateText) { throw '运行状态已变化，已保留新的状态文件。' }
Remove-Item -LiteralPath $statePath -Force
Write-Host '本项目预览已停止；不会处理其他端口占用程序。'
