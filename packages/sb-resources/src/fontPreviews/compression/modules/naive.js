const base85 = require('base85');
const parseSVG = require('parse-svg-path');

const {codes, lengths} = require('./_svg');

function encode(path) {
  const parsed = parseSVG(path);
  const codemap = new Uint8Array(parsed.length);
  const argDump = [];
  parsed.forEach(([code, ...args], i) => {
    const codeId = codes.indexOf(code);
    codemap[i] = codeId;
    argDump.push(...args);
  });
  const header = new Uint32Array([parsed.length]);
  const body = new Float32Array(argDump);

  const merged = new Uint8Array(
    header.byteLength + codemap.byteLength + body.byteLength,
  );
  merged.set(new Uint8Array(header.buffer), 0);
  merged.set(new Uint8Array(codemap.buffer), header.byteLength);
  merged.set(
    new Uint8Array(body.buffer),
    header.byteLength + codemap.byteLength,
  );
  const buff = new Buffer(merged.buffer);
  return base85.encode(buff, 'ascii85');
}

exports.encode = function(pathMap) {
  return Object.entries(pathMap)
    .map(([key, path]) => [key, encode(path)])
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc;
    }, {});
};
