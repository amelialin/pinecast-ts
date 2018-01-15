import * as React from 'react';

import {alignment} from '../styleMixins';
import atom from '../elements/atom';
import {ComponentContext, getsContext} from '../componentContext';
import {Episode, LayoutConfig} from '../primitives';
import {getsItemSource, ItemSourceContext} from '../itemSourceContext';
import renderN from './util';

const Wrapper = atom('section');
const WrapperInner = atom('div');

export default getsItemSource(function<T>(
  {
    children: childRenderer,
    config,
  }: {
    children: (index: number, item: T, style: Object | null) => JSX.Element;
    config: LayoutConfig;
  },
  {itemSource}: {itemSource: ItemSourceContext<T>},
) {
  return (
    <Wrapper
      style={{
        backgroundColor: config.bgColor,
      }}
    >
      <WrapperInner
        style={{
          ...alignment(config.alignment),
          backgroundColor: config.fgColor,
          maxWidth: config.width === 'full' ? '100%' : config.width || 'auto',
          padding: config.padding,
        }}
      >
        {renderN(config.consumeCount, itemSource, (item: T, i: number) =>
          childRenderer(i, item, null),
        )}
      </WrapperInner>
    </Wrapper>
  );
});
