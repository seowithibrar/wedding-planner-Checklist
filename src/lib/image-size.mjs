// Reads the real pixel size of images in /public at build time, so every <img>
// can carry width and height. This stops layout shift (CLS) while images load.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { visit } from 'unist-util-visit';

const PUBLIC_DIR = join(process.cwd(), 'public');
const cache = new Map();

/** Returns { width, height } for a local /public image, or null if it can't be read. */
export async function getImageSize(src) {
  if (!src || typeof src !== 'string' || !src.startsWith('/') || src.startsWith('//')) return null;
  const clean = decodeURIComponent(src.split('?')[0].split('#')[0]);
  if (cache.has(clean)) return cache.get(clean);
  let size = null;
  try {
    const file = join(PUBLIC_DIR, clean);
    if (existsSync(file)) {
      const meta = await sharp(readFileSync(file)).metadata();
      if (meta.width && meta.height) size = { width: meta.width, height: meta.height };
    }
  } catch {
    size = null;
  }
  cache.set(clean, size);
  return size;
}

/** Rehype plugin: adds width, height and lazy loading to <img> elements in MDX content. */
export function rehypeImageSize() {
  return async (tree) => {
    const images = [];
    visit(tree, (node) => {
      if (node.type === 'element' && node.tagName === 'img') images.push(node);
      // Raw JSX <img> tags inside MDX
      if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'img') images.push(node);
    });
    await Promise.all(images.map(async (node) => {
      if (node.type === 'element') {
        const p = node.properties || (node.properties = {});
        if (p.width && p.height) return;
        const size = await getImageSize(p.src);
        if (!size) return;
        p.width = size.width;
        p.height = size.height;
        if (!p.loading) p.loading = 'lazy';
        if (!p.decoding) p.decoding = 'async';
      } else {
        const attrs = node.attributes || [];
        const get = (n) => attrs.find((a) => a.type === 'mdxJsxAttribute' && a.name === n);
        if (get('width') && get('height')) return;
        const srcAttr = get('src');
        const size = await getImageSize(typeof srcAttr?.value === 'string' ? srcAttr.value : null);
        if (!size) return;
        attrs.push({ type: 'mdxJsxAttribute', name: 'width', value: String(size.width) });
        attrs.push({ type: 'mdxJsxAttribute', name: 'height', value: String(size.height) });
      }
    }));
  };
}
