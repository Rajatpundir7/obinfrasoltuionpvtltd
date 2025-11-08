@echo off
echo ====================================
echo Pushing Fix to GitHub
echo ====================================
echo.

git add vercel.json package.json
git commit -m "Fix 404 error - Update Vercel routing"
git push

echo.
echo ====================================
echo Fix Pushed!
echo ====================================
echo.
echo Vercel will automatically redeploy.
echo Wait 1-2 minutes and check your site!
echo.
pause

