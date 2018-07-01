import * as React from 'react';

import Button from '@pinecast/common/Button';
import ModalLayer from '@pinecast/common/ModalLayer';
import styled from '@pinecast/styles';

const Wrapper = styled(
  'aside',
  {
    display: 'flex',
    justifyContent: 'center',
    margin: '-12px 0 -10px',
    position: 'relative',
    zIndex: 2,

    ':not(:hover) .Button-nativeButton': {
      opacity: 0,
      transition: 'opacity 0.2s',
    },
    ':not(:hover) .Button-nativeButton:focus': {
      opacity: 1,
    },
    ':hover .Button-nativeButton': {
      opacity: 1,
    },
  },
  {className: 'InsertionPoint--Wrapper'},
);

export default class InsertionPoint extends React.Component {
  props: {
    index: number;
    label: string;
    Modal: React.ComponentType<{
      index: number;
      onClose: () => void;
      onInsert: (index: number, tag: string) => void;
    }>;
    onInsert: (index: number, newTag: string) => void;
  };
  state: {isOpen: boolean} = {isOpen: false};

  handleClick = () => {
    this.setState({isOpen: true});
  };
  handleClose = () => {
    this.setState({isOpen: false});
  };

  render() {
    const {Modal} = this.props;
    return (
      <Wrapper>
        <Button onClick={this.handleClick} size="small">
          {this.props.label}
        </Button>
        <ModalLayer
          canEscape
          onClose={this.handleClose}
          open={this.state.isOpen}
        >
          <Modal
            index={this.props.index}
            onClose={this.handleClose}
            onInsert={this.props.onInsert}
          />
        </ModalLayer>
      </Wrapper>
    );
  }
}
