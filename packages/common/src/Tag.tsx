import * as React from 'react';

import {Children} from '@pinecast/common/types';
import DeleteButton from '@pinecast/common/DeleteButton';
import styled, {CSS} from '@pinecast/styles';

type Props = {
  $color: 'gray' | 'green' | 'blue' | 'red';
  $hasDeleteButton: boolean;
  $size: 'small' | 'medium' | 'large';
};

const bgColors: {[color: string]: string} = {
  gray: '#dee1df',
  green: '#8aeabf',
  blue: '#c9d9e0',
  red: '#FEDEDE',
};

const idleColors: {[color: string]: string} = {
  gray: '#44484d',
  green: '#146640',
  blue: '#32586e',
  red: '#BF1D1D',
};

const Tag_ = styled('span', ({$color, $hasDeleteButton, $size}: Props) => ({
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: bgColors[$color],
  borderRadius: '0.2em',
  color: idleColors[$color],
  display: 'inline-flex',
  flex: '0 0 0%',
  fontSize: $size === 'small' ? 11 : $size === 'medium' ? 13 : 16,
  fontWeight: 400,
  height: $size === 'small' ? 16 : $size === 'medium' ? 20 : 24,
  padding: $size === 'large' ? '0 6px' : '0 4px',
  paddingRight: $hasDeleteButton ? ($size === 'large' ? 2 : 1) : undefined,
  whiteSpace: 'nowrap',
}));

const DBLabel = styled('span', {
  display: 'inline-block',
});

type ExternalProps = {
  children: Children;
  color?: Props['$color'];
  deleteButton?: boolean;
  onDelete?: () => void;
  size?: Props['$size'];
  style?: CSS;
};

const Tag = (props: ExternalProps) => {
  if (props.deleteButton && !props.onDelete) {
    throw new Error('Created Tag with deleteButton but not onDelete');
  }
  const dbSize = props.size === 'small' ? 16 : 20;
  return (
    <Tag_
      $color={props.color || 'gray'}
      $hasDeleteButton={props.deleteButton || false}
      $size={props.size || 'medium'}
      style={props.style}
    >
      {props.deleteButton ? (
        <React.Fragment>
          <DBLabel>{props.children}</DBLabel>
          <DeleteButton
            idleColor={idleColors[props.color || 'gray']}
            onClick={props.onDelete as () => void}
            style={{
              alignSelf: 'center',
              height: dbSize,
              marginTop: 0,
              marginLeft: props.size === 'large' ? undefined : -2,
              width: dbSize,
            }}
          />
        </React.Fragment>
      ) : (
        props.children
      )}
    </Tag_>
  );
};

export default Tag;
