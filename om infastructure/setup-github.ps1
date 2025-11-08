# GitHub Setup Script for Vercel Deployment
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Setup for Vercel Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git initialized" -ForegroundColor Green
}

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green

# Commit
Write-Host "Committing files..." -ForegroundColor Yellow
git commit -m "Initial commit - OMBALAJI Infra website"
Write-Host "✓ Files committed" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a GitHub repository:" -ForegroundColor White
Write-Host "   - Go to: https://github.com/new" -ForegroundColor Cyan
Write-Host "   - Name it: ombalaji-infra-website" -ForegroundColor Cyan
Write-Host "   - Don't initialize with README" -ForegroundColor Cyan
Write-Host "   - Click 'Create repository'" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Connect to GitHub (replace YOUR_USERNAME):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/ombalaji-infra-website.git" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Deploy on Vercel:" -ForegroundColor White
Write-Host "   - Go to: https://vercel.com/new" -ForegroundColor Cyan
Write-Host "   - Import your GitHub repository" -ForegroundColor Cyan
Write-Host "   - Click Deploy" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

