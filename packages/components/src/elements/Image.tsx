import * as md5 from 'md5';
import * as React from 'react';

import {CSS} from '@pinecast/sb-styles';

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

export default ({
  element,
  item,
  style = {},
}: {
  element: Element;
  item: Object;
  style: CSS;
}) => {
  if (element.extendsStyles) {
    throw new Error('Cannot extend styles on image');
  }
  const props: {src?: string; alt?: string; [prop: string]: any} = {
    ...element.props,
    ...extractProps(item, element.propPaths),
  };
  const styles = expandElementStyles(
    {...style, ...element.styles},
    element.elementOptions || {},
  );
  const eo = element.elementOptions || {};
  if (eo.gravatar) {
    let email = eo.gravatar;
    if (Array.isArray(email) && typeof email[0] === 'string') {
      email = email[0];
    }
    const hash = md5(
      typeof email === 'string' ? email : extractPath(item, email),
    );
    props.src = `https://www.gravatar.com/avatar/${hash}?s=${parseFloat(
      styles.width,
    ) ||
      parseFloat(styles.height) ||
      256}`;
  } else {
    const [
      ,
      key,
    ] = /^https:\/\/pinecast\-storage\.s3\.amazonaws\.com\/(.*)$/.exec(
      props.src || '',
    ) || [null, null];
    if (key && (styles.height || styles.width)) {
      let height = styles.height || styles.width;
      let width = styles.width || styles.height;
      if (typeof height === 'string') {
        height = width;
      } else if (typeof width === 'string') {
        width = height;
      }
      if (eo.square) {
        height = width = Math.min(height, width);
      }
      height *= 2;
      width *= 2;
      props.src = `https://thumb.service.pinecast.com/resize?h=${encodeURIComponent(
        height,
      )}&w=${encodeURIComponent(width)}&key=${encodeURIComponent(
        key,
      )}&format=jpeg`;
    }
  }
  if (eo && eo.round) {
    styles.borderRadius = eo.round;
    styles.overflow = 'hidden';
  }
  if (eo.square === 'element') {
    const SquareDiv = atom('div');
    styles.position = styles.position || (squareStyle.position as any);
    styles[':after'] = squareStyle[':after'];
    return (
      <SquareDiv style={styles}>
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
      </SquareDiv>
    );
  } else if (eo.square === 'background') {
    const SquareDiv = atom('div');
    return (
      <SquareDiv
        aria-label={props.alt || ''}
        role="img"
        style={{
          ...styles,
          backgroundImage: `url(${props.src || ''})`,
          backgroundSize: 'cover',
        }}
      />
    );
  } else {
    return (
      <Image
        {...props}
        style={{
          display: 'block',
          ...styles,
          ...element.styles,
        }}
      />
    );
  }
};
