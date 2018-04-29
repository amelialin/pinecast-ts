import * as React from 'react';

import {alignment} from '../styleMixins';
import atom from '../elements/atom';
import {ComponentContext, getsContext} from '../componentContext';
import {Episode, LayoutConfig} from '../primitives';
import {getsItemSource, ItemSourceContext} from '../itemSourceContext';
import renderN from './util';

const Wrapper = atom('section');
const WrapperInner = atom('div');

export default getsContext(
  getsItemSource(function<T>(
    {
      children: childRenderer,
      config,
    }: {
      children: (index: number, item: T, style: Object) => JSX.Element;
      config: LayoutConfig;
    },
    {
      ctx,
      itemSource,
    }: {ctx: ComponentContext; itemSource: ItemSourceContext<T>},
  ) {
    const inner = (
      <WrapperInner
        style={{
          ...alignment(config.alignment || 'center'),
          backgroundColor: config.fgColor,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: config.width === 'full' ? '100%' : 'var(--fixedWidthMax)',
        }}
      >
        {renderN(config.consumeCount, itemSource, (item: T, i: number) => {
          // const basis = `calc(var(--fixedWidthMax) / ${config.maxItemsAcross})`;
          return childRenderer(i, item, {
            display: 'flex',
            flex: '1 1',
            // flex: `0 1 ${basis}`,
            marginBottom: config.itemSpacing || 0,
            width: `calc(var(--fixedWidthMax) / ${config.maxItemsAcross})`,
            paddingLeft: (config.itemSpacing || 0) / 2,
            paddingRight: (config.itemSpacing || 0) / 2,
          });
        })}
      </WrapperInner>
    );
    if (!config.bgColor) {
      return inner;
    }
    return <Wrapper style={{backgroundColor: config.bgColor}}>{inner}</Wrapper>;
  }),
);
