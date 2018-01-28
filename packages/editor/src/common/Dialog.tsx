import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Wrapper = styled('div', ({$size}) => ({
  backgroundColor: '#fff',
  borderRadius: 3,
  boxShadow:
    'rgba(0, 0, 0, 0.2) 0px 3px 12px, rgba(0, 0, 0, 0.2) 0px 10px 20px',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: $size === 'small' ? 400 : $size === 'medium' ? 625 : 850,
  minWidth: $size === 'small' ? 350 : $size === 'medium' ? 550 : 650,
  overflow: 'hidden',
  textAlign: 'left',
}));
const Header = styled('header', {
  alignItems: 'center',
  borderBottom: '1px solid #eee',
  display: 'flex',
  fontSize: 15,
  fontWeight: 500,
  height: 46,
  padding: '0 15px',
});
const Body = styled('section', {
  backgroundColor: '#f5f5f5',
  fontSize: 13,
  padding: 15,
});
const Footer = styled('footer', {
  alignItems: 'center',
  backgroundColor: '#fff',
  display: 'flex',
  height: 46,
  justifyContent: 'flex-end',
  padding: '0 15px',
  textAlign: 'right',
});

// const Dialog = ({
//   actions,
//   children,
//   title,
// }: {
//   actions?: JSX.Element | Array<JSX.Element> | string | null;
//   children: JSX.Element | Array<JSX.Element> | string | null;
//   title: string;
// }) => {
//   if (!open) {
//     return null;
//   }

//   let actionWrapper: JSX.Element | null = null;
//   if (actions) {
//     actionWrapper = <Footer>{actions}</Footer>;
//   }

//   return (
//     <Wrapper role="dialog">
//       <Header>{title}</Header>
//       <Body>{children}</Body>
//       {actionWrapper}
//     </Wrapper>
//   );
// };

// export default Dialog;

export default class Dialog extends React.PureComponent {
  props: {
    actions?: JSX.Element | Array<JSX.Element> | string | null;
    children: JSX.Element | Array<JSX.Element> | string | null;
    size?: 'small' | 'medium' | 'large';
    title: string;
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
        <Body>{children}</Body>
        {actionWrapper}
      </Wrapper>
    );
  }
}
