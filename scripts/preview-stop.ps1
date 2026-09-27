$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$projectRoot = Split-Path -Parent $PSScriptRoot
$runtimeRoot = Join-Path $projectRoot '.sites-runtime'
$statePath = Join-Path $runtimeRoot 'local-preview.json'

if (-not (Test-Path -LiteralPath $statePath)) {
  Write-Host '没有找到由“启动中文预览”创建的运行实例。' -ForegroundColor Yellow
  exit 0
}

$resolvedStatePath = (Resolve-Path -LiteralPath $statePath).Path
$resolvedRuntimeRoot = (Resolve-Path -LiteralPath $runtimeRoot).Path
if (-not $resolvedStatePath.StartsWith($resolvedRuntimeRoot, [StringComparison]::OrdinalIgnoreCase)) {
  throw '预览状态文件不在预期目录中，已拒绝停止操作。'
}

$state = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
if (-not [string]::Equals($state.projectRoot, $projectRoot, [StringComparison]::OrdinalIgnoreCase)) {
  throw '预览状态与当前项目不匹配，已拒绝停止操作。'
}

$process = Get-Process -Id $state.processId -ErrorAction SilentlyContinue
if ($process) {
  Write-Host '正在停止 AI Hero 中文预览……' -ForegroundColor Cyan
  & taskkill.exe /PID $state.processId /T /F | Out-Null
}

1..20 | ForEach-Object {
  if (Get-NetTCPConnection -LocalPort $state.port -State Listen -ErrorAction SilentlyContinue) {
    Start-Sleep -Milliseconds 250
  }
}

if (Get-NetTCPConnection -LocalPort $state.port -State Listen -ErrorAction SilentlyContinue) {
  throw "端口 $($state.port) 仍在使用，预览可能没有完全停止。"
}

Remove-Item -LiteralPath $statePath -Force -ErrorAction SilentlyContinue
Write-Host '预览已停止。' -ForegroundColor Green
