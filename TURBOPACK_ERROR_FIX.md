# Turbopack Runtime Error Fix

## 🐛 Error

```
Cannot find module '../chunks/ssr/[turbopack]_runtime.js'
```

## 🔍 Cause

This error occurs when:
- The `.next` build directory is corrupted
- Turbopack cache is out of sync
- Build artifacts are incomplete

## ✅ Solution

### Step 1: Stop Dev Server
```bash
# Press Ctrl+C in the terminal running the dev server
# Or kill all Node processes
taskkill /F /IM node.exe
```

### Step 2: Delete .next Directory
```bash
# Windows
rmdir /s /q .next

# Or manually delete the .next folder
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

## 🔄 Alternative: Disable Turbopack (If Issue Persists)

If the error continues, you can temporarily disable Turbopack:

**Update `package.json`:**
```json
{
  "scripts": {
    "dev": "next dev"  // Remove --turbo flag
  }
}
```

Then restart:
```bash
npm run dev
```

## 📋 Prevention

- Always stop the dev server properly (Ctrl+C) before closing terminal
- If you see build errors, clear `.next` directory first
- Keep Next.js and dependencies up to date

---

**Status:** Fixed by clearing `.next` directory and restarting dev server
