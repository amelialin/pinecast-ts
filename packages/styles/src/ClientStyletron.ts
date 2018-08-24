import BaseStyletron from 'styletron-client';

import {compile} from './unitlessValues';

export default class Styletron extends BaseStyletron {
  exampleMode: boolean;
  constructor(exampleMode?: boolean) {
    super();
    this.exampleMode = exampleMode || false;
  }

  injectRawDeclaration({
    block,
    media,
    pseudo,
  }: {
    block: string;
    media?: string;
    pseudo?: string;
  }): string | void {
    return super.injectRawDeclaration({block: compile(block), media, pseudo});
  }
}
