import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {Children} from './types';

const Wrapper = styled('div', {
  alignItems: 'inherit',
  display: 'inline-flex',
});

function collapseChildren(
  spacing: number,
  children: React.ReactNode,
  style: CSS | undefined,
  offset: number,
): React.ReactNode {
  if (!children) {
    return children;
  }
  return React.Children.map(
    Array.isArray(children) ? children.filter(x => x) : children,
    (child: any, i) => {
      if (i + offset === 0) {
        if (style) {
          return React.cloneElement(child, {
            style: {...style, ...child.props.style},
          });
        } else {
          return child;
        }
      }
      if (child.type === React.Fragment) {
        return collapseChildren(spacing, child.props.children, style, i);
      }
      return React.cloneElement(child, {
        style: {
          ...style,
          ...child.props.style,
          marginLeft: spacing,
        },
      });
    },
  );
}

const Group = ({
  allowWrap,
  children,
  spacing,
  style,
  wrapperStyle,
}: {
  allowWrap?: boolean;
  children: Children;
  spacing: number;
  style?: CSS;
  wrapperStyle?: CSS;
}) => (
  <Wrapper style={{flexWrap: allowWrap ? 'wrap' : undefined, ...wrapperStyle}}>
    {collapseChildren(spacing, children as any, style, 0)}
  </Wrapper>
);

export default Group;
