import * as React from 'react';

import {Episode, EpisodeStyle} from '../primitives';


export default function(
    {config, item}: {config: EpisodeStyle, item: Episode}
) {
    return <div>
        {item.title}
    </div>;
};
