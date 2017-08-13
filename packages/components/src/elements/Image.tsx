import * as md5 from 'md5';
import * as React from 'react';

import atom from './atom';
import {Element} from '../primitives';
import {extractPath, extractProps} from './extractor';
import expandElementStyles from './globalElementOptions';


const Image = atom('img');

const squareStyle = {
    position: 'relative',
    ':after': {
        content: '""',
        display: 'block',
        paddingBottom: '100%',
    },
};


export default (
    {element, item, style = {}}: {element: Element, item: Object, style: Object}
) => {
    const props = {
        ...element.props,
        ...extractProps(item, element.propPaths),
    };
    const styles = expandElementStyles({...style, ...element.styles}, element.elementOptions);
    if (element.elementOptions && element.elementOptions.gravatar) {
        const email = element.elementOptions.gravatar;
        const hash = md5(typeof email === 'string' ? email : extractPath(item, email));
        props.src = `https://www.gravatar.com/avatar/${hash}?s=${parseFloat(styles.width) || parseFloat(styles.height) || 256}`;
    } else  {
        const [, key] = /^https:\/\/pinecast\-storage\.s3\.amazonaws\.com\/(.*)$/.exec(props.src) || [null, null];
        if (key && styles.height && styles.width) {
            props.src = `https://thumb.service.pinecast.com/resize?h=${encodeURIComponent(styles.height)}&w=${encodeURIComponent(styles.width)}&key=${encodeURIComponent(key)}&format=jpeg`;
        }
    }
    if (element.elementOptions && element.elementOptions.round) {
        styles.borderRadius = element.elementOptions.round;
        styles.overflow = 'hidden';
    }
    if (element.elementOptions.square === 'element') {
        const SquareDiv = atom('div');
        styles.position = styles.position || squareStyle.position as any;
        styles[':after'] = squareStyle[':after'];
        return <SquareDiv style={styles}>
            <Image
                {...props}
                style={{
                    display: 'block',
                    height: '100%',
                    left: 0,
                    position: 'absolute',
                    width: '100%',
                }}
            />
        </SquareDiv>;
    } else if (element.elementOptions.square === 'background') {
        const SquareDiv = atom('div');
        return <SquareDiv
            aria-label={props.alt}
            role='img'
            style={{
                ...styles,
                backgroundImage: `url(${props.src})`,
                backgroundSize: 'cover',
            }}
        />;
    } else {
        return <Image
            {...props}
            style={{
                display: 'block',
                ...styles,
                ...element.styles,
            }}
        />;
    }
};
