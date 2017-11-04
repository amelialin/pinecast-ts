const base85 = require('base85');
const parseSVG = require('parse-svg-path');

const Uint4Array = require('./Uint4Array');

const codes = ['m', 'l', 'h', 'v', 'c', 's', 'q', 't', 'a', 'z'];
codes.forEach(code => codes.push(code.toUpperCase()));
const lengths = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0};
Object.keys(lengths).forEach(
  code => (lengths[code.toUpperCase()] = lengths[code]),
);

exports.encode = function encode(path) {
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
};

exports.decode = function decode(encoded) {
  return '';
};
