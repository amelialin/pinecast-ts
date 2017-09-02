import PropTypes from 'prop-types';
import React from 'react';
import {compose, withContext, withState} from 'recompose';

import {Context} from './types';
import {contextPropTypes} from './getsContext';
import OptionsPanel from './OptionsPanel';
import PreviewPanel from './PreviewPanel';
import Toolbar from './Toolbar';


const initialState: Context = {
    page: 'presets',
};

export default compose(
    withState('state', 'setState', initialState),
    withContext(
        contextPropTypes,
        ({state, setState}) => ({
            state,
            setState: (data, cb) => setState({...state, ...data}, cb),
        })
    )
)(() =>
    <div style={{height: '100%'}}>
        <Toolbar />
        <div style={{display: 'flex', height: 'calc(100% - 50px)'}}>
            <OptionsPanel />
            <PreviewPanel />
        </div>
    </div>
);
