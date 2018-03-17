const UintNArray = require('./UintNArray');

describe('UintNArray', () => {
  it('should have the correct size', () => {
    const a = new UintNArray(4, 10);
    expect(a.length).toBe(10);
    expect(a.byteLength).toBe(5);
  });
  it('should store data at one byte corretly', () => {
    const a = new UintNArray(8, 3);
    expect(a.length).toBe(3);
    expect(a.byteLength).toBe(3);

    a[0] = 255;
    a[1] = 2;
    a[2] = 3;

    expect(a[0]).toBe(255);
    expect(a[1]).toBe(2);
    expect(a[2]).toBe(3);
  });
  it('should store data at half a byte corretly', () => {
    const a = new UintNArray(4, 3);
    expect(a.length).toBe(3);
    expect(a.byteLength).toBe(2);

    a[0] = 15;
    a[1] = 2;
    a[2] = 3;

    expect(a[0]).toBe(15);
    expect(a[1]).toBe(2);
    expect(a[2]).toBe(3);
  });
  describe('cross-byte storage', () => {
    it('should store data at 7/8 byte corretly', () => {
      const a = new UintNArray(7, 10);
      expect(a.length).toBe(10);
      expect(a.byteLength).toBe(9);

      a[0] = 127;
      a[1] = 2;
      a[2] = 3;

      expect(a[0]).toBe(127);
      expect(a[1]).toBe(2);
      expect(a[2]).toBe(3);
    });
    it('should store data at 6/8 byte corretly', () => {
      const a = new UintNArray(6, 10);
      expect(a.length).toBe(10);
      expect(a.byteLength).toBe(8);

      a[0] = 63;
      a[1] = 2;
      a[2] = 3;

      expect(a[0]).toBe(63);
      expect(a[1]).toBe(2);
      expect(a[2]).toBe(3);
    });
    it('should store data at 3/8 byte corretly', () => {
      const a = new UintNArray(3, 10);
      expect(a.length).toBe(10);
      expect(a.byteLength).toBe(4);

      a[0] = 7;
      a[1] = 2;
      a[2] = 3;

      expect(a[0]).toBe(7);
      expect(a[1]).toBe(2);
      expect(a[2]).toBe(3);
    });
  });
});
