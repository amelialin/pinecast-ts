const n = Symbol('n');
const length = Symbol('length');
const data = Symbol('data');

module.exports = class UintNArray {
  constructor(...args) {
    if (args[0] instanceof Uint8Array) {
      this[data] = args[0];
      this[n] = args[1];
      this[length] = args[2];
    } else {
      const base = args[0];
      if (base > 8 || base < 1) {
        throw new TypeError(
          `UintNArray does not work when n < 1 or n > 8. Got n == ${base}`,
        );
      }
      this[n] = args[0];
      const size = args[1];
      this[length] = size;
      this[data] = new Uint8Array(Math.ceil(size * this[n] / 8));
    }

    const rightBits = 2 ** this[n] - 1;

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

    const get = pdx => {
      const lowOffset = Math.floor(pdx * this[n] / 8);
      const highOffset = Math.floor(((pdx + 1) * this[n] - 1) / 8);
      if (lowOffset === highOffset) {
        const innerOffset = (pdx * this[n]) % 8;
        const value = this[data][lowOffset] & (rightBits << innerOffset);
        return value >> innerOffset;
      } else {
        const lowInnerOffset = (pdx * this[n]) % 8;
        const highInnerOffset = 8 - lowInnerOffset;

        const lowValue = this[data][lowOffset] & (rightBits << lowInnerOffset);
        const highValue =
          this[data][highOffset] & (rightBits >>> highInnerOffset);
        return (lowValue >>> lowInnerOffset) | (highValue << highInnerOffset);
      }
    };

    const map = (cb, thisParam = null) => {
      const out = new Array(this[length]);
      for (let i = 0; i < this[length]; i++) {
        out[i] = cb.call(thisParam, get(i));
      }
      return out;
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
          case 'buffer':
            return self[data].buffer;
          case 'byteLength':
            return self[data].byteLength;
          case 'map':
            return map;
        }
        if (typeof idx === 'symbol') {
          return undefined;
        }
        const pdx = Math.floor(Number(idx));
        if (!validateIndex(pdx)) {
          return null;
        }
        return get(pdx);
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
