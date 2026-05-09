param(
  [string]$ProjectRoot = (Get-Location).Path
)

$handoff = Join-Path $ProjectRoot "content\growth-handoff.md"
if (-not (Test-Path $handoff)) {
  Write-Host "Missing content\growth-handoff.md"
  Write-Host "Create it from the store-builder stage before running growth execution."
  exit 1
}

$text = Get-Content -Raw $handoff
$required = @(
  "Store name",
  "Store URL",
  "Launch status",
  "Brand positioning",
  "Target customer",
  "Ready landing routes",
  "Material claims allowed",
  "Claims banned",
  "Installed app stack",
  "Next growth objective"
)

$missing = @()
foreach ($field in $required) {
  if ($text -notmatch [regex]::Escape($field)) {
    $missing += $field
  }
}

if ($missing.Count -gt 0) {
  Write-Host "Growth handoff exists but is missing fields:"
  $missing | ForEach-Object { Write-Host "- $_" }
  exit 1
}

Write-Host "Growth handoff looks ready."
exit 0
