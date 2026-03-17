/**
 * fetch-letterboxd.mjs — Fetches recent diary entries from Letterboxd RSS
 * and writes data/letterboxd.json.
 *
 * Called by the GitHub Actions workflow.
 * No API key needed — Letterboxd RSS is public.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'data', 'letterboxd.json');

const LETTERBOXD_USER = process.env.LETTERBOXD_USER || 'ckaiko';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const LIMIT = 4;
const POSTER_DIR = join(__dirname, '..', 'data', 'posters');

/** Download an image and save it locally, return the local relative path */
async function downloadPoster(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(POSTER_DIR, { recursive: true });
    const outPath = join(POSTER_DIR, filename);
    writeFileSync(outPath, buf);
    return `data/posters/${filename}`;
  } catch { return null; }
}

(async () => {
  try {
    console.log(`Fetching Letterboxd RSS for user: ${LETTERBOXD_USER}...`);
    const feedUrl = `https://letterboxd.com/${LETTERBOXD_USER}/rss/`;
    const res = await fetch(feedUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();

    /* Parse XML with regex (Node doesn't have DOMParser, keeping it dependency-free) */
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
    const films = [];

    for (const match of items) {
      if (films.length >= LIMIT) break;
      const block = match[1];

      const titleRaw = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() || '';
      const link = block.match(/<link\s*\/?>([^<]*)/)?.[1]?.trim()
                || block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() || '';
      const desc = block.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';

      /* Extract poster URL from <description> HTML (CDATA) — Letterboxd CDN */
      const posterMatch = desc.match(/src="([^"]+)"/);
      const remotePoster = posterMatch ? posterMatch[1] : '';

      /* Letterboxd RSS title format: "Film Title, Year - ★★★★" */
      const titleMatch = titleRaw.match(/^(.+?),\s*(\d{4})\s*-?\s*(.*)$/);
      const title = titleMatch ? titleMatch[1].trim() : titleRaw;
      const year = titleMatch ? titleMatch[2] : '';
      const rating = titleMatch && titleMatch[3] ? titleMatch[3].trim() : '';

      /* Download poster locally so it's served from the repo (no hotlink issues) */
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      const localPoster = remotePoster
        ? await downloadPoster(remotePoster, `${slug}.jpg`)
        : null;

      films.push({ title, year, poster: localPoster || '', rating, link });
    }

    const output = {
      updatedAt: new Date().toISOString(),
      user: LETTERBOXD_USER,
      films,
    };

    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
    console.log(`Written ${films.length} films to ${OUT_PATH}`);
    films.forEach(f => console.log(`  - ${f.title} (${f.year}) ${f.rating}`));
  } catch (err) {
    console.error('Failed:', err.message);
    process.exit(1);
  }
})();
