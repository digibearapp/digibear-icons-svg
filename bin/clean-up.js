const fs = require("fs");
const path = require("path");
const paths = require("./paths.js");
const chalk = require("chalk");
const { icons } = require("./map-svg-content-to-icon.js");
const { prefixName } = require("./utils.js");

function deleteDir(dir) {
    console.log(`Removing ${dir}`);
    fs.rmdirSync(dir, { recursive: true });
    console.log(chalk.green(`Removed ${dir}`));
}

function makeDir(dir) {
    console.log(`Creating ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
    console.log(chalk.green(`Created ${dir}`));
}

module.exports = { deleteDir, makeDir };