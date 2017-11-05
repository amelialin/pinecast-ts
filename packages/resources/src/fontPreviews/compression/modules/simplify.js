const base85 = require('base85');
const parseSVG = require('parse-svg-path');

const {simplifyPath} = require('./_pathSimplify');

exports.encode = function(pathMap) {
  return Object.entries(pathMap)
    .map(([key, path]) => [key, simplifyPath(path)])
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
};

exports.decode = function decode(encoded) {
  return '';
};
