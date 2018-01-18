import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Wash = styled('div', {
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  left: 0,
  position: 'fixed',
  top: 0,
  width: '100vw',
  zIndex: 100,
});
const Container = styled('div', {
  flex: '0 0',
});

export default class ModalLayer extends React.PureComponent {
  props: {
    canEscape?: boolean;
    children: JSX.Element | Array<JSX.Element>;
    open: boolean;
    onClose: () => void;
  };

  static defaultProps = {
    canEscape: true,
  };

  escListener = (e: KeyboardEvent) => {
    if (e.keyCode !== 27) {
      // ESC
      return;
    }
    this.handleClose();
  };
  handleClose = () => {
    if (!this.props.canEscape) {
      return;
    }

    this.props.onClose();
  };

  componentDidMount() {
    window.addEventListener('keyup', this.escListener);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.escListener);
  }

  handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  render() {
    const {children, open} = this.props;
    if (!open) {
      return null;
    }
    return (
      <Wash onClick={this.handleClose}>
        <Container onClick={this.handleContentClick}>{children}</Container>
      </Wash>
    );
  }
}