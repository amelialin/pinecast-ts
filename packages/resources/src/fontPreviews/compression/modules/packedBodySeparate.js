const base85 = require('base85');
const parseSVG = require('parse-svg-path');

const {buildTree, Tree: HuffmanTree} = require('./_huffman');
const {lengths} = require('./_svg');
const {pack, unpack} = require('./_packCodes');

exports.encode = function encode(pathMap) {
  const cdiag = {};
  const parsedArr = Object.entries(pathMap).map(([k, v]) => [k, parseSVG(v)]);

  const usedCodes = Array.from(
    new Set(
      parsedArr
        .map(([, parsed]) => parsed.map(y => y[0]))
        .reduce((acc, cur) => acc.concat(cur)),
    ),
  );

  // Calculate the frequencies of each numeric value by code
  const codeFrequencies = usedCodes.reduce((acc, cur) => {
    acc[cur] = {};
    return acc;
  }, {});
  parsedArr.forEach(([, parsed]) => {
    parsed.forEach(([code, ...args]) => {
      args.forEach(arg => {
        codeFrequencies[code][arg] = (codeFrequencies[code][arg] || 0) + 1;
      });
    });
  });

  const rawHuffmanTrees = Object.entries(codeFrequencies)
    .map(([code, frequencies]) => [code, buildTree(frequencies)])
  const rawHuffmanTreeMap = rawHuffmanTrees
    .reduce((acc, [code, tree]) => {
      acc[code] = tree;
      return acc;
    }, {});
  const huffmanTrees = rawHuffmanTrees
    .reduce((acc, [code, tree]) => {
      acc[code] = new HuffmanTree(tree);
      return acc;
    }, {});

  function encode(parsed) {
    const codemapBuffer = pack(parsed.map(x => x[0]), usedCodes);
    const argDump = [];
    parsed.forEach(([code, ...args]) => {
      argDump.push(...args);
      (cdiag[code] = cdiag[code] || []).push(...args);
    });
    const header = new Uint32Array([parsed.length, argDump.length]);
    const body = new Float32Array(argDump);

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
    {_: {usedCodes: usedCodes.join(''), trees: rawHuffmanTreeMap}},
  );
};

exports.decode = function decode(encodedPath, _val) {
  return '';
};
