import PropTypes from 'prop-types';

import {getContext as recomposeGetsContext} from 'recompose';


export const contextPropTypes = {
    state: PropTypes.object,
    setState: PropTypes.func,
    setStateKey: PropTypes.func,
};


export const getsContext = comp => recomposeGetsContext(contextPropTypes)(comp);
