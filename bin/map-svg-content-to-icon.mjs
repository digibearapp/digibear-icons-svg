import chalk from "chalk";
import fs from "fs";
import path from "path";
import * as paths from "./paths.mjs";
import { toCamelCase, extractSVGPaths } from "./utils.mjs";

export const icons = {};

export function populateIcons(style) {
  console.log(`Started mapping SVG paths for the style : ${style}.`);
  readStyleDir(style);
  console.log(
    `${chalk.inverse.green(
      " DONE "
    )} Mapped SVG paths for the style : ${style}.`
  );
}

function readStyleDir(style) {
  const svgFiles = fs.readdirSync(path.join(paths.ASSETS_PATH, style));
  svgFiles.forEach((svgFile) => {
    let svgFullFileName = svgFile.split(".svg")[0].split("-");
    let iconName = svgFullFileName
      .slice(0, svgFullFileName.length - 1)
      .join("-");
    iconName = toCamelCase(iconName);

    const filepath = path.join(paths.ASSETS_PATH, style, svgFile);
    console.log(`Extracting SVG paths from ${svgFile}.`);
    let svgPathData = extractSvgPathData(filepath);
    console.log(chalk.green(`Extracted SVG from ${svgFile}.`));
    if (undefined === icons[iconName]) {
      icons[iconName] = {};
    }
    icons[iconName][style] = svgPathData;
    console.log(
      `${chalk.inverse.green(" DONE ")} Mapped SVG paths to ${iconName}.`
    );
  });
}

function extractSvgPathData(path) {
  return extractSVGPaths(path);
}
