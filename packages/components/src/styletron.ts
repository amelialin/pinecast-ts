import BaseStyletron from 'styletron-react/node_modules/styletron-server';
import * as hyphenateStyleName from 'react-dom/node_modules/fbjs/lib/hyphenateStyleName';
import {isUnitlessNumber} from 'react-dom/lib/CSSProperty';

const unitlessCSSProperties = new Set<string>();
Object.keys(isUnitlessNumber).forEach(key =>
  unitlessCSSProperties.add(hyphenateStyleName(key)),
);

// NOTE: This is a special exception, because there's almost literally no
// reason to use a unitless value with line-height, and it's a source of many
// errors.
unitlessCSSProperties.delete('line-height');

declare class StyletronServerExtended extends BaseStyletron {
  incrementVirtualCount(): number;
}

class Styletron extends BaseStyletron {
  injectDeclaration({
    prop,
    val,
    media,
    pseudo,
  }: {
    prop: string;
    val: string;
    media?: string;
    pseudo?: string;
  }): string | void {
    if (!/^\-?\d+(\.\d+)?$/.exec(val) || unitlessCSSProperties.has(prop)) {
      return super.injectDeclaration({prop, val, media, pseudo});
    }
    return super.injectDeclaration({prop, val: `${val}px`, media, pseudo});
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
