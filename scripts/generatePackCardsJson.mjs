import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import players from "../src/data/MM26PlayerDatabase.js";

const outputDir = path.resolve("public");
const outputPath = path.join(outputDir, "pack-cards.json");

const packCards = players
  .filter((player) => player?.id && player?.name && player?.rarity && player?.ovr && player?.image)
  .map((player) => ({
    id: player.id,
    name: player.name,
    position: player.position ?? null,
    team: player.team ?? null,
    program: player.program ?? null,
    rarity: player.rarity,
    ovr: Number(player.ovr),
    image: player.image ?? null,
    boost: Array.isArray(player.boost) ? player.boost.filter(Boolean).join(", ") : (player.boost ?? null),
  }));

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, `${JSON.stringify(packCards)}\n`);

console.log(`Wrote ${packCards.length} pack cards to ${outputPath}`);
