# Fix Turbopack Runtime Error

## 🐛 Error
```
Cannot find module '../chunks/ssr/[turbopack]_runtime.js'
```

## ✅ Solution

### Method 1: Manual Delete (Recommended)

1. **Stop the dev server completely:**
   - Press `Ctrl+C` in all terminal windows
   - Or close the terminal running `npm run dev`

2. **Delete the `.next` folder:**
   - Open File Explorer
   - Navigate to `C:\VAKEM1\atj-erp`
   - Delete the `.next` folder (if it exists)
   - If it says "in use", close all terminals and VS Code/Cursor, then try again

3. **Restart the dev server:**
   ```bash
   npm run dev
   ```

### Method 2: Disable Turbopack (If Issue Persists)

If clearing `.next` doesn't work, temporarily disable Turbopack:

1. **Edit `package.json`:**
   ```json
   {
     "scripts": {
       "dev": "next dev"  // Remove --turbo
     }
   }
   ```

2. **Restart:**
   ```bash
   npm run dev
   ```

### Method 3: Full Clean (Nuclear Option)

If nothing else works:

1. **Stop all Node processes**
2. **Delete these folders:**
   - `.next`
   - `node_modules`
3. **Reinstall:**
   ```bash
   npm install
   npm run dev
   ```

---

## 🔍 Why This Happens

- Turbopack cache gets corrupted
- Build artifacts are incomplete
- File locks from previous dev server instance

---

## ✅ Expected Result

After clearing `.next` and restarting:
- Dev server starts fresh
- Turbopack rebuilds cache
- Error should be resolved

---

**Try Method 1 first - it usually fixes the issue!**
