param(
  [string]$ProjectRoot = (Get-Location).Path,
  [string]$OutputDir = "",
  [string]$Skill = "shopify-post-launch-growth-operator"
)

if ([string]::IsNullOrWhiteSpace($OutputDir)) {
  $OutputDir = Join-Path $ProjectRoot "learning-pack-export"
}

$sourceDir = Join-Path $ProjectRoot "content\growth-learning"
if (-not (Test-Path $sourceDir)) {
  Write-Host "No content\growth-learning directory found."
  exit 1
}

New-Item -ItemType Directory -Force $OutputDir | Out-Null
$date = Get-Date -Format "yyyy-MM-dd"
$packDir = Join-Path $OutputDir "$date-$Skill-pack"
New-Item -ItemType Directory -Force $packDir | Out-Null

Copy-Item -Path (Join-Path $sourceDir "*.md") -Destination $packDir -ErrorAction SilentlyContinue

$manifest = @"
{
  "created_at": "$date",
  "skill": "$Skill",
  "source": "local-export",
  "redaction_required": true,
  "notes": "Review and redact before submitting to GitHub."
}
"@
$manifest | Set-Content -Encoding UTF8 (Join-Path $packDir "manifest.json")

Write-Host "Created learning pack: $packDir"
Write-Host "Review and redact before submitting."
