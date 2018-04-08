import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {Children} from './types';

const Wrapper = styled('div', {
  display: 'inline-flex',
});

function collapseChildren(
  spacing: number,
  children: Children,
  style: CSS | undefined,
  offset: number,
) {
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
  children,
  spacing,
  style,
}: {
  children: Children;
  spacing: number;
  style?: React.CSSProperties;
}) => <Wrapper>{collapseChildren(spacing, children, style, 0)}</Wrapper>;

export default Group;