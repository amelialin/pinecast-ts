function sortTuples(tuples) {
  tuples.sort(([, f1], [, f2]) => {
    if (f1 > f2) return 1;
    if (f1 < f2) return -1;
    return 0;
  });
}

exports.buildTree = function buildTree(frequenciesMap) {
  const frequencies = Object.entries(frequenciesMap);
  sortTuples(frequencies);
  while (frequencies.length > 1) {
    const first = frequencies.shift();
    const second = frequencies.shift();
    frequencies.push([[first, second], first[1] + second[1]]);
    sortTuples(frequencies);
  }

  const combinedTree = frequencies[0];
  function dropNumbers([elem]) {
    if (Array.isArray(elem)) {
      return [dropNumbers(elem[0]), dropNumbers(elem[1])];
    } else {
      return elem;
    }
  }

  return dropNumbers(combinedTree);
};

exports.Tree = class Tree {
  constructor(rawTree) {
    this.root = exports.TreeNode.parse(rawTree);
    this.symbolCache = {};
    this.populateCache(this.root);
  }

  populateCache(node, path = 0, pathDepth = 0) {
    if (node.isLeaf()) {
      this.symbolCache[node.value] = [path, pathDepth];
    } else {
      // this.populateCache(node.left, path << 1, pathDepth + 1);
      // this.populateCache(node.right, (path << 1) | 1, pathDepth + 1);
      this.populateCache(node.left, path, pathDepth + 1);
      this.populateCache(node.right, path | (1 << pathDepth), pathDepth + 1);
    }
  }

  encode(symbols) {
    for (const sym of symbols) {
      if (!this.symbolCache.hasOwnProperty(sym)) {
        throw new TypeError(
          `Not all symbols are registered in Huffman tree. Missing '${sym}', type ${typeof sym}`,
        );
      }
    }
    let bits = 0;
    for (const symbol of symbols) {
      bits += this.symbolCache[symbol][1];
    }

    const ha = new exports.HuffmanArray(this, Math.ceil(bits / 8));
    ha.populate(symbols);
    return ha;
  }
};

exports.TreeNode = class TreeNode {
  constructor() {
    this.left = null;
    this.right = null;
    this.value = null;
  }

  isLeaf() {
    return this.left === null && this.right === null;
  }

  static parse(elem) {
    const node = new exports.TreeNode();
    if (Array.isArray(elem)) {
      node.left = exports.TreeNode.parse(elem[0]);
      node.right = exports.TreeNode.parse(elem[1]);
    } else {
      node.value = elem;
    }
    return node;
  }
};

exports.HuffmanArray = class HuffmanArray {
  constructor(tree, dataOrByteLength) {
    this.tree = tree;
    this.data =
      typeof dataOrByteLength === 'number'
        ? new Uint8Array(dataOrByteLength)
        : dataOrByteLength;
  }

  get byteLength() {
    return this.data.byteLength;
  }
  get buffer() {
    return this.data.buffer;
  }

  populate(symbolStream) {
    let cursor = 0;
    let innerOffset = 0;
    const mask = 0b11111111;

    for (const sym of symbolStream) {
      let [bits, bitLen] = this.tree.symbolCache[sym];
      this.data[cursor] |= ((bits & mask) << innerOffset) & mask;
      if (innerOffset + bitLen > 8) {
        do {
          bits = bits >>> (8 - innerOffset);
          bitLen -= 8 - innerOffset;
          cursor += 1;
          innerOffset = 0;
          this.data[cursor] |= ((bits & mask) << innerOffset) & mask;
        } while (innerOffset + bitLen > 8);
      }
      if (bitLen + innerOffset >= 8) {
        cursor += 1;
      }
      innerOffset = (bitLen + innerOffset) % 8;
    }
  }

  *decode(count) {
    let cursor = 0;
    for (let i = 0; i < count; i++) {
      let node = this.tree.root;
      do {
        const bit =
          (this.data[Math.floor(cursor / 8)] & (1 << (cursor % 8))) >>>
          (cursor % 8);
        if (bit === 0) {
          node = node.left;
        } else {
          node = node.right;
        }
        cursor += 1;
      } while (!node.isLeaf());
      yield node.value;
    }
  }
};
