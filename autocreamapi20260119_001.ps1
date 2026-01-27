<#
.SYNOPSIS
    Recursively converts CRLF (Windows) line endings to LF (Unix) for specific file types.
.DESCRIPTION
    Scans the current directory and subdirectories for files with specific extensions
    and converts their line endings to LF.
    Safety Note: This script targets specific extensions to avoid corrupting binary files.
#>

# 1. Define the extensions you want to convert (Add/Remove as needed)
$targetExtensions = @(
    "*.txt", "*.md", "*.sh", "*.bash", "*.zsh", 
    "*.js", "*.ts", "*.json", "*.py", "*.java", 
    "*.c", "*.cpp", "*.h", "*.css", "*.html", 
    "*.xml", "*.yaml", "*.yml", "*.php", "*.sql",
    "*.rb", "*.go", "*.rs", "*.lua", "*.conf", "*.ini"
)

# Get the current directory
$currentDir = Get-Location
Write-Host "Scanning '$currentDir' for DOS line endings..." -ForegroundColor Cyan

# 2. Find files recursively
$files = Get-ChildItem -Path . -Include $targetExtensions -Recurse -File

$count = 0

foreach ($file in $files) {
    try {
        # Read the file content (Preserving encoding can be tricky, assuming UTF8 here)
        $content = [System.IO.File]::ReadAllText($file.FullName)
        
        # Check if the file actually contains CRLF
        if ($content -match "`r`n") {
            # Replace CRLF with LF
            $newContent = $content -replace "`r`n", "`n"
            
            # Write the content back (Forces UTF-8 No BOM is standard for Linux/Unix)
            [System.IO.File]::WriteAllText($file.FullName, $newContent)
            
            Write-Host "Converted: $($file.Name)" -ForegroundColor Green
            $count++
        }
    }
    catch {
        Write-Host "Error processing $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "------------------------------------------------"
Write-Host "Done. Converted $count files to Unix (LF) format." -ForegroundColor Cyan