#!/usr/bin/env node
/**
 * Downloads remote images referenced by app data so static hosting serves them locally.
 * Run automatically before `astro build` (see package.json).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const eventsPath = join(root, "src/data/events.ts");
const outDir = join(root, "public/images/external/youtube");

const YOUTUBE_THUMB = (id) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function collectYoutubeIdsFromEventsSource(source) {
  const ids = new Set();
  const watchRe = /watch\?v=([A-Za-z0-9_-]{6,})/g;
  let m;
  while ((m = watchRe.exec(source)) !== null) ids.add(m[1]);
  const shortRe = /youtu\.be\/([A-Za-z0-9_-]{6,})/g;
  while ((m = shortRe.exec(source)) !== null) ids.add(m[1]);
  return [...ids];
}

async function fetchThumbnail(id) {
  const url = YOUTUBE_THUMB(id);
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; JerekoStaticAssetFetcher/1.0; +https://jereko.dev)",
      accept: "image/jpeg,image/*;q=0.8,*/*;q=0.5",
    },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) {
    throw new Error(`GET ${url} -> suspiciously small body (${buf.length} bytes)`);
  }
  return buf;
}

async function main() {
  const source = await readFile(eventsPath, "utf8");
  const ids = collectYoutubeIdsFromEventsSource(source);
  if (ids.length === 0) {
    console.warn(
      "[fetch-external-images] No YouTube URLs found in src/data/events.ts",
    );
    return;
  }

  await mkdir(outDir, { recursive: true });

  for (const id of ids) {
    const dest = join(outDir, `${id}.jpg`);
    process.stdout.write(`[fetch-external-images] ${id}.jpg … `);
    try {
      const body = await fetchThumbnail(id);
      await writeFile(dest, body);
      console.log(`${(body.length / 1024).toFixed(1)} KiB`);
    } catch (e) {
      console.log("FAILED");
      console.error(e);
      process.exitCode = 1;
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
