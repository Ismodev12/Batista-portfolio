// Télécharge les photos (Unsplash, licence libre) dans public/assets/images/.
// Lancé automatiquement après `npm install`, ou à la main : `npm run images`.
// Un fichier déjà présent n'est jamais écrasé : vos propres images restent intactes.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets", "images");
const cdn = (photo) => `https://images.unsplash.com/${photo}?fm=jpg&q=80&w=1600&fit=crop`;

// [fichier local, adresse directe, page de la photo]
const images = [
  ["hero/batista-hero.jpg", "https://unsplash.com/photos/HA-0i0E7sq4/download?force=true&w=1920", "HA-0i0E7sq4"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(url) {
  let last;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (portfolio-setup)" }, signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!(res.headers.get("content-type") || "").startsWith("image/")) throw new Error("réponse non image");
      return Buffer.from(await res.arrayBuffer());
    } catch (e) { last = e; await sleep(1500 * attempt); }
  }
  throw last;
}

let failed = 0;
for (const [file, url, id] of images) {
  const target = join(root, file);
  if (existsSync(target)) { console.log(`= ${file} (déjà présent)`); continue; }
  try {
    const data = await download(url);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, data);
    console.log(`+ ${file}`);
  } catch (e) {
    failed++;
    console.warn(`! ${file} non téléchargé (${e.message}) — à enregistrer à la main depuis https://unsplash.com/photos/${id}`);
  }
}
console.log(failed ? `\n${failed} image(s) manquante(s) : relancez "npm run images".` : "\nToutes les images sont en place.");
