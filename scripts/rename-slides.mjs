/**
 * rename-slides.mjs
 * Renames all images in public/slides/dayX/ to 1.png, 2.png, 3.png ...
 *
 * Usage:
 *   node scripts/rename-slides.mjs day1          ← rename day1 folder
 *   node scripts/rename-slides.mjs day2          ← rename day2 folder
 *   node scripts/rename-slides.mjs day1 --dry    ← preview without renaming
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ──────────────────────────────────────────────────────────────────

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"];

// Sort method: "name" (alphabetical) | "date" (file creation time)
const SORT_BY = "name";

// Output format: always saves as .png (change to false to keep original ext)
const FORCE_PNG_EXTENSION = false;

// ─── Args ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dayArg = args.find((a) => a.startsWith("day") || a.startsWith("Day"));
const isDryRun = args.includes("--dry") || args.includes("-d");

if (!dayArg) {
  console.error("❌  Please specify a day folder, e.g.: node scripts/rename-slides.mjs day1");
  process.exit(1);
}

const folderPath = path.resolve(__dirname, "..", "public", "slides", dayArg.toLowerCase());

if (!fs.existsSync(folderPath)) {
  console.error(`❌  Folder not found: ${folderPath}`);
  console.error(`    Create it first or check the day argument.`);
  process.exit(1);
}

// ─── Read & filter images ─────────────────────────────────────────────────────

const allFiles = fs.readdirSync(folderPath);
const imageFiles = allFiles.filter((f) =>
  IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase())
);

if (imageFiles.length === 0) {
  console.log(`⚠️  No image files found in ${folderPath}`);
  process.exit(0);
}

// ─── Sort ─────────────────────────────────────────────────────────────────────

const sorted = imageFiles.sort((a, b) => {
  if (SORT_BY === "date") {
    const statA = fs.statSync(path.join(folderPath, a));
    const statB = fs.statSync(path.join(folderPath, b));
    return statA.birthtimeMs - statB.birthtimeMs;
  }
  // "name" — natural sort so "slide10" comes after "slide9", not "slide1"
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
});

// ─── Preview ──────────────────────────────────────────────────────────────────

console.log(`\n📁  Folder : ${folderPath}`);
console.log(`📸  Images : ${sorted.length} files found`);
console.log(`🔃  Sort by: ${SORT_BY}`);
console.log(`${isDryRun ? "👁️   DRY RUN — no files will be changed" : "✏️   RENAMING files..."}\n`);

const pad = String(sorted.length).length; // e.g. 65 slides → pad to 2 digits

// ─── Rename ───────────────────────────────────────────────────────────────────

// Step 1: rename to temp names to avoid collisions (e.g. 1.png → 2.png → clash)
const tempNames = [];
if (!isDryRun) {
  sorted.forEach((file, i) => {
    const ext = FORCE_PNG_EXTENSION ? ".png" : path.extname(file).toLowerCase();
    const tmpName = `__tmp_${i + 1}${ext}`;
    fs.renameSync(path.join(folderPath, file), path.join(folderPath, tmpName));
    tempNames.push({ tmpName, finalIdx: i + 1, ext });
  });
}

// Step 2: rename temp names to final sequential names
let renamedCount = 0;
sorted.forEach((originalFile, i) => {
  const ext = FORCE_PNG_EXTENSION ? ".png" : path.extname(originalFile).toLowerCase();
  const newName = `${i + 1}${ext}`;

  const paddedNum = String(i + 1).padStart(pad, " ");
  console.log(`  [${paddedNum}]  ${originalFile.padEnd(40)}→  ${newName}`);

  if (!isDryRun) {
    const tmpName = `__tmp_${i + 1}${ext}`;
    fs.renameSync(path.join(folderPath, tmpName), path.join(folderPath, newName));
    renamedCount++;
  }
});

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log("\n" + "─".repeat(55));
if (isDryRun) {
  console.log(`✅  Dry run complete. ${sorted.length} files would be renamed.`);
  console.log(`    Run without --dry to apply changes.\n`);
} else {
  console.log(`✅  Done! ${renamedCount} files renamed in /${dayArg.toLowerCase()}/`);
  console.log(`\n💡  Update slide count in your viewer:`);
  console.log(`    SLIDES_PER_DAY = { ${dayArg.toLowerCase()}: ${renamedCount} }\n`);
}
