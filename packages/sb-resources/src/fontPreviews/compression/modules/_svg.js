const codes = ['m', 'l', 'h', 'v', 'c', 's', 'q', 't', 'a', 'z'];
codes.forEach(code => codes.push(code.toUpperCase()));
const lengths = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0};
Object.keys(lengths).forEach(
  code => (lengths[code.toUpperCase()] = lengths[code]),
);

exports.codes = codes;
exports.lengths = lengths;
