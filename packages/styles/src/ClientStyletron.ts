import BaseStyletron from 'styletron-client';

import {unitlessCSSProperties} from './unitlessValues';

export default class Styletron extends BaseStyletron {
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
}
