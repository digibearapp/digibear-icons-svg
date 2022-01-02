import chalk from "chalk";
import * as paths from "./paths.js";
import fs from "fs";
import path from "path";
import { deleteDir, makeDir } from "./clean-up.js";
import { downloadDbIconsRelease } from "./download-latest-release.js";
import { createIconFiles } from "./create-icon-files.js";
import { populateIcons } from "./map-svg-content-to-icon.js";
import { createTypesFile } from "./create-index-file.js";
import { createTypesSrcFile } from "./create-index-file-src.js";

console.log(`${chalk.inverse.white(" JS ")} generate-type-files.js started.`);
deleteDir(paths.TEMP_PATH);
deleteDir(paths.ICONS_PATH);
makeDir(paths.ICONS_PATH);

downloadDbIconsRelease().then(
  (msg) => {
    let styleDirs = fs.readdirSync(paths.ASSETS_PATH, "utf-8");
    styleDirs = styleDirs.filter((dir) => !/(^|\/)\.[^\/\.]/g.test(dir));

    console.log(msg);
    styleDirs.forEach((style) => {
      if (!fs.lstatSync(path.join(paths.ASSETS_PATH, style)).isDirectory())
        return;
      populateIcons(style);
    });
    createIconFiles(styleDirs);
    createTypesFile();
    createTypesSrcFile();
    deleteDir(paths.TEMP_PATH);
    console.log(
      `${chalk.inverse.green(" JS ")} generate-files.js ended successfully.`
    );
  },
  (error) => {
    console.log(`${chalk.inverse.red(" JS ")} generate-files.js failed.`);
    console.group();
    console.error(error);
    console.groupEnd();
  }
);
