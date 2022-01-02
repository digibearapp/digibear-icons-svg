import chalk from "chalk";
import fs from "fs";
import path from "path";
import * as constants from "./constants.js";
import { icons } from "./map-svg-content-to-icon";
import * as paths from "./paths.js";
import { prefixName } from "./utils.js";

export function createAllIconsMapFile() {
  const iconDefinitions = [];
  for (let key in icons) {
    const iconName = prefixName(key);
    const iconDefinition = generateIconImport(iconName);
    iconDefinitions.push(iconDefinition);
    console.log(
      `${chalk.inverse.green(
        " DONE "
      )} Genereated ${iconName}'s definition export`
    );
  }
  const iconImports = iconDefinitions.join("\n");
  const fileLines = generateFileLines(iconImports, Object.keys(icons));
  createFile(fileLines);
}

function generateIconImport(iconName) {
  return `import { ${iconName} } from './icons';`;
}

function generateFileLines(iconImports, iconKeys) {
  return `\
${constants.HEADER}
${iconImports}
export const allIconsMap: [s] = {${iconKeys
    .map((key) => `"{${key}" : ${prefixName(key)}}`)
    .join(",\n")}};
`;
}

function createFile(fileLines) {
  const fileName = "index.ts";

  try {
    const filePath = path.join(paths.SRC_PATH, fileName);
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
