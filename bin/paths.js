const path = require("path");

module.exports = Object.freeze({
    TEMP_PATH: path.join(__dirname, "../temp"),
    ASSETS_PATH: path.join(__dirname, "../temp/digibear-icons/svg"),
    TYPES_PATH: path.join(__dirname, "../index.d.ts"),
    ICONS_PATH: path.join(__dirname, "../src/icons"),
    SRC_PATH: path.join(__dirname, "../src"),
});