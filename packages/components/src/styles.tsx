import * as React from 'react';
import {styled} from 'styletron-react';

import {getsContext} from './componentContext';


export default function(
    elemType: string,
    props: React.CSSProperties | ((props: any, ctx?: any) => (React.CSSProperties)) | null = null,
    defaultProps?: React.HTMLProps<any>
): React.StatelessComponent<any> {
    let StyledComponent;
    if (typeof props === 'object') {
        StyledComponent = /*getsContext*/(styled(elemType, ({_style}) => ({...props, ..._style})));
    } else {
        StyledComponent = /*getsContext*/(styled(elemType, ({_style, ...rest}) => ({...props(rest), ..._style})));
    }
    return wrapStyledComponent(StyledComponent, defaultProps);
};

function wrapStyledComponent(StyledComponent, defaultProps): React.StatelessComponent<any> {
    return ({style: _style, ...innerProps}) => <StyledComponent _style={_style} {...innerProps} {...defaultProps} />;
}
