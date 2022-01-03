import cheerio from "cheerio";
import fs from "fs";
import * as constants from "./constants.mjs";

export function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

export function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function toCamelCase(text) {
  return lowerFirstLetter(toPascalCase(text));
}

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function prefixName(name) {
  return constants.PREFIX + capitalizeFirstLetter(name);
}

export function lowerFirstLetter(word) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

export function extractSVGPaths(filePath) {
  var contents = fs.readFileSync(filePath, "utf-8");
  var $ = cheerio.load(contents, { xmlMode: true });

  var paths = [];
  $("path").each(function () {
    var d = $(this).attr("d");
    paths.push(d);
  });
  if (paths.length == 1) {
    return `["${paths[0]}"]`;
  }
  return JSON.stringify(paths.map((svgPath) => `${svgPath}`));
}
