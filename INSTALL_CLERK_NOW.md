# ⚠️ Build Error Fix: Install @clerk/nextjs

## Error
```
Module not found: Can't resolve '@clerk/nextjs'
```

## Solution

The `@clerk/nextjs` package needs to be installed. The file lock error occurs because the dev server is running.

### Steps:

1. **Stop the dev server:**
   - Press `Ctrl+C` in the terminal where `npm run dev` is running
   - Wait for it to fully stop

2. **Install the package:**
   ```bash
   npm install @clerk/nextjs
   ```

3. **Restart the dev server:**
   ```bash
   npm run dev
   ```

### Alternative (if file lock persists):

If the file lock error continues:

1. Close all terminals/editors that might be accessing the project
2. Close any file explorers with the project folder open
3. Try installing again:
   ```bash
   npm install @clerk/nextjs
   ```

### Verification:

After installation, check `package.json` - you should see:
```json
"@clerk/nextjs": "^6.0.0"
```

The build error should be resolved after installation.

---

**Note:** I've already added `@clerk/nextjs` to `package.json`. You just need to run `npm install` after stopping the dev server.
