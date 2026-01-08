#!/usr/bin/env node
/**
 * Remove Prisma folder before build
 * This project uses Supabase, not Prisma
 */

const fs = require('fs');
const path = require('path');

function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return; // Directory doesn't exist, nothing to do
  }

  try {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
    console.log(`Removed Prisma directory: ${dirPath}`);
  } catch (error) {
    // Ignore errors - file might be locked or already deleted
    console.warn(`Warning: Could not remove ${dirPath}:`, error.message);
  }
}

// Remove prisma folder if it exists
const prismaPath = path.join(process.cwd(), 'prisma');
removeDir(prismaPath);
