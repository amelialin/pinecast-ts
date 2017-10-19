import BaseStyletron from 'styletron-client';

import {unitlessCSSProperties} from './unitlessValues';

export default class Styletron extends BaseStyletron {
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
}
