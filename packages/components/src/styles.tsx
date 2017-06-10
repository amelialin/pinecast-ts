import * as React from 'react';
import {styled} from 'styletron-react';


// This is a hack to disable Styletron's built-in autoprefixing.
declare function require(name:string);
const su = require('styletron-utils');
su.injectStylePrefixed = (styletron, styles, media, pseudo) => {
    return su.injectStyle(styletron, styles, media, pseudo);
};


export default function(
    elemType: string,
    props?: React.CSSProperties | ((props: any, ctx?: any) => (React.CSSProperties)) | null,
    defaultProps?: React.HTMLProps<any>
): React.StatelessComponent<any> {
    let StyledComponent;
    if (!props) {
        StyledComponent = styled(elemType, ({_style}) => _style);
    } else if (typeof props === 'object') {
        StyledComponent = styled(elemType, ({_style}) => ({...props, ..._style}));
    } else {
        StyledComponent = styled(elemType, ({_style, ...rest}) => ({...props(rest), ..._style}));
    }
    return wrapStyledComponent(StyledComponent, defaultProps);
};

function wrapStyledComponent(StyledComponent, defaultProps): React.StatelessComponent<any> {
    return ({style, ...innerProps}) => <StyledComponent _style={style} {...innerProps} {...defaultProps} />;
}
