const base85 = require('base85');
const parseSVG = require('parse-svg-path');

const {buildTree, Tree: HuffmanTree} = require('./_huffman');
const {lengths} = require('./_svg');
const {pack, unpack} = require('./_packCodes');

function minifyArg(arg) {
  if (arg === 0) {
    return '0';
  }
  arg = String(arg);
  if (arg.endsWith('.0')) {
    console.log(arg);
    arg = arg.substr(0, arg.length - 2);
  }
  if (arg.startsWith('0.')) {
    console.log(arg);
    return arg.substr(1);
  }
  if (arg.startsWith('-0.')) {
    console.log(arg);
    return '-' + arg.substr(2);
  }
  return arg;
}

exports.encode = function encode(pathMap) {
  const parsedArr = Object.entries(pathMap).map(([k, v]) => [k, parseSVG(v)]);

  const usedCodes = Array.from(
    new Set(
      parsedArr
        .map(([, parsed]) => parsed.map(y => y[0]))
        .reduce((acc, cur) => acc.concat(cur)),
    ),
  );

  // Calculate the frequencies of each numeric value
  const codeFrequencies = {};
  parsedArr.forEach(([, parsed]) => {
    parsed.forEach(([, ...args]) => {
      args.forEach(arg => {
        const min = minifyArg(arg);
        codeFrequencies[min] = (codeFrequencies[min] || 0) + 1;
      });
    });
  });
  const rawTree = buildTree(codeFrequencies);
  const huffmanTree = new HuffmanTree(rawTree);

  function encode(parsed) {
    const codemapBuffer = pack(parsed.map(x => x[0]), usedCodes);
    const argDump = [];
    parsed.forEach(([code, ...args]) => {
      argDump.push(...args.map(minifyArg));
    });
    const header = new Uint32Array([parsed.length, argDump.length]);
    const body = huffmanTree.encode(argDump);

    const merged = new Uint8Array(
      header.byteLength + codemapBuffer.byteLength + body.byteLength,
    );
    merged.set(new Uint8Array(header.buffer), 0);
    merged.set(new Uint8Array(codemapBuffer), header.byteLength);
    merged.set(
      new Uint8Array(body.buffer),
      header.byteLength + codemapBuffer.byteLength,
    );
    const buff = new Buffer(merged.buffer);

    return base85.encode(buff, 'ascii85');
  }

  return parsedArr.reduce(
    (acc, [k, parsed]) => {
      acc[k] = encode(parsed);
      return acc;
    },
    {_: {usedCodes: usedCodes.join(''), tree: rawTree}},
  );
};
