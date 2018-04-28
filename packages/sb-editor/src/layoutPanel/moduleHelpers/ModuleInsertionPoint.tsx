import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import {componentsMetadata} from '@pinecast/sb-presets';
import Dialog from '@pinecast/common/Dialog';
import Label from '@pinecast/common/Label';
import ModalLayer from '@pinecast/common/ModalLayer';
import Select from '@pinecast/common/Select';
import styled from '@pinecast/styles';

import {MetadataType} from './types';
import ModuleInsertionModal from './ModuleInsertionModal';

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
  {className: 'ModuleInsertionPoint--Wrapper'},
);

export default class ModuleInsertionPoint extends React.Component {
  props: {
    index: number;
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
    return (
      <Wrapper>
        <Button onClick={this.handleClick} size="small">
          Add module
        </Button>
        <ModalLayer
          canEscape
          onClose={this.handleClose}
          open={this.state.isOpen}
        >
          <ModuleInsertionModal
            index={this.props.index}
            onClose={this.handleClose}
            onInsert={this.props.onInsert}
          />
        </ModalLayer>
      </Wrapper>
    );
  }
}
