import * as React from 'react';
import * as ReactDOM from 'react-dom';

import styled from '@pinecast/sb-styles';

const Wash = styled('div', {
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  left: 0,
  position: 'fixed',
  top: 0,
  width: '100vw',
  zIndex: 100,
});
const Container = styled('div', {
  flex: '0 0 100%',
  maxHeight: '100%',
  overflowY: 'auto',
  padding: 20,
});

export default class ModalLayer extends React.PureComponent {
  props: {
    canEscape?: boolean;
    children: JSX.Element | Array<JSX.Element>;
    open: boolean;
    onClose: () => void;
  };
  portal: HTMLDivElement;

  static defaultProps = {
    canEscape: true,
  };

  constructor(props) {
    super(props);
    const portal = document.createElement('div');
    this.portal = portal;
    document.body.appendChild(portal);
  }

  escListener = (e: KeyboardEvent) => {
    if (!this.props.open) {
      return;
    }
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
    document.body.removeChild(this.portal);
  }

  handleContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  render() {
    const {children, open} = this.props;
    if (!open) {
      return null;
    }
    return ReactDOM.createPortal(
      <Wash onClick={this.handleClose}>
        <Container onClick={this.handleContentClick}>{children}</Container>
      </Wash>,
      this.portal,
    );
  }
}
