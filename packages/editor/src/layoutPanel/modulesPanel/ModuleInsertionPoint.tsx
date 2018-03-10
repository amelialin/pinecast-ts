import * as React from 'react';

import {componentsMetadata} from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import Button, {ButtonGroup} from '../../common/Button';
import Dialog from '../../common/Dialog';
import Label from '../../common/Label';
import {MetadataType} from './types';
import ModalLayer from '../../common/ModalLayer';
import Select from '../../common/Select';

const Wrapper = styled('aside', {
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '-16px -4px -16px 0',
  position: 'relative',
  zIndex: 2,
});

export default class ModuleInsertionPoint extends React.Component {
  props: {
    index: number;
    onInsert: (index: number, newTag: string) => void;
  };
  state: {
    isOpen: boolean;
    selectedTag: string;
  } = {isOpen: false, selectedTag: 'header.centeredFixed'};

  handleClick = () => {
    this.setState({isOpen: true});
  };
  handleChangeType = (newType: string) => {
    this.setState({selectedTag: newType});
  };
  handleInsert = () => {
    this.handleClose();
    this.props.onInsert(this.props.index, this.state.selectedTag);
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
          <Dialog
            actions={
              <ButtonGroup>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button $isPrimary onClick={this.handleInsert}>
                  Insert
                </Button>
              </ButtonGroup>
            }
            size="small"
            title="Insert new module"
          >
            <Label
              text="What type of module should we insert?"
              subText="Different types of modules have different properties."
            >
              <Select
                onChange={this.handleChangeType}
                options={Object.entries(componentsMetadata as {
                  [key: string]: MetadataType;
                }).reduce((acc, [key, value]) => {
                  acc[key] = value.name;
                  return acc;
                }, {})}
                value={this.state.selectedTag}
              />
            </Label>
          </Dialog>
        </ModalLayer>
      </Wrapper>
    );
  }
}
