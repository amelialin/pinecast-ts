const parseSVG = require('parse-svg-path');

const {buildTree, HuffmanArray, Tree: HuffmanTree} = require('./_huffman');
const {lengths} = require('./_svg');
const {getPackTree, pack, unpack} = require('./_packCodesHuffman');
const {encode: encoderEncode, decode: encoderDecode} = require('./_encoder');

function minifyArg(arg) {
  if (arg === 0) {
    return '0';
  }
  arg = String(arg);
  if (arg.endsWith('.0')) {
    arg = arg.substr(0, arg.length - 2);
  }
  if (arg.startsWith('0.')) {
    return arg.substr(1);
  }
  if (arg.startsWith('-0.')) {
    return '-' + arg.substr(2);
  }
  return arg;
}

function lossify(value) {
  value = value.toFixed(1);
  if (Math.abs(value) > 70) {
    return Math.round(value / 4) * 4;
  }
  if (Math.abs(value) > 40) {
    return Math.round(value / 3) * 3;
  }
  if (Math.abs(value) > 20) {
    return Math.round(value / 2) * 2;
  }
  if (Math.abs(value) > 10) {
    return Math.round(value);
  }
  return value;
}

exports.encode = function encode(pathMap) {
  const parsedArr = Object.entries(pathMap).map(([k, v]) => {
    // const simplified = simplifyPath(v);
    const simplified = v;
    return [k, parseSVG(simplified)];
  });

  const allCodes = parsedArr
    .map(([, parsed]) => parsed.map(y => y[0]))
    .reduce((acc, cur) => acc.concat(cur));
  const usedCodes = Array.from(new Set(allCodes));
  const codeTree = getPackTree(allCodes);

  // Calculate the frequencies of each numeric value
  const codeFrequencies = {};
  parsedArr.forEach(([, parsed]) => {
    parsed.forEach(([, ...args]) => {
      args.forEach(arg => {
        const lv = minifyArg(lossify(arg));
        codeFrequencies[lv] = (codeFrequencies[lv] || 0) + 1;
      });
    });
  });
  const rawTree = buildTree(codeFrequencies);
  const huffmanTree = new HuffmanTree(rawTree);

  function encode(parsed) {
    const [codeSymbolCount, codemapBuffer] = pack(
      parsed.map(x => x[0]),
      codeTree,
    );
    const argDump = parsed
      .map(([, ...args]) => args.map(arg => minifyArg(lossify(arg))))
      .reduce((acc, cur) => acc.concat(cur));
    const header = new Uint32Array([
      codeSymbolCount,
      codemapBuffer.byteLength,
      argDump.length,
    ]);
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

    return encoderEncode(new Buffer(merged.buffer));
  }

  return parsedArr.reduce(
    (acc, [k, parsed]) => {
      acc[k] = encode(parsed);
      return acc;
    },
    {_: {usedCodes: codeTree, tree: rawTree}},
  );
};

exports.decode = function decode(encodedPath, {usedCodes, tree}) {
  const rawBuff = encoderDecode(encodedPath);
  const ab = new Uint8Array(rawBuff).buffer;

  const header = new Uint32Array(ab, 0, 3);
  const numCodes = header[0];
  const codeByteLen = header[1];
  const numArgs = header[2];

  const codeBuffer = new Uint8Array(ab, header.byteLength, codeByteLen);
  const codes = unpack(numCodes, codeBuffer, usedCodes);

  const huffmanTree = new HuffmanTree(tree);
  const rawArgs = new HuffmanArray(
    huffmanTree,
    new Uint8Array(ab, header.byteLength + codeBuffer.byteLength),
  );
  const decoder = rawArgs.decode(numArgs);

  return codes
    .map(code => {
      const args = new Array(lengths[code]);
      for (let i = 0; i < lengths[code]; i++) {
        const x = decoder.next();
        args[i] = x.value;
      }
      return code + args.join(' ');
    })
    .join('');
};
