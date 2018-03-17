/*
This file can be used to do path simplification, but it's been found that the
technique produces very poor results. It's been commented to prevent dependency
issues in the future. Here are the necessary deps from package.json:

        "html-attribute-parser": "^1.0.0",
        "paper": "^0.11.5",

*/

// const attributeParser = require('html-attribute-parser');
// const paper = require('paper');
// paper.setup();

// exports.simplifyPath = function simplifyPath(pathData) {
//   const parsed = new paper.Path({pathData});
//   parsed.simplify(0.005);
//   return attributeParser(parsed.exportSVG({asString: true})).attributes.d;
// };
