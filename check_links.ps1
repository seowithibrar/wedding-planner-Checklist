$ErrorActionPreference = 'Stop'
$blogFiles = Get-ChildItem -Path "src/content/blog" -Filter "*.mdx"

# Known valid routes
$validRoutes = [System.Collections.Generic.HashSet[string]]::new()
$validRoutes.Add("/") | Out-Null
$validRoutes.Add("/blog") | Out-Null
$validRoutes.Add("/sitemap") | Out-Null
$validRoutes.Add("/sitemap.xml") | Out-Null
$validRoutes.Add("/about-us") | Out-Null
$validRoutes.Add("/contact") | Out-Null
$validRoutes.Add("/privacy-policy") | Out-Null
$validRoutes.Add("/terms-of-service") | Out-Null

# Tools
Get-ChildItem -Path "src/pages/tools" -Filter "*.astro" | ForEach-Object {
    $slug = $_.BaseName
    $validRoutes.Add("/tools/$slug") | Out-Null
}

# Checklists
$chkJson = [System.IO.File]::ReadAllText((Resolve-Path "src/data/categorized-checklists.json")) | ConvertFrom-Json
foreach ($c in $chkJson.checklists) {
    $validRoutes.Add("/checklists/$($c.slug)") | Out-Null
}
$validRoutes.Add("/checklists/wedding-budget-calculator-10k") | Out-Null
$validRoutes.Add("/checklists/wedding-budget-calculator-20k") | Out-Null

# Blog
foreach ($bf in $blogFiles) {
    $content = [System.IO.File]::ReadAllText($bf.FullName)
    if ($content -match '(?m)^slug:\s*["'']?([^"''\r\n]+)') {
        $slug = $matches[1].Trim()
        $validRoutes.Add("/blog/$slug") | Out-Null
    } else {
        $validRoutes.Add("/blog/$($bf.BaseName)") | Out-Null
    }
}

# Check if file exists in public/
Get-ChildItem -Path "public" -Recurse | ForEach-Object {
    if (-not $_.PSIsContainer) {
        $rel = $_.FullName.Substring((Resolve-Path "public").Path.Length).Replace("\", "/")
        $validRoutes.Add($rel) | Out-Null
        $validRoutes.Add([System.Uri]::EscapeUriString($rel)) | Out-Null
    }
}

# Check all links in src (astro, mdx, json, ts)
$srcFiles = Get-ChildItem -Path "src" -Recurse -Include "*.astro","*.mdx","*.json","*.ts"
$broken = @()

foreach ($f in $srcFiles) {
    $text = [System.IO.File]::ReadAllText($f.FullName)
    # find href="..."
    $pattern1 = 'href=["''](/[^"''>#?]+)'
    $matches1 = [System.Text.RegularExpressions.Regex]::Matches($text, $pattern1)
    foreach ($m in $matches1) {
        $path = $m.Groups[1].Value
        # clean trailing slash if not root
        if ($path.Length -gt 1 -and $path.EndsWith("/")) {
            $path = $path.TrimEnd("/")
        }
        if (-not $validRoutes.Contains($path) -and -not $path.StartsWith("/sitemap.xsl")) {
            $broken += [PSCustomObject]@{ File = $f.FullName.Replace((Get-Location).Path + "\", ""); Link = $path }
        }
    }

    # find markdown links [...](/...)
    $pattern2 = '\]\((/[^)#?]+)'
    $matches2 = [System.Text.RegularExpressions.Regex]::Matches($text, $pattern2)
    foreach ($m in $matches2) {
        $path = $m.Groups[1].Value
        if ($path.Length -gt 1 -and $path.EndsWith("/")) {
            $path = $path.TrimEnd("/")
        }
        if (-not $validRoutes.Contains($path)) {
            $broken += [PSCustomObject]@{ File = $f.FullName.Replace((Get-Location).Path + "\", ""); Link = $path }
        }
    }
}

Write-Output "=== Broken Links Found: $($broken.Count) ==="
$broken | Sort-Object Link -Unique | Format-Table -AutoSize
