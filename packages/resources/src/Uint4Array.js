const length = Symbol('length');
const data = Symbol('data');

module.exports = class Uint4Array {
  constructor(size) {
    this[length] = size;
    this[data] = new Uint8Array(Math.ceil(size / 2));

    const validateIndex = idx =>
      !isNaN(idx) && isFinite(idx) && idx >= 0 && idx < this[length];
    const has = idx => validateIndex(Math.floor(Number(idx)));
    const set = (idx, value) => {
      const pdx = Math.floor(Number(idx));
      if (!validateIndex(pdx)) {
        return;
      }
      const baseOffset = Math.floor(pdx / 2);
      if (pdx % 2 === 0) {
        this[data][baseOffset] &= 0b11110000;
        this[data][baseOffset] |= value & 0b00001111;
      } else {
        this[data][baseOffset] &= 0b00001111;
        this[data][baseOffset] |= (value & 0b00001111) << 4;
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
        const baseOffset = Math.floor(pdx / 2);
        const val = self[data][baseOffset];
        if (pdx % 2 === 0) {
          return val & 0b00001111;
        } else {
          return (val & 0b11110000) >>> 4;
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
