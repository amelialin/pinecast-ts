import * as React from 'react';

import {CSS} from '@pinecast/sb-styles';

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
      style: CSS;
    },
    {ctx}: {ctx: ComponentContext},
  ) => {
    const Container = atom('iframe');
    const props: {src?: string; [prop: string]: any} = {
      ...element.props,
      ...extractProps(item, element.propPaths),
    };
    const theme = (ctx.options && ctx.options.embedTheme) || 'minimal';
    if (theme !== 'minimal') {
      props.src = `${props.src || ''}?theme=${theme}`;
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
            element.elementOptions || {},
          ),
        }}
      />
    );
  },
);
