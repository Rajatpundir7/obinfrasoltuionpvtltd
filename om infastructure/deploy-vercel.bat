@echo off
echo ====================================
echo OMBALAJI Infra - Vercel Deployment
echo ====================================
echo.

echo Step 1: Checking if Vercel CLI is installed...
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
) else (
    echo Vercel CLI is installed.
)
echo.

echo Step 2: Logging in to Vercel...
vercel login
echo.

echo Step 3: Deploying to Vercel...
vercel
echo.

echo Step 4: Deploying to production...
vercel --prod
echo.

echo ====================================
echo Deployment Complete!
echo ====================================
echo.
echo Your website is now live on Vercel!
echo Check your Vercel dashboard for the URL.
echo.
pause

