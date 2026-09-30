/**
 * regenerate-icons.js — rasterizes the new soft-constellation logo SVG
 * into every PWA/legacy icon format the platform ships.
 *
 *   regular   : rounded-square canvas (transparent corners)
 *   maskable  : full-bleed square bg + content scaled 0.78 (Android safe zone)
 *   apple     : full-bleed square bg + content scaled 0.88 (iOS rounds itself)
 *
 * Run: bun scripts/regenerate-icons.js
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "public", "logo.svg");
const OUT = path.join(ROOT, "public", "icons");

const svg = fs.readFileSync(SRC, "utf8");
const MARKER = "<!-- faint background mesh -->";

function makeVariant({ rx = 120, scale = 1 }) {
  let s = svg.split('rx="120"').join(`rx="${rx}"`);
  if (scale !== 1) {
    const i = s.indexOf(MARKER);
    if (i < 0) throw new Error("marker not found in logo.svg");
    const head = s.slice(0, i);
    let rest = s.slice(i).replace(/<\/svg>\s*$/, "");
    s =
      head +
      `<g transform="translate(256,256) scale(${scale}) translate(-256,-256)">\n` +
      rest +
      "\n</g>\n</svg>";
  }
  return s;
}

async function render(svgStr, size, file) {
  const out = path.join(OUT, file);
  await sharp(Buffer.from(svgStr), { density: 300 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  console.log(`✓ ${file} (${size}×${size})`);
}

(async () => {
  const regular = makeVariant({ rx: 120, scale: 1 });
  await render(regular, 96, "icon-96.png");
  await render(regular, 192, "icon-192.png");
  await render(regular, 512, "icon-512.png");

  const maskable = makeVariant({ rx: 0, scale: 0.78 });
  await render(maskable, 192, "maskable-192.png");
  await render(maskable, 512, "maskable-512.png");

  const apple = makeVariant({ rx: 0, scale: 0.88 });
  await render(apple, 180, "apple-touch-icon.png");

  console.log("done — all icons regenerated from the soft-constellation design");
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
