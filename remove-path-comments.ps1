# Script to remove path comments from the top of files
# Example: // src/components/SomeComponent.tsx

# Ensure errors stop the script
$ErrorActionPreference = "Stop"

# Get all .ts, .tsx, and .scss files
Write-Host "Searching files..." -ForegroundColor Yellow
$files = Get-ChildItem -Path "src" -Recurse -Include "*.ts", "*.tsx", "*.scss" | 
         Where-Object { $_.FullName -notlike "*node_modules*" }

$totalFiles = $files.Count
$processedFiles = 0
$modifiedFiles = 0

Write-Host "Found $totalFiles files to process" -ForegroundColor Yellow

foreach ($file in $files) {
    $processedFiles++
    $relativePath = $file.FullName.Substring((Get-Location).Path.Length + 1)
    Write-Host "[$processedFiles/$totalFiles] Processing: $relativePath" -ForegroundColor Cyan
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if the first line contains a path comment
    $lines = $content -split "`r`n|\r|\n"
    $firstLine = $lines[0]
    
    if ($firstLine -match "^// src/") {
        Write-Host "   Found path comment: $firstLine" -ForegroundColor Magenta
        
        # Remove the first line
        $newContent = $content -replace "^// src/[^\r\n]*(\r?\n)", ""
        
        # Write back to file
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        
        Write-Host "   Path comment removed" -ForegroundColor Green
        $modifiedFiles++
    }
    else {
        Write-Host "   No path comment found" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Done! Processed $totalFiles files, modified $modifiedFiles files." -ForegroundColor Green 