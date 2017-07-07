import {CSSProperties} from 'react';

export default function(acc: CSSProperties, elementOptions: {[option: string]: string | number}): CSSProperties {
    if (!elementOptions) {
        return acc;
    }
    return Object.keys(elementOptions).reduce((acc, cur) => {
        const value = elementOptions[cur];
        switch (cur) {
            case 'alignX':
                switch (value) {
                    case 'left':
                        acc.marginLeft = 'auto';
                        break;
                    case 'center':
                        acc.marginLeft = 'auto';
                        acc.marginRight = 'auto';
                        break;
                    case 'left':
                        acc.marginRight = 'auto';
                        break;
                }
                break;
            case 'innerAlignX':
                switch (value) {
                    case 'left':
                        if (acc.flexDirection === 'column') {
                            acc.justifyContent = 'flex-start';
                        } else {
                            acc.alignItems = 'flex-start';
                        }
                        acc.textAlign = 'left';
                        break;
                    case 'center':
                        if (acc.flexDirection === 'column') {
                            acc.justifyContent = 'center';
                        } else {
                            acc.alignItems = 'center';
                        }
                        acc.textAlign = 'center';
                        break;
                    case 'right':
                        if (acc.flexDirection === 'column') {
                            acc.justifyContent = 'flex-end';
                        } else {
                            acc.alignItems = 'flex-end';
                        }
                        acc.textAlign = 'right';
                        break;
                }
                break;
            case 'underlineOnHover':
                acc[':hover'] = {
                    ...acc[':hover'],
                    textDecoration: 'underline',
                };
        }
        return acc;
    }, acc);
};
