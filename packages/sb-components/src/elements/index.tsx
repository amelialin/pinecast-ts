import * as React from 'react';

import {CSS} from '@pinecast/styles';

import atom from './atom';
import {Element, ElementLayout, InlineElement} from '../primitives';

import BackgroundImage from './BackgroundImage';
import BlockLink from './BlockLink';
import BlockLogo from './BlockLogo';
import BlockText from './BlockText';
import EmbedPlayer from './EmbedPlayer';
import FixedWrapper from './FixedWrapper';
import HostRepeater from './pageHelpers/HostRepeater';
import Image from './Image';
import LayoutColumn from './LayoutColumn';
import LayoutRow from './LayoutRow';
import Mount from './Mount';
import NarrowScope from './functional/NarrowScope';

import ContactTable from './pageHelpers/ContactTable';

export function layoutElements(
  item: Object,
  elements: Array<Element | InlineElement>,
  style?: CSS,
  keyOffset: number = 0,
) {
  return elements.filter(x => x).map((element, i) => {
    let Element: React.ComponentType<{
      element: typeof element;
      item: typeof item;
      style?: CSS;
    }>;
    switch (element.type) {
      case 'block.link':
        Element = BlockLink;
        break;
      case 'block.logo':
        Element = BlockLogo;
        break;
      case 'block.player':
        Element = EmbedPlayer;
        break;
      case 'block.text':
        Element = BlockText;
        break;
      case 'func.narrowScope':
        Element = NarrowScope;
        break;
      case 'helper.page.contact':
        Element = ContactTable;
        break;
      case 'helper.page.hosts':
        Element = HostRepeater;
        break;
      case 'image':
        Element = Image;
        break;
      case 'image.background':
        Element = BackgroundImage;
        break;
      case 'layout.column':
        Element = LayoutColumn;
        break;
      case 'layout.row':
        Element = LayoutRow;
        break;
      case 'layout.fixedWrapper':
        Element = FixedWrapper;
        break;
      case 'mount':
        Element = Mount;
        break;
      default:
        throw new Error(`Unrecognized element name: ${element.type}`);
    }

    return (
      <Element
        key={i + keyOffset}
        element={element}
        item={item}
        style={style}
      />
    );
  });
}

export default function(
  key: any,
  item: Object,
  elementLayout: ElementLayout,
  style?: CSS,
): JSX.Element {
  const Wrapper = atom(elementLayout.tagName || 'div');
  return (
    <Wrapper
      children={layoutElements(item, elementLayout.elements)}
      key={key}
      style={{
        position: 'relative',
        ...style,
        ...elementLayout.styles,
      }}
    />
  );
}
