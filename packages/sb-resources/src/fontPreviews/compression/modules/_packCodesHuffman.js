const {buildTree, HuffmanArray, Tree: HuffmanTree} = require('./_huffman');

const isMLQZ = Symbol();
const matcher = /(QZ|[MQ]L*|Z)/g;

exports.getPackTree = function getPackTree(elements) {
  const frequencies = {};
  elements.forEach(elem => {
    frequencies[elem] = (frequencies[elem] || 0) + 1;
  });
  const isLimitedSet =
    Object.keys(frequencies)
      .sort()
      .join('') === 'LMQZ';
  if (!isLimitedSet) {
    return buildTree(frequencies);
  }

  const joined = elements.join('');
  const chunks = joined.match(matcher);
  const chunkFrequencies = {};
  chunks.forEach(chunk => {
    chunkFrequencies[chunk] = (chunkFrequencies[chunk] || 0) + 1;
  });
  const output = buildTree(chunkFrequencies);
  output[isMLQZ] = true;
  return output;
};

exports.pack = function pack(elements, packTree) {
  const ht = new HuffmanTree(packTree);
  if (!packTree[isMLQZ]) {
    return [elements.length, ht.encode(elements).buffer];
  }

  const joined = elements.join('');
  const chunks = joined.match(matcher);
  return [chunks.length, ht.encode(chunks).buffer];
};
exports.unpack = function unpack(length, packedCodes, packTree) {
  const ht = new HuffmanTree(packTree);
  return Array.from(new HuffmanArray(ht, packedCodes).decode(length))
    .join('')
    .split('');
};
