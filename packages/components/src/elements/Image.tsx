import * as md5 from 'md5';
import * as React from 'react';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import {extractPath, extractProps} from './extractor';
import expandElementStyles from './globalElementOptions';
import styled from '../styles';


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
    }
    if (element.elementOptions && element.elementOptions.round) {
        styles.borderRadius = element.elementOptions.round;
        styles.overflow = 'hidden';
    }
    if (element.elementOptions.square === 'element') {
        const SquareDiv = atom('div');
        return <SquareDiv style={{...styles, ...squareStyle}}>
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
                backgroundImage: props.src,
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
