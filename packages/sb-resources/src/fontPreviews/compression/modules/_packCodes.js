const UintNArray = require('../UintNArray');

const {codes, lengths} = require('./_svg');

function getBase(numUsedCodes) {
  let i = 1;
  while (2 ** i < numUsedCodes) {
    i += 1;
  }
  return i;
}
exports.getBase = getBase;

exports.pack = function pack(elements, useCodes = codes) {
  // elements should be an array of chars
  const n = getBase(useCodes.length);
  const arr = new UintNArray(n, elements.length);
  elements.forEach((code, i) => {
    arr[i] = useCodes.indexOf(code);
  });
  return arr.buffer;
};
exports.unpack = function unpack(length, packedCodes, useCodes = codes) {
  const n = getBase(useCodes.length);
  const arr = new UintNArray(packedCodes, n, length);
  return arr.map(val => useCodes[val]);
};
