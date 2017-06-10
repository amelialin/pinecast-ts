import * as React from 'react';

import Grid from './grid';
import Stacked from './stacked';

import {LayoutConfig} from '../primitives';


export default function<T>(layouts: Array<LayoutConfig>, renderer: (item: T, style: Object) => JSX.Element) {
    return layouts.map((layout, i) => {
        let Component;
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

        return <Component key={i} config={layout}>
            {renderer}
        </Component>;
    });
};
