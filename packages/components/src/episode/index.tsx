import * as React from 'react';

import Tile from './Tile';

import {Episode, EpisodeStyle} from '../primitives';
import {ItemSourceContext} from '../itemSourceContext';


export default function<T>(item: Episode, episodeStyle: EpisodeStyle): JSX.Element {
    let Component;
    switch (episodeStyle.type) {
        case 'tile':
            Component = Tile;
            break;
        case 'card':
            Component = null;
            break;
    }
    return <Component item={item} config={episodeStyle} />;
};
