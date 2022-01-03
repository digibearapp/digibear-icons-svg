import chalk from "chalk";
import fs from "fs";
import path from "path";
import * as constants from "./constants.mjs";
import { icons } from "./map-svg-content-to-icon.mjs";
import * as paths from "./paths.mjs";
import { prefixName } from "./utils.mjs";

export function createIconFiles(styles) {
  console.log(`Extracting icons from Digibear.`);
  createIconFilesForStyle(styles);
  console.log(`${chalk.inverse.green(" DONE ")} Created icon files.`);
}

function createIconFilesForStyle(styles) {
  for (let key in icons) {
    const icon = icons[key];
    const iconName = prefixName(key);
    // console.log(icon);
    const svgPathData = generateSvgPathData(icon, styles);
    const fileLines = generateFileLines(key, iconName, svgPathData);
    createFile(iconName, fileLines);
    console.log(`${chalk.inverse.green(" DONE ")} Created ${iconName}.ts.`);
  }
}

function generateSvgPathData(icon, styles) {
  let svgPathData = "";
  styles.forEach((style) => {
    svgPathData += `${style}: ${icon[style]},`;
  });
  return `{${svgPathData}}`;
}

function generateFileLines(rawIconName, iconName, svgPathData) {
  return `\
${constants.HEADER}
import { DbIconDefinition } from "@digibearapp/digibear-common-types";

const ${iconName} : DbIconDefinition = {
    iconName: "${rawIconName}",
    svgPathData: ${svgPathData}
}

export default ${iconName};
`;
}

function createFile(iconName, fileLines) {
  const fileName = `${iconName}.ts`;

  try {
    const filePath = path.join(paths.ICONS_PATH, fileName);
    fs.writeFileSync(filePath, fileLines);
    console.log(`${chalk.inverse.green(" DONE ")} ${fileName} created.`);
  } catch (err) {
    console.error(
      `${chalk.inverse.red(" FAIL ")} Failed to create ${fileName} file.`
    );
    console.group();
    console.error(err);
    console.groupEnd();
    return;
  }
}
