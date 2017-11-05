const huff = require('./_huffman');

const sampleFreqs = {
  a: 10,
  b: 9,
  long: 8,
  [123]: 5,
  verylong: 3,
  foo: 1,
  bar: 1,
};

const stream = ['b', 'verylong', 'a', 'a', 'foo', 'b'];

describe('Huffman Coding', () => {
  describe('trees', () => {
    it('should construct a valid tree', () => {
      const tree = huff.buildTree(sampleFreqs);
      expect(tree).toEqual([
        ['long', 'b'],
        ['a', ['123', [['foo', 'bar'], 'verylong']]],
      ]);
    });
  });

  it('should build a valid tree object', () => {
    const tree = huff.buildTree(sampleFreqs);
    const tc = new huff.Tree(tree);
    expect(Object.keys(tc.symbolCache).length).toBe(
      Object.keys(sampleFreqs).length,
    );

    const long = tc.symbolCache['long'];
    expect(long[0]).toBe(0b00);
    expect(long[1]).toBe(2);

    const verylong = tc.symbolCache['verylong'];
    expect(verylong[0]).toBe(0b1111);
    expect(verylong[1]).toBe(4);
  });

  it('should transcode end-to-end', () => {
    const tree = huff.buildTree(sampleFreqs);
    const tc = new huff.Tree(tree);
    const encoded = tc.encode(stream);
    const decoded = Array.from(encoded.decode(stream.length));
    expect(decoded).toEqual(stream);
  });

  it('should transcode end-to-end with numbers', () => {
    const sampleFreqs = {
      [0]: 123,
      [0.2]: 122,
      [-0.2]: 121,
      [0.1]: 100,
      [0.5]: 90,
      [-0.5]: 88,
    };
    const stream = [
      0,
      0.2,
      -0.2,
      0.2,
      0.2,
      0.1,
      0,
      0,
      0.5,
      -0.5,
      0.2,
      0.2,
      -0.2,
    ];
    const tree = huff.buildTree(sampleFreqs);
    const tc = new huff.Tree(tree);
    const encoded = tc.encode(stream);
    const decoded = Array.from(encoded.decode(stream.length));
    expect(decoded).toEqual(stream.map(String));
  });
});
