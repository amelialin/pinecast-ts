import * as React from 'react';

import {Omit} from '@pinecast/common/types';
import styled, {CSS} from '@pinecast/styles';

type AnchorProps = Omit<
  React.AllHTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick' | 'style' | 'target'
>;

type LinkProps = AnchorProps & {
  href: string;
  style?: CSS;
  target?: '_blank';
};

type ButtonProps = AnchorProps & {
  onClick: () => void;
};

const styles = {
  color: '#4e7287',

  ':hover': {
    color: '#708d9e',
    textDecoration: 'underline',
  },
  ':visited': {
    color: '#7f8486',
  },
  ':hover:visited': {
    color: '#708d9e',
  },
};
const Link = styled('a', styles);
const AnchorLink = Link as React.ComponentType<LinkProps>;

class LinkButton extends React.PureComponent {
  props: ButtonProps;
  handleClick = (e: React.SyntheticEvent<MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick();
  };
  render() {
    return <Link {...this.props} onClick={this.handleClick} />;
  }
}

export default (props: LinkProps | ButtonProps) => {
  if (props.hasOwnProperty('href')) {
    return <AnchorLink {...props as LinkProps} />;
  }
  return <LinkButton {...props as ButtonProps} />;
};
