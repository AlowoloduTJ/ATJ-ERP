# Fix Prisma Build Error

## Problem
Vercel build fails with:
```
./prisma/seed.ts:208:9
Type error: Type 'number' is not assignable to type 'string'.
correctAnswer: 0, // First option is correct
```

## Solution Applied

### 1. Excluded Prisma from TypeScript Compilation
Updated `tsconfig.json` to exclude the `prisma` folder:
```json
"exclude": [
  "node_modules",
  "prisma"
]
```

### 2. Added Prisma to .gitignore
Added `/prisma/` to `.gitignore` to prevent future commits.

## If Error Persists

If the build still fails, the `prisma/seed.ts` file exists in the repository. Fix it by:

### Option 1: Delete the File (Recommended)
Since this project uses Supabase, not Prisma:

```bash
# Delete the prisma folder
git rm -r prisma/
git commit -m "chore: remove prisma folder (using Supabase)"
git push
```

### Option 2: Fix the Type Error
If you need to keep the file, change line 208 in `prisma/seed.ts`:

**Before:**
```typescript
correctAnswer: 0, // First option is correct
```

**After:**
```typescript
correctAnswer: "0", // First option is correct (string)
```

Or check your Prisma schema - if `correctAnswer` should be a number, update the schema instead.

## Verification

After applying fixes:
1. Commit the changes
2. Push to trigger a new Vercel build
3. Check build logs to confirm the error is resolved

## Note

This project uses **Supabase** for the database, not Prisma. The Prisma folder should not exist in this project.
