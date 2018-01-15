import * as React from 'react';

import {CSS} from '@pinecast/sb-styles';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';

export default ({
  element,
  item,
  style = {},
}: {
  element: Element;
  item: Object;
  style: CSS;
}) => {
  if (element.extendsStyles) {
    throw new Error('Cannot extend styles on layout elements');
  }
  const Container = atom(element.tagName || 'div');
  return (
    <Container
      {...element.props}
      {...extractProps(item, element.propPaths)}
      children={blockChildren(item, element)}
      item={item}
      style={{
        ...expandElementStyles(
          {...style, ...element.styles},
          element.elementOptions || {},
        ),
        display: 'flex',
        flexDirection: 'row',
      }}
    />
  );
};
