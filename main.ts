import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(repoRoot, "output");
const entryPath = join(outDir, "entry.txt");

const entry = [
  "To: the friend who stopped replying",
  "I still check if you've read my last message. It's been two years. I miss you and I don't know what I did.",
].join("\n");

// Gate: 1 to 260 characters, not only whitespace.
if (entry.length < 1 || entry.length > 260 || entry.trim().length === 0) {
  throw new Error(`entry length ${entry.length} is outside the 1-260 gate`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(entryPath, entry, "utf8");
// The grader collects /output as another user; the VM umask would leave
// the file at 0660, so force 0644 before exiting.
chmodSync(entryPath, 0o644);
