const cheerio = require('cheerio');
const fs = require("fs");
const constants = require('./constants');

function clearAndUpper(text) {
    return text.replace(/-/, "").toUpperCase();
}

function toPascalCase(text) {
    return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function toCamelCase(text) {
    return lowerFirstLetter(toPascalCase(text));
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function prefixName(name) {
    return constants.PREFIX + capitalizeFirstLetter(name);
}

function lowerFirstLetter(word) {
    return word.charAt(0).toLowerCase() + word.slice(1);
}

function extractSVGPaths(filePath) {
    var contents = fs.readFileSync(filePath, "utf-8")
    var $ = cheerio.load(contents, { xmlMode: true })

    var paths = []
    $('path').each(function () {
        var d = $(this).attr('d')
        paths.push(d);
    })
    if (paths.length == 1) { return `["${paths[0]}"]`; }
    return JSON.stringify(paths.map(svgPath => `${svgPath}`));
}

module.exports = { toPascalCase, toCamelCase, capitalizeFirstLetter, prefixName, extractSVGPaths };