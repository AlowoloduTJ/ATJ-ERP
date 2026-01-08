@echo off
REM Supabase Setup Script for Windows
REM This script helps set up Supabase for the ATJ-ERP project

echo ========================================
echo ATJ-ERP Supabase Setup
echo ========================================
echo.

REM Check if Supabase CLI is installed
where supabase >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Supabase CLI is not installed.
    echo.
    echo Please install it first:
    echo   npm install -g supabase
    echo.
    echo Or visit: https://supabase.com/docs/guides/cli/getting-started
    pause
    exit /b 1
)

echo [OK] Supabase CLI is installed
echo.

REM Check if already initialized
if exist "supabase\config.toml" (
    echo [INFO] Supabase is already initialized
    echo.
) else (
    echo [STEP] Initializing Supabase...
    supabase init
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to initialize Supabase
        pause
        exit /b 1
    )
    echo [OK] Supabase initialized
    echo.
)

REM Check schema files
if exist "supabase\schemas\00_extensions.sql" (
    echo [OK] Schema files found
    echo.
) else (
    echo [WARNING] Schema files not found in supabase\schemas\
    echo.
)

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Review schema files in supabase\schemas\
echo   2. Start local Supabase: supabase start
echo   3. Generate migration: supabase db diff -f initial_schema
echo   4. Apply migration: supabase db migrate up
echo.
echo For detailed instructions, see COMPLETE_WORKFLOW.md
echo.
pause
