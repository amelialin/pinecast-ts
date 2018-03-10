import * as React from 'react';

import {componentsMetadata} from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import Button, {ButtonGroup} from '../../common/Button';
import Dialog from '../../common/Dialog';
import Label from '../../common/Label';
import {MetadataType} from './types';
import ModalLayer from '../../common/ModalLayer';
import ModuleInsertionModal from './ModuleInsertionModal';
import Select from '../../common/Select';

const Wrapper = styled(
  'aside',
  {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '-12px -4px -10px 0',
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
          Add
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
