import BaseStyletron from 'styletron-server';
import {isUnitlessNumber} from 'react-dom/lib/CSSProperty';


declare class StyletronServerExtended extends BaseStyletron {
    incrementVirtualCount(): number;
}

class Styletron extends BaseStyletron {
    injectDeclaration(
        {prop, val, media, pseudo}:
        {prop: string, val: string, media?: string, pseudo?: string}
    ): string | void {
        if (!/^\d+(\.\d+)?$/.exec(val)) {
            return super.injectDeclaration({prop, val, media, pseudo});
        }
        return super.injectDeclaration({prop, val: `${val}px`, media, pseudo});
    }

    incrementVirtualCount() {} // stub
}


// This is a hack that allows us to ban Styletron from generating the className `ad`.
const origIncrementVirtualCount = ((BaseStyletron as any) as typeof StyletronServerExtended).prototype.incrementVirtualCount;
Styletron.prototype.incrementVirtualCount = function() {
    const output = origIncrementVirtualCount.call(this);
    if (output.toString(36) === 'ad') {
        return origIncrementVirtualCount.call(this);
    }
    return output;
};

export default Styletron;
