const base85 = require('base85');
const parseSVG = require('parse-svg-path');

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

  function encode(parsed) {
    const codemapBuffer = pack(parsed.map(x => x[0]), usedCodes);
    const argDump = [];
    parsed.forEach(([code, ...args]) => {
      argDump.push(...args);
      (cdiag[code] = cdiag[code] || []).push(...args);
    });
    const header = new Uint32Array([parsed.length]);
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

  const out = parsedArr.reduce(
    (acc, [k, parsed]) => {
      acc[k] = encode(parsed);
      return acc;
    },
    {_: usedCodes.join('')},
  );

  Object.keys(cdiag).forEach(code => {
    const hist = cdiag[code].reduce((acc, cur) => {
      if (!(String(cur) in acc)) {
        acc[cur] = 0;
      }
      acc[cur] += 1;
      return acc;
    }, {});
    require('fs').writeFileSync(
      `./testResults/packed.cdiag.${code}.csv`,
      'Value,Frequency\n' +
        Object.entries(hist)
          .sort((a, b) => a[0] < b[0])
          .map(([k, v]) => `${k},${v}`)
          .join('\n'),
    );
  });

  return out;
};

exports.decode = function decode(encodedPath, _val) {
  return '';
};
