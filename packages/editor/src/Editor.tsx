import PropTypes from 'prop-types';
import React from 'react';
import {compose, withContext, withState} from 'recompose';

import {Context} from './types';
import {contextPropTypes} from './getsContext';
import OptionsPanel from './OptionsPanel';
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
    <div>
        <Toolbar />
        <div style={{display: 'flex', height: 'calc(100% - 50px)'}}>
            <OptionsPanel />
        </div>
    </div>
);
