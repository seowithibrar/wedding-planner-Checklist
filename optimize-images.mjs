import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_MAX_BYTES = 148 * 1024; // 148 KB safe threshold (guarantees <= 150 KB)
const IGNORE_DIRS = new Set(['.git', 'node_modules', 'dist', '.astro', '.vercel', '__pycache__', '.agents']);
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
const CONCURRENCY = 6;

function findImages(dir) {
  const images = [];
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name)) {
          walk(path.join(currentDir, entry.name));
        }
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (IMAGE_EXTS.has(ext)) {
          const fullPath = path.join(currentDir, entry.name);
          const size = fs.statSync(fullPath).size;
          images.push({ path: fullPath, size, ext, name: entry.name });
        }
      }
    }
  }
  walk(dir);
  return images;
}

async function compressJpeg(inputBuffer) {
  const meta = await sharp(inputBuffer).metadata();
  const maxDim = Math.max(meta.width || 0, meta.height || 0);

  let pipeline = sharp(inputBuffer);
  if (maxDim > 1200) {
    pipeline = pipeline.resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true });
  }

  for (const q of [82, 78, 74, 70]) {
    const buf = await pipeline.clone().jpeg({ quality: q, mozjpeg: true, progressive: true }).toBuffer();
    if (buf.length <= TARGET_MAX_BYTES) {
      return buf;
    }
  }

  for (const dim of [950, 850, 750]) {
    for (const q of [78, 74, 70]) {
      const buf = await sharp(inputBuffer)
        .resize({ width: dim, height: dim, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: q, mozjpeg: true, progressive: true })
        .toBuffer();
      if (buf.length <= TARGET_MAX_BYTES) {
        return buf;
      }
    }
  }

  return await sharp(inputBuffer)
    .resize({ width: 650, height: 650, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 65, mozjpeg: true, progressive: true })
    .toBuffer();
}

async function compressWebp(inputBuffer) {
  const meta = await sharp(inputBuffer).metadata();
  const maxDim = Math.max(meta.width || 0, meta.height || 0);

  let pipeline = sharp(inputBuffer);
  if (maxDim > 1400) {
    pipeline = pipeline.resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true });
  }

  for (const q of [82, 78, 74, 70]) {
    const buf = await pipeline.clone().webp({ quality: q, effort: 4 }).toBuffer();
    if (buf.length <= TARGET_MAX_BYTES) {
      return buf;
    }
  }

  for (const dim of [1000, 850, 750]) {
    for (const q of [78, 74, 70]) {
      const buf = await sharp(inputBuffer)
        .resize({ width: dim, height: dim, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: q, effort: 4 })
        .toBuffer();
      if (buf.length <= TARGET_MAX_BYTES) {
        return buf;
      }
    }
  }

  return await sharp(inputBuffer)
    .resize({ width: 650, height: 650, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 65, effort: 4 })
    .toBuffer();
}

async function compressPng(inputBuffer, fileName) {
  const meta = await sharp(inputBuffer).metadata();

  if (fileName.toLowerCase().includes('favicon')) {
    return await sharp(inputBuffer)
      .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
      .png({ palette: true, quality: 85, effort: 8 })
      .toBuffer();
  }

  if (meta.hasAlpha) {
    for (const q of [90, 80, 70]) {
      const buf = await sharp(inputBuffer).png({ palette: true, quality: q, effort: 8 }).toBuffer();
      if (buf.length <= TARGET_MAX_BYTES) {
        return buf;
      }
    }
    for (const dim of [800, 650]) {
      const buf = await sharp(inputBuffer)
        .resize({ width: dim, height: dim, fit: 'inside', withoutEnlargement: true })
        .png({ palette: true, quality: 75, effort: 8 })
        .toBuffer();
      if (buf.length <= TARGET_MAX_BYTES) {
        return buf;
      }
    }
  } else {
    for (const dim of [900, 800, 700, 600]) {
      for (const q of [80, 75]) {
        const buf = await sharp(inputBuffer)
          .resize({ width: dim, height: dim, fit: 'inside', withoutEnlargement: true })
          .png({ palette: true, quality: q, effort: 8 })
          .toBuffer();
        if (buf.length <= TARGET_MAX_BYTES) {
          return buf;
        }
      }
      for (const colors of [192, 128]) {
        const buf = await sharp(inputBuffer)
          .resize({ width: dim, height: dim, fit: 'inside', withoutEnlargement: true })
          .png({ palette: true, colors, effort: 8 })
          .toBuffer();
        if (buf.length <= TARGET_MAX_BYTES) {
          return buf;
        }
      }
    }
  }

  return await sharp(inputBuffer)
    .resize({ width: 550, height: 550, fit: 'inside', withoutEnlargement: true })
    .png({ palette: true, colors: 128, effort: 8 })
    .toBuffer();
}

