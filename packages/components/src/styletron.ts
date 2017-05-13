import BaseStyletron from 'styletron-server';
import {isUnitlessNumber} from 'react-dom/lib/CSSProperty';


export default class Styletron extends BaseStyletron {
    injectDeclaration(
        {prop, val, media, pseudo}:
        {prop: string, val: string, media?: string, pseudo?: string}
    ): string | void {
        if (!/^\d+(\.\d+)?$/.exec(val)) {
            return super.injectDeclaration({prop, val, media, pseudo});
        }
        return super.injectDeclaration({prop, val: `${val}px`, media, pseudo});
    }
};
