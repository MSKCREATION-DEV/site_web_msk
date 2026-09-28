import { existsSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Ignore exports 1×1 / vides (placeholders manuels invalidés).
 * Seuil : > 1 Ko.
 */
export function isUsableAsset(publicPath: string): boolean {
  const absolute = path.join(
    process.cwd(),
    "public",
    publicPath.replace(/^\//, ""),
  );
  if (!existsSync(absolute)) return false;
  try {
    return statSync(absolute).size > 1024;
  } catch {
    return false;
  }
}
