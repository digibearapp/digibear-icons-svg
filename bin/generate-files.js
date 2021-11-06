const chalk = require("chalk");
const paths = require("./paths.js");
const fs = require("fs");
const path = require("path");
const { deleteDir, makeDir } = require("./clean-up.js");
const { downloadDbIconsRelease } = require("./download-latest-release.js");
const { createIconFiles } = require("./create-icon-files.js");
const { populateIcons } = require("./map-svg-content-to-icon.js");
const { createTypesFile } = require("./create-index-file.js");
const { createTypesSrcFile } = require("./create-index-file-src.js");

console.log(`${chalk.inverse.white(" JS ")} generate-type-files.js started.`);
deleteDir(paths.TEMP_PATH);
deleteDir(paths.ICONS_PATH);
makeDir(paths.ICONS_PATH);

downloadDbIconsRelease().then((msg) => {
    let styleDirs = fs.readdirSync(paths.ASSETS_PATH, "utf-8");
    styleDirs = styleDirs.filter(dir => !(/(^|\/)\.[^\/\.]/g).test(dir));

    console.log(msg);
    styleDirs.forEach((style) => {
        if (!fs.lstatSync(path.join(paths.ASSETS_PATH, style)).isDirectory()) return;
        populateIcons(style);
    });
    createIconFiles(styleDirs);
    createTypesFile();
    createTypesSrcFile();
    deleteDir(paths.TEMP_PATH);
    console.log(`${chalk.inverse.green(" JS ")} generate-files.js ended successfully.`);
},
    (error) => {
        console.log(`${chalk.inverse.red(" JS ")} generate-files.js failed.`);
        console.group();
        console.error(error);
        console.groupEnd();
    });