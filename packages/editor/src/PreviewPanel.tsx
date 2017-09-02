import React from 'react';

import {getsContext} from './getsContext';
import PreviewController from './preview/controller';
import PreviewRenderer from './preview/renderer';

export default getsContext(({setState, state}) =>
    <div style={{
        flex: '1 1',
        height: '100%',
    }}>
        <PreviewController>
            <PreviewRenderer />
        </PreviewController>
    </div>
);
