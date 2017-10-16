import * as React from 'react';

import atom from './atom';
import {Element} from '../primitives';
import {getsMount} from '../chrome/mounts';

export default getsMount(
  (
    {element, styles}: {element: Element; styles?: React.CSSProperties},
    {
      mounts,
    }: {mounts: {[key: string]: JSX.Element | Array<JSX.Element> | null}},
  ) => {
    const mount = mounts[element.props.mount] || null;
    if (Array.isArray(mount)) {
      const Div = atom('div');
      return <Div style={{...styles, ...element.styles}}>{mount}</Div>;
    }
    return mount;
  },
);
