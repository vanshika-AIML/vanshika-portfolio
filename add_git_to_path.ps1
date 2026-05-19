$gitPath = 'C:\Program Files\Git\cmd'
$currentPath = [System.Environment]::GetEnvironmentVariable('Path', 'User')
if ($null -eq $currentPath) {
    $currentPath = ''
}
if ($currentPath -notlike '*Git*') {
    [System.Environment]::SetEnvironmentVariable('Path', $currentPath + ';' + $gitPath, 'User')
    Write-Host 'Git added to User PATH successfully. Please restart your terminal.'
} else {
    Write-Host 'Git is already in your PATH.'
}
