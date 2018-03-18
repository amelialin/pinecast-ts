import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

const Wrapper = styled('div', {
  display: 'inline-flex',
});

export type Children = Array<
  Array<JSX.Element | false | null> | JSX.Element | false | null
>;
function collapseChildren(
  spacing: number,
  children: Children,
  style: CSS | undefined,
  offset: number,
) {
  return React.Children.map(children.filter(x => x), (child: any, i) => {
    if (i + offset === 0) {
      if (style) {
        return React.cloneElement(child, {style});
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
  });
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
