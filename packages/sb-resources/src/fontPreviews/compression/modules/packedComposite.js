const base85 = require('base85');
const parseSVG = require('parse-svg-path');

const {
  buildTree,
  HuffmanArray,
  Tree: HuffmanTree,
} = require('./_huffmanComposite');
const {lengths} = require('./_svg');
const {getBase, pack, unpack} = require('./_packCodes');

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
        const lv = minifyArg(lossify(arg));
        codeFrequencies[code][lv] = (codeFrequencies[code][lv] || 0) + 1;
      });
    });
  });

  const rawHuffmanTrees = Object.entries(codeFrequencies)
    .filter(([, frequencies]) => Object.keys(frequencies).length)
    .map(([code, frequencies]) => [code, buildTree(frequencies)]);
  const rawHuffmanTreeMap = rawHuffmanTrees.reduce((acc, [code, tree]) => {
    acc[code] = tree;
    return acc;
  }, {});
  const huffmanTrees = rawHuffmanTrees.reduce((acc, [code, tree]) => {
    acc[code] = new HuffmanTree(tree);
    return acc;
  }, {});

  function encode(parsed) {
    const codemapBuffer = pack(parsed.map(x => x[0]), usedCodes);

    let bitCount = 0;
    let argCount = 0;
    parsed.forEach(([code, ...args]) => {
      const tree = huffmanTrees[code];
      args.forEach(arg => {
        argCount += 1;
        bitCount += tree.getBitSize(minifyArg(lossify(arg)));
      });
    });

    const body = new HuffmanArray(Math.ceil(bitCount / 8));
    const writer = body.writeSymbols();
    parsed.forEach(([code, ...args]) => {
      const tree = huffmanTrees[code];
      args.forEach(arg => {
        const lv = minifyArg(lossify(arg));
        writer(tree, lv);
      });
    });

    const header = new Uint32Array([parsed.length, argCount]);

    const merged = new Uint8Array(
      header.byteLength + codemapBuffer.byteLength + body.byteLength,
    );
    merged.set(new Uint8Array(header.buffer), 0);
    merged.set(new Uint8Array(codemapBuffer), header.byteLength);
    merged.set(
      new Uint8Array(body.buffer),
      header.byteLength + codemapBuffer.byteLength,
    );

    return base85.encode(new Buffer(merged.buffer), 'ascii85');
  }

  console.log(usedCodes);

  return parsedArr.reduce(
    (acc, [k, parsed]) => {
      acc[k] = encode(parsed);
      return acc;
    },
    {_: {usedCodes: usedCodes.join(''), trees: rawHuffmanTreeMap}},
  );
};

// exports.decode =
function decode(encodedPath, {usedCodes, tree}) {
  const rawBuff = base85.decode(encodedPath, 'ascii85');
  const ab = new Uint8Array(rawBuff).buffer;

  const header = new Uint32Array(ab, 0, 2);
  const numCodes = header[0];
  const numArgs = header[1];

  const codeBuffer = new Uint8Array(
    ab,
    8,
    Math.ceil(numCodes * getBase(usedCodes.length) / 8),
  );
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
}
