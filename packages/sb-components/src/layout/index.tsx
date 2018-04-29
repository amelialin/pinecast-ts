import * as React from 'react';

import renderElementLayout from '../elements';

import Grid from './grid';
import Stacked from './stacked';

import {CSS} from '@pinecast/styles';
import {LayoutConfig} from '../primitives';

export default function<T>(layouts: Array<LayoutConfig>): Array<JSX.Element> {
  return layouts.map((layout, i) => {
    let Component: React.ComponentType<{
      children: (idx: number, item: Object, style: CSS) => JSX.Element;
      config: LayoutConfig;
    }>;
    switch (layout.type) {
      case 'stacked':
        Component = Stacked;
        break;
      case 'grid':
        Component = Grid;
        break;
      default:
        throw new Error(`Unrecognized layout name: ${layout.type}`);
    }

    return (
      <Component key={i} config={layout}>
        {(i, item, style) =>
          renderElementLayout(i, item, layout.elementLayout, style)
        }
      </Component>
    );
  });
}
