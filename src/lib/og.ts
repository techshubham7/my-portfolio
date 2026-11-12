import fs from "fs";
import path from "path";
import { DATA } from "@/data/resume";

export const OG_IMAGE_CANDIDATES = [
  "og.png",
  "og.jpg",
  "og.jpeg",
  "og.webp",
  "opengraph-image.png",
  "opengraph-image.jpg",
  "opengraph-image.jpeg",
];

export interface CustomOgFileInfo {
  filename: string;
  contentType: string;
  absolutePath: string;
}

export function getCustomOgFile(): CustomOgFileInfo | null {
  try {
    const publicDir = path.join(process.cwd(), "public");
    for (const filename of OG_IMAGE_CANDIDATES) {
      const filePath = path.join(publicDir, filename);
      if (fs.existsSync(filePath)) {
        const ext = path.extname(filename).toLowerCase();
        const contentType =
          ext === ".png"
            ? "image/png"
            : ext === ".webp"
            ? "image/webp"
            : "image/jpeg";
        return { filename, contentType, absolutePath: filePath };
      }
    }
  } catch {
    // Filesystem access may be restricted in some edge environments
  }
  return null;
}

export function getOgImageUrl(): string {
  const custom = getCustomOgFile();
  if (custom) {
    return `${DATA.url}/${custom.filename}`;
  }
  return `${DATA.url}/opengraph-image`;
}

