const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const constants = require("./constants");
const { icons } = require("./map-svg-content-to-icon");
const paths = require("./paths.js");
const { prefixName, capitalizeFirstLetter } = require('./utils.js');

function createTypesSrcFile() {
    const iconDefinitions = [];
    for (let key in icons) {
        const iconName = prefixName(key);
        const iconDefinition = generateIconDefinitionExport(iconName);
        iconDefinitions.push(iconDefinition);
        console.log(`${chalk.inverse.green(" DONE ")} Genereated ${iconName}'s definition export`);
    }
    const iconDefinitionExports = iconDefinitions.join('\n');
    const fileLines = generateFileLines(iconDefinitionExports, Object.keys(icons));
    createFile(fileLines);
}

function generateIconDefinitionExport(iconName) {
    return `export { ${iconName} } from './icons';`;
}

function generateFileLines(iconDefinitionExports, iconKeys) {
    return `\
${constants.HEADER}
${iconDefinitionExports}
export const allNames = [${iconKeys.map(key => `"${key}"`).join(',\n')}];
`
}

function createFile(fileLines) {
    const fileName = 'index.ts';

    try {
        const filePath = path.join(paths.SRC_PATH, fileName);
        fs.writeFileSync(filePath, fileLines);
        console.log(`${chalk.inverse.green(" DONE ")} ${fileName} (exports file) created.`);
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

module.exports = { createTypesSrcFile }