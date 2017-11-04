const n = Symbol('n');
const length = Symbol('length');
const data = Symbol('data');

module.exports = class UintNArray {
  constructor(n, size) {
    if (n > 8 || n < 1) {
      throw new TypeError(
        `UintNArray does not work when n < 1 or n > 8. Got n == ${n}`,
      );
    }
    this[n] = n;
    this[length] = size;
    this[data] = new Uint8Array(Math.ceil(size * n / 8));

    const rightBits = 2 ** n - 1;

    const validateIndex = idx =>
      !isNaN(idx) && isFinite(idx) && idx >= 0 && idx < this[length];
    const has = idx => validateIndex(Math.floor(Number(idx)));
    const set = (idx, value) => {
      const pdx = Math.floor(Number(idx));
      if (!validateIndex(pdx)) {
        return;
      }
      const lowOffset = Math.floor(pdx * this[n] / 8);
      const highOffset = Math.floor(((pdx + 1) * this[n] - 1) / 8);
      // console.log(idx, value, lowOffset, highOffset);
      if (lowOffset === highOffset) {
        const innerOffset = (pdx * this[n]) % 8;
        this[data][lowOffset] &= ~(rightBits << innerOffset);
        this[data][lowOffset] |= (value & rightBits) << innerOffset;
      } else {
        const lowInnerOffset = (pdx * this[n]) % 8;
        const highInnerOffset = 8 - lowInnerOffset;

        this[data][lowOffset] &= ~(rightBits << lowInnerOffset);
        this[data][lowOffset] |= (value & rightBits) << lowInnerOffset;

        this[data][highOffset] &= ~(rightBits >>> highInnerOffset);
        this[data][highOffset] |= (value & rightBits) >>> highInnerOffset;
      }
    };

    return new Proxy(this, {
      deleteProperty(self, idx) {
        if (!has(self, idx)) {
          return false;
        }
        set(self, idx, 0);
        return true;
      },
      get(self, idx) {
        switch (idx) {
          case 'length':
            return self[length];
          case 'byteLength':
            return self[data].byteLength;
        }
        if (typeof idx === 'symbol') {
          return undefined;
        }
        const pdx = Math.floor(Number(idx));
        if (!validateIndex(pdx)) {
          return null;
        }
        const lowOffset = Math.floor(pdx * self[n] / 8);
        const highOffset = Math.floor(((pdx + 1) * self[n] - 1) / 8);
        // console.log(pdx, lowOffset, highOffset)
        if (lowOffset === highOffset) {
          const innerOffset = (pdx * self[n]) % 8;
          const value = self[data][lowOffset] & (rightBits << innerOffset);
          return value >> innerOffset;
        } else {
          const lowInnerOffset = (pdx * self[n]) % 8;
          const highInnerOffset = 8 - lowInnerOffset;

          const lowValue =
            self[data][lowOffset] & (rightBits << lowInnerOffset);
          const highValue =
            self[data][highOffset] & (rightBits >>> highInnerOffset);
          return (lowValue >>> lowInnerOffset) | (highValue << highInnerOffset);
        }
      },
      has(self, idx) {
        return has(idx);
      },
      set(self, idx, value) {
        return set(idx, value);
      },
    });
  }
};
