import * as React from 'react';

import {CSS} from '@pinecast/styles';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import {extractProps} from './extractor';
import expandElementStyles from './globalElementOptions';

export default ({
  element,
  item,
  style = {},
}: {
  element: Element;
  item: Object;
  style: CSS;
}) => {
  const ImageContainer = atom(element.tagName || 'div');
  const props: {
    image?: string;
    position?: React.CSSProperties['backgroundPosition'];
    size?: React.CSSProperties['backgroundSize'];
  } = {
    ...element.props,
    ...extractProps(item, element.propPaths),
  } as any;
  const styles = expandElementStyles(
    {
      backgroundImage: `url(${props.image || ''})`,
      backgroundPosition: props.position || 'center',
      backgroundSize: props.size || 'cover',
      ...style,
      ...element.styles,
    },
    element.elementOptions,
  );
  return (
    <ImageContainer
      children={blockChildren(item, element)}
      extends={element.extendsStyles}
      item={item}
      style={styles}
    />
  );
};
