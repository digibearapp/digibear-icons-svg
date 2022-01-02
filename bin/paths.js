import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TEMP_PATH = path.join(__dirname, "../temp");
export const ASSETS_PATH = path.join(__dirname, "../temp/digibear-icons/svg");
export const TYPES_PATH = path.join(__dirname, "../index.d.ts");
export const ICONS_PATH = path.join(__dirname, "../src/icons");
export const SRC_PATH = path.join(__dirname, "../src");
