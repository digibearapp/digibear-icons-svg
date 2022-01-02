import chalk from "chalk";
import fs from "fs";
import path from "path";
import * as constants from "./constants.js";
import { icons } from "./map-svg-content-to-icon.js";
import * as paths from "./paths.js";
import { prefixName } from "./utils.js";

export function createTypesFile() {
  const iconDefinitions = [];
  for (let key in icons) {
    const iconName = prefixName(key);
    const iconDefinition = generateIconDefinitionExport(iconName);
    iconDefinitions.push(iconDefinition);
    console.log(
      `${chalk.inverse.green(
        " DONE "
      )} Genereated ${iconName}'s definition export`
    );
  }
  const iconDefinitionExports = iconDefinitions.join("\n");
  const fileLines = generateFileLines(iconDefinitionExports);
  createFile(fileLines);
}

function generateIconDefinitionExport(iconName) {
  return `export { default as ${iconName} } from './${iconName}';`;
}

function generateFileLines(iconDefinitionExports) {
  return `\
${constants.HEADER}
${iconDefinitionExports}
`;
}

function createFile(fileLines) {
  const fileName = "index.ts";

  try {
    const filePath = path.join(paths.ICONS_PATH, fileName);
    fs.writeFileSync(filePath, fileLines);
    console.log(
      `${chalk.inverse.green(" DONE ")} ${fileName} (exports file) created.`
    );
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
