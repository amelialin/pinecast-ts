import * as React from 'react';

import {ComponentContext, getsContext} from '../componentContext';
import {Image} from '../primitives';


export default getsContext(
    (props: Image & {style?: Object}, {ctx}: {ctx: ComponentContext}) =>
        <img
            alt={props.alt || ''}
            src={ctx.resources[props.resourceId]}
            style={{
                ...(
                    !props.dimensions ? null : {width: props.dimensions[0], height: props.dimensions[1]}
                ),
                ...props.style,
            }}
        />
);
