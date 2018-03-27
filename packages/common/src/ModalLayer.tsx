import * as React from 'react';
import * as ReactDOM from 'react-dom';

import styled from '@pinecast/styles';

import Layer, {ClosableLayer} from './Layer';

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
  padding: '15vh 20px',
  width: '100%',
});

type SharedProps = {
  canEscape?: boolean;
};

export default class ModalLayer extends React.Component {
  props: {
    children: JSX.Element | Array<JSX.Element>;
    open: boolean;
    onClose: () => void;
  } & SharedProps;

  static defaultProps = {
    canEscape: true,
  };

  handleClose = () => {
    if (!this.props.canEscape) {
      return;
    }
    this.props.onClose();
  };
  eatClick = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  render() {
    const {children, open} = this.props;
    if (!open) {
      return null;
    }
    const inner = (
      <Wash onClick={this.handleClose}>
        <Container onClick={this.eatClick}>{children}</Container>
      </Wash>
    );
    if (this.props.canEscape) {
      return <ClosableLayer onClose={this.handleClose}>{inner}</ClosableLayer>;
    }
    return <Layer>{inner}</Layer>;
  }
}

export class ModalOpener extends React.Component {
  props: SharedProps & {
    children: (renderPropArgs: {handleOpen: () => void}) => JSX.Element;
    renderModal: (renderPropArgs: {handleClose: () => void}) => JSX.Element;
  };
  state: {isOpen: boolean} = {isOpen: false};

  handleOpen = () => this.setState({isOpen: true});
  handleClose = () => this.setState({isOpen: false});

  render() {
    const {
      props: {children, renderModal, ...rest},
      state: {isOpen},
      handleOpen,
      handleClose,
    } = this;

    return (
      <React.Fragment>
        {children({handleOpen})}
        <ModalLayer {...rest} onClose={handleClose} open={isOpen}>
          {(isOpen && renderModal({handleClose})) || <div />}
        </ModalLayer>
      </React.Fragment>
    );
  }
}
