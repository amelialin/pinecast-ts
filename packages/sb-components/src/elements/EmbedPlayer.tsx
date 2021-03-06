import * as React from 'react';

import {CSS} from '@pinecast/styles';

import atom from './atom';
import {ComponentContext, getsContext} from '../componentContext';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';

export const PLAYER_HEIGHTS = {
  minimal: 60,
  thick: 200,
  slim: 20,
};

const Container = atom(
  'iframe',
  {borderWidth: 0, width: '100%'},
  {seamless: true},
);

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
    if (element.extendsStyles) {
      throw new Error('Cannot extend styles on embed player');
    }
    const props: {src?: string; [prop: string]: any} = {
      ...element.props,
      ...extractProps(item, element.propPaths),
    };
    const theme =
      (props.themeOverride as keyof typeof PLAYER_HEIGHTS) ||
      (ctx.options && ctx.options.embedTheme) ||
      'minimal';
    if (theme !== 'minimal' && PLAYER_HEIGHTS.hasOwnProperty(theme)) {
      props.src = `${props.src || ''}?theme=${theme}`;
    }
    return (
      <Container
        {...props}
        height={PLAYER_HEIGHTS[theme]}
        item={item}
        style={expandElementStyles(
          {...style, ...element.styles},
          element.elementOptions || {},
        )}
      />
    );
  },
);
