import * as React from 'react';

import {CSS} from '@pinecast/styles';

import atom from './atom';
import {Element, InlineElement} from '../primitives';
import {getsMount} from '../chrome/mounts';

export default getsMount(
  (
    {
      element,
      style,
    }: {element: Element | InlineElement; item: Object; style: CSS},
    {
      mounts,
    }: {mounts: {[key: string]: JSX.Element | Array<JSX.Element> | null}},
  ) => {
    if (element.extendsStyles) {
      throw new Error('Cannot extend styles on mount');
    }
    const mount = mounts[(element.props || {}).mount] || null;
    if (Array.isArray(mount)) {
      if (!style && !element.styles) {
        return <React.Fragment>{mount}</React.Fragment>;
      }
      const Div = atom('div');
      return <Div style={{...style, ...element.styles}}>{mount}</Div>;
    }
    return mount;
  },
);