async function processImage(img, index, total) {
  const inputBuffer = fs.readFileSync(img.path);
  let newBuffer = null;

  if (img.ext === '.jpg' || img.ext === '.jpeg') {
    newBuffer = await compressJpeg(inputBuffer);
  } else if (img.ext === '.webp') {
    newBuffer = await compressWebp(inputBuffer);
  } else if (img.ext === '.png') {
    newBuffer = await compressPng(inputBuffer, img.name);
  } else {
    return { skipped: true, reason: 'unsupported format' };
  }

  const originalKb = (img.size / 1024).toFixed(1);
  const newKb = (newBuffer.length / 1024).toFixed(1);
  const savingsPercent = (((img.size - newBuffer.length) / img.size) * 100).toFixed(1);

  if (newBuffer.length > 150 * 1024) {
    console.warn(`[${index + 1}/${total}] WARNING: ${img.path} is ${newKb} KB (exceeds 150KB)`);
  }

  // Write directly using buffer (avoids file locks)
  fs.writeFileSync(img.path, newBuffer);

  console.log(`[${index + 1}/${total}] ${img.path}: ${originalKb} KB -> ${newKb} KB (-${savingsPercent}%)`);
  return {
    path: img.path,
    origSize: img.size,
    newSize: newBuffer.length,
    savings: img.size - newBuffer.length
  };
}

async function run() {
  console.log('--- Scanning images ---');
  const allImages = findImages('.');
  const toOptimize = allImages.filter(img => img.size > TARGET_MAX_BYTES);

  console.log(`Total images found: ${allImages.length}`);
  console.log(`Images requiring reduction (> 148 KB): ${toOptimize.length}\n`);

  if (toOptimize.length === 0) {
    console.log('All images are already under 150 KB! Nothing to do.');
    return;
  }

  const results = [];
  let index = 0;

  // Process with concurrency pool
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (index < toOptimize.length) {
      const currentIndex = index++;
      const img = toOptimize[currentIndex];
      try {
        const res = await processImage(img, currentIndex, toOptimize.length);
        results.push(res);
      } catch (err) {
        console.error(`Error processing ${img.path}:`, err.message);
      }
    }
  });

  await Promise.all(workers);

  // Summary
  const totalOrigBytes = results.reduce((acc, r) => acc + (r.origSize || 0), 0);
  const totalNewBytes = results.reduce((acc, r) => acc + (r.newSize || 0), 0);
  const savedBytes = totalOrigBytes - totalNewBytes;

  console.log('\n================ OPTIMIZATION SUMMARY ================');
  console.log(`Total images optimized: ${results.length}`);
  console.log(`Original total size: ${(totalOrigBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New total size:      ${(totalNewBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total saved:         ${(savedBytes / (1024 * 1024)).toFixed(2)} MB (${((savedBytes / totalOrigBytes) * 100).toFixed(1)}% reduction)`);

  // Final verification check
  console.log('\n--- Final Verification: Checking ALL images in repository ---');
  const finalCheck = findImages('.');
  const stillOver = finalCheck.filter(img => img.size > 150 * 1024);
  console.log(`Total images in repo: ${finalCheck.length}`);
  console.log(`Images > 150 KB: ${stillOver.length}`);

  if (stillOver.length === 0) {
    const largest = finalCheck.reduce((max, img) => img.size > max.size ? img : max, finalCheck[0]);
    console.log(`\n🎉 SUCCESS! ALL IMAGES ARE MAXIMUM 150 KB.`);
    console.log(`Largest image in repo is now: ${largest.path} (${(largest.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`\nFAILURE: ${stillOver.length} images still exceed 150 KB:`);
    stillOver.forEach(img => console.log(`  - ${img.path}: ${(img.size / 1024).toFixed(1)} KB`));
  }
}

run().catch(console.error);
