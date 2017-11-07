const {buildTree, HuffmanArray, Tree: HuffmanTree} = require('./_huffman');

exports.getPackTree = function getPackTree(elements) {
  const frequencies = {};
  elements.forEach(elem => {
    frequencies[elem] = (frequencies[elem] || 0) + 1;
  });
  return buildTree(frequencies);
};

exports.pack = function pack(elements, packTree) {
  // elements should be an array of chars
  const ht = new HuffmanTree(packTree);
  return ht.encode(elements).buffer;
};
exports.unpack = function unpack(length, packedCodes, packTree) {
  const ht = new HuffmanTree(packTree);
  return Array.from(new HuffmanArray(ht, packedCodes).decode(length));
};
