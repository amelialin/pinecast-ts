import * as React from 'react';

import {CSS} from '@pinecast/styles';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';

const Link = atom('a');

export default ({
  element,
  item,
  style,
}: {
  element: Element;
  item: Object;
  style: CSS;
}) => {
  const props = {...element.props, ...extractProps(item, element.propPaths)};
  return (
    <Link
      {...props}
      baseStyle={{
        display: 'block',
        color: 'links',
        textDecoration: 'none',
      }}
      data-link="true"
      extends={element.extendsStyles}
      item={item}
      style={expandElementStyles(
        {...style, ...element.styles},
        element.elementOptions,
      )}
    >
      {blockChildren(item, element)}
    </Link>
  );
};
