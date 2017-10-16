import {Provider} from 'react-redux';
import React from 'react';

import OptionsPanel from './OptionsPanel';
import PreviewPanel from './PreviewPanel';
import {store} from './reducer';
import Toolbar from './Toolbar';


const App = () =>
    <Provider store={store}>
        <div style={{height: '100%'}}>
            <Toolbar />
            <div style={{display: 'flex', height: 'calc(100% - 50px)'}}>
                <OptionsPanel />
                <PreviewPanel />
            </div>
        </div>
    </Provider>;

export default App;
