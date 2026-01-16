@echo off
echo ========================================
echo Orders Dashboard - Setup Script
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo Step 2: Checking environment variables...
if not exist .env.local (
    echo WARNING: .env.local not found!
    echo Please create .env.local file with your configuration.
    echo See .env.local.example for reference.
    echo.
    pause
    exit /b 1
)
echo Environment file found.
echo.

echo ========================================
echo Setup complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open http://localhost:3000 in your browser.
echo.
pause
