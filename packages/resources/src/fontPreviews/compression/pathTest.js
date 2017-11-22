const fs = require('fs');

const gzipSize = require('gzip-size');

process.chdir(__dirname);
const familyPathsOrig = fs.readFileSync('../familyPaths.json').toString();
const origGzipSize = gzipSize.sync(familyPathsOrig);

const familyPaths = require('../familyPaths.json');
delete familyPaths._;

console.log(
  `Orig size: ${familyPathsOrig.length}    Gzip size: ${origGzipSize}`,
);

function testModule(name) {
  console.log('\n');

  const mod = require(`./modules/${name}`);
  const encodedEntries = mod.encode(familyPaths);

  const entries = Object.entries(encodedEntries)
    .filter(([k]) => k !== '_')
    .map(([key, encoded]) => {
      const path = familyPaths[key];
      return {
        key,
        encoded,
        ratio: encoded.length / path.length,
        bytesSaved: path.length - encoded.length,
        origSize: path.length,
        length: encoded.length,
      };
    });

  console.log(`Module: ${name}`);
  console.log(
    `Bytes saved: ${entries.reduce((acc, cur) => acc + cur.bytesSaved, 0)}`,
  );

  const ratio = entries.reduce(
    (acc, cur) => [acc[0] + cur.length, acc[1] + cur.origSize],
    [0, 0],
  );
  console.log(`Overall ratio: ${ratio[0] / ratio[1]}`);

  const framed = `{\n${entries
    .map(
      ({key, encoded}) =>
        `  ${JSON.stringify(key)}:${JSON.stringify(encoded)},\n`,
    )
    .join('')}\n"_":${JSON.stringify(encodedEntries._)}\n}`;

  console.log(`Size: ${framed.length}    Gzip size: ${gzipSize.sync(framed)}`);
  console.log(
    `Ratio: ${framed.length /
      familyPathsOrig.length}    Gzip ratio: ${gzipSize.sync(framed) /
      origGzipSize}`,
  );

  if (mod.decode) {
    const jParsed = JSON.parse(framed);
    const decoded = mod.decode(jParsed.Acme, jParsed._);
    console.log('Decoding was successful');
    // console.log(familyPaths.Acme);
    // console.log(decoded);
  }
}

// testModule('simplify');
// testModule('packedCodes');

// testModule('naive');
// testModule('packedBody');
testModule('packedBodyLossy');
// testModule('packedComposite');
testModule('packedHuffman');
testModule('betterEncoding');
