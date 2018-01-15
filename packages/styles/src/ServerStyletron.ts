import BaseStyletron from 'styletron-server';

import {unitlessCSSProperties} from './unitlessValues';

declare class StyletronServerExtended extends BaseStyletron {
  incrementVirtualCount(): number;
}

class Styletron extends BaseStyletron {
  injectRawDeclaration({
    block,
    media,
    pseudo,
  }: {
    block: string;
    media?: string;
    pseudo?: string;
  }): string | void {
    const [prop, val] = block.split(':', 2);
    if (!/^\-?\d+(\.\d+)?$/.exec(val) || unitlessCSSProperties.has(prop)) {
      return super.injectRawDeclaration({block, media, pseudo});
    }
    return super.injectRawDeclaration({
      block: `${prop}:${val}px`,
      media,
      pseudo,
    });
  }

  incrementVirtualCount() {} // stub
}

// This is a hack that allows us to ban Styletron from generating the className `ad`.
const origIncrementVirtualCount = ((BaseStyletron as any) as typeof StyletronServerExtended)
  .prototype.incrementVirtualCount;
Styletron.prototype.incrementVirtualCount = function() {
  const output = origIncrementVirtualCount.call(this);
  if (output.toString(36) === 'ad') {
    return origIncrementVirtualCount.call(this);
  }
  return output;
};

export default (Styletron as any) as BaseStyletron;
