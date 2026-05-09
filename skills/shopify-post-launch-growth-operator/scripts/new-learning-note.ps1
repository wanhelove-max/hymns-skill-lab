param(
  [string]$ProjectRoot = (Get-Location).Path,
  [string]$Title = "learning-note"
)

$safeTitle = ($Title.ToLower() -replace '[^a-z0-9]+', '-' -replace '(^-|-$)', '')
if ([string]::IsNullOrWhiteSpace($safeTitle)) {
  $safeTitle = "learning-note"
}

$dir = Join-Path $ProjectRoot "content\growth-learning"
New-Item -ItemType Directory -Force $dir | Out-Null

$date = Get-Date -Format "yyyy-MM-dd"
$path = Join-Path $dir "$date-$safeTitle.md"

if (Test-Path $path) {
  Write-Host "Learning note already exists: $path"
  exit 0
}

@"
# Learning Note

Date: $date
Source:
Platform:
Niche:
Evidence type: official / operator-anecdote / case-study / creative-observation / own-data
Confidence: high / medium / low

## Observation


## Transferable Pattern


## Test For This Store


## Landing Route


## Compliance Risk


## Result


"@ | Set-Content -Encoding UTF8 $path

Write-Host "Created learning note: $path"
