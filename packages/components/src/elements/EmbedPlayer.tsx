import * as React from 'react';

import atom from './atom';
import {ComponentContext, getsContext} from '../componentContext';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';

const PLAYER_HEIGHTS = {
  minimal: 60,
  thick: 200,
  slim: 20,
};

export default getsContext(
  (
    {
      element,
      item,
      style = {},
    }: {
      element: Element;
      item: Object;
      style: Object;
    },
    {ctx}: {ctx: ComponentContext},
  ) => {
    const Container = atom('iframe');
    const props = {...element.props, ...extractProps(item, element.propPaths)};
    const theme = (ctx.styling.embed && ctx.styling.embed.theme) || 'minimal';
    if (theme !== 'minimal') {
      props.src = `${props.src}?theme=${ctx.styling.embed.theme}`;
    }
    return (
      <Container
        {...props}
        height={PLAYER_HEIGHTS[theme]}
        item={item}
        seamless
        style={{
          borderWidth: 0,
          width: '100%',
          ...expandElementStyles(
            {...style, ...element.styles},
            element.elementOptions,
          ),
        }}
      />
    );
  },
);
