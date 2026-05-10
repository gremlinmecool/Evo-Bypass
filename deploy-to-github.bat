@echo off
echo ========================================
echo   EVO BYPASS - GitHub Deployment
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing git repository...
    git init
    echo.
)

REM Add all files
echo Adding files to git...
git add .
echo.

REM Commit
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update EVO BYPASS platform

echo Committing changes...
git commit -m "%commit_message%"
echo.

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ========================================
    echo   GitHub Repository Setup
    echo ========================================
    echo.
    echo Please enter your GitHub repository URL
    echo Example: https://github.com/YOUR_USERNAME/evo-bypass.git
    echo.
    set /p repo_url="Repository URL: "
    
    echo Adding remote origin...
    git remote add origin !repo_url!
    echo.
)

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main
echo.

if errorlevel 1 (
    echo.
    echo ========================================
    echo   ERROR: Push Failed
    echo ========================================
    echo.
    echo Possible solutions:
    echo 1. Make sure you created the repository on GitHub
    echo 2. Check your GitHub credentials
    echo 3. Try: git pull origin main --rebase
    echo 4. Then run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Code pushed to GitHub
echo ========================================
echo.
echo Next steps:
echo 1. Go to https://render.com
echo 2. Sign in with GitHub
echo 3. Click "New +" - "Web Service"
echo 4. Select your repository
echo 5. Follow RENDER_GITHUB_DEPLOY.md guide
echo.
echo Your code is now on GitHub! 🎉
echo.
pause
