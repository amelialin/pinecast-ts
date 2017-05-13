import * as React from 'react';
import * as PropTypes from 'prop-types';

import {ComponentContext} from '@pinecast/sb-components/dist';


interface Props {
    children?: any,
    ctx: ComponentContext,
}

export default class ContextProvider extends React.PureComponent<Props, any> {
    static childContextTypes = {
        ctx: PropTypes.object,
    };

    getChildContext() {
        return {
            ctx: this.props.ctx,
        };
    }

    render() {
        return this.props.children;
    }
};
