import * as React from 'react';

import styled from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const Wrapper = styled(
  'div',
  ({$size}: {$size: 'small' | 'medium' | 'large'}) => ({
    backgroundColor: '#fff',
    borderRadius: 3,
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 3px 12px, rgba(0, 0, 0, 0.2) 0px 10px 20px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: DEFAULT_FONT,
    margin: '0 auto',
    maxWidth: $size === 'small' ? 400 : $size === 'medium' ? 625 : 850,
    // minWidth: $size === 'small' ? 350 : $size === 'medium' ? 550 : 650,
    overflow: 'hidden',
    textAlign: 'left',
    width: '100%',
  }),
);
const Header = styled('header', {
  alignItems: 'center',
  borderBottom: '1px solid #eeefea',
  display: 'flex',
  fontSize: 15,
  fontWeight: 500,
  height: 46,
  padding: '0 15px',
});
const Body = styled(
  'section',
  ({$size}: {$size: 'small' | 'medium' | 'large'}) => ({
    backgroundColor: '#f5f5f5',
    fontSize: 13,
    minHeight: $size === 'small' ? 80 : $size === 'medium' ? 120 : 240,
    padding: 15,
  }),
);
const Footer = styled('footer', {
  alignItems: 'center',
  backgroundColor: '#fff',
  display: 'flex',
  height: 46,
  justifyContent: 'flex-end',
  padding: '0 15px',
  textAlign: 'right',
});

export default class Dialog extends React.PureComponent {
  props: {
    actions?: React.ReactNode;
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    title: JSX.Element | string;
  };

  render() {
    const {actions, children, size, title} = this.props;

    if (!open) {
      return null;
    }

    let actionWrapper: JSX.Element | null = null;
    if (actions) {
      actionWrapper = <Footer>{actions}</Footer>;
    }

    return (
      <Wrapper role="dialog" $size={size || 'medium'}>
        <Header>{title}</Header>
        <Body $size={size || 'medium'}>{children}</Body>
        {actionWrapper}
      </Wrapper>
    );
  }
}
