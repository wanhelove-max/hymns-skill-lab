param(
  [string]$SkillsRoot = "$env:USERPROFILE\.codex\skills"
)

$required = @(
  "project-orchestrator",
  "shopify-development",
  "store-analyzer",
  "store-fixer"
)

$recommended = @(
  "seo-audit",
  "technical-seo",
  "onpage-optimization",
  "meta-data-optimization",
  "seo-aeo-keyword-research",
  "seo-aeo-internal-linking",
  "seo-aeo-schema-generator",
  "seo-images",
  "google-search-console",
  "page-cro",
  "conversion-rate-optimization",
  "mobile-optimization",
  "core-web-vitals",
  "site-speed-optimization",
  "shopify-theme-optimization",
  "shopify-page-speed",
  "wcag-audit-patterns",
  "accessibility",
  "playwright",
  "chrome",
  "article",
  "copywriting",
  "avoid-ai-writing",
  "brand-visual",
  "color-palette",
  "frontend-skill"
)

function Test-Skill {
  param([string]$Name)
  $path = Join-Path $SkillsRoot $Name
  [PSCustomObject]@{
    skill = $Name
    present = Test-Path (Join-Path $path "SKILL.md")
    path = $path
  }
}

$rows = @()
foreach ($skill in $required) {
  $row = Test-Skill $skill
  $row | Add-Member -NotePropertyName tier -NotePropertyValue "required"
  $rows += $row
}
foreach ($skill in $recommended) {
  $row = Test-Skill $skill
  $row | Add-Member -NotePropertyName tier -NotePropertyValue "recommended"
  $rows += $row
}

$rows | Sort-Object tier, skill | Format-Table tier, skill, present, path -AutoSize

$missingRequired = $rows | Where-Object { $_.tier -eq "required" -and -not $_.present }
$missingRecommended = $rows | Where-Object { $_.tier -eq "recommended" -and -not $_.present }

Write-Host ""
Write-Host "Summary:"
Write-Host ("Required missing: {0}" -f $missingRequired.Count)
Write-Host ("Recommended missing: {0}" -f $missingRecommended.Count)

if ($missingRequired.Count -gt 0) {
  Write-Host ""
  Write-Host "Missing required skills can be replaced by the fallbacks in references/dependency-manifest.md."
  exit 1
}

exit 0
