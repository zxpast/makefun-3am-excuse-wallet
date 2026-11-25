// The 3 AM Excuse — a hardware wallet refuses to sign at 3 AM.
//
// One fixed line, so the program is deterministic: same bytes every run,
// no clock, no randomness, no network, no external files.
//
// The joke: the wallet speaks as the device itself — its screen stays off,
// and it cites its own scar tissue: the last 3 AM signature cost the owner
// 2.4 ETH on a coin whose whitepaper was a single eggplant emoji. The hour
// is the joke (it could not be pasted onto 3 PM), the number has a payoff,
// and the twist lands on the last words.
//
// REVISION (this session): first draft said "last time I signed at this
// hour, you spent 2.4 ETH on a coin whose whitepaper was one eggplant
// emoji." Two wording changes: (1) "last time" -> "the last time" —
// smoother, reads like the device recalling a specific incident; (2)
// "whose whitepaper was" -> "whose entire whitepaper was" — "entire"
// sharpens the absurdity, the whole whitepaper is one emoji, so the
// punchline lands harder on the final words.
import * as fs from "node:fs";
import * as path from "node:path";

// Fixed parts of the excuse. Nothing here varies between runs.
const SETUP = "It's 3 AM. My screen stays off:";
const TURN = "the last time I signed at this hour, you spent 2.4 ETH on a coin";
const PUNCH = "whose entire whitepaper was one eggplant emoji.";
const LINE = `${SETUP} ${TURN} ${PUNCH}`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// counted as Unicode code points, and not only white space.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${codePoints} code points, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");

console.log(LINE);
console.log(`(${codePoints} code points, ${Buffer.byteLength(LINE, "utf8")} bytes)`);
