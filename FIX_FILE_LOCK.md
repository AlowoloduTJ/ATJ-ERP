# Fix File Lock Error (EBUSY)

## Problem
The `npm install` command is failing with:
```
EBUSY: resource busy or locked
```

This happens because a process (likely the dev server) has a lock on files in `node_modules`.

## Solution Steps

### Step 1: Stop All Node Processes

**Option A: Stop Dev Server in Terminal**
- Find the terminal where `npm run dev` is running
- Press `Ctrl+C` to stop it
- Wait 5-10 seconds for it to fully terminate

**Option B: Kill Node Processes via Task Manager**
1. Press `Ctrl+Shift+Esc` to open Task Manager
2. Go to "Details" tab
3. Find all `node.exe` processes
4. Right-click each one → "End Task"
5. Confirm if prompted

**Option C: Kill via Command Line**
```bash
taskkill /F /IM node.exe
```
⚠️ **Warning:** This will kill ALL Node.js processes on your system

### Step 2: Close File Handles

1. Close VS Code/Cursor if it has the project open
2. Close any file explorers with the project folder
3. Close any other editors/IDEs

### Step 3: Wait a Few Seconds

Give Windows time to release the file locks (5-10 seconds).

### Step 4: Try Installation Again

```bash
cd C:\VAKEM1\atj-erp
npm install @clerk/nextjs
```

### Step 5: If Still Failing

Try deleting `node_modules` and reinstalling everything:

```bash
# Remove node_modules
rmdir /s /q node_modules

# Remove package-lock.json (optional, but can help)
del package-lock.json

# Reinstall all packages
npm install
```

This will reinstall all dependencies, including `@clerk/nextjs`.

---

## Quick Check: Is Dev Server Running?

Run this to see if Node is running:
```bash
tasklist | findstr node
```

If you see `node.exe` processes, stop them first.

---

## After Successful Installation

Once `@clerk/nextjs` is installed:
1. Restart your dev server: `npm run dev`
2. The build error should be resolved
3. You can continue with the commit process
