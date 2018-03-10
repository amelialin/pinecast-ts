import * as React from 'react';

import {componentsMetadata} from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import Button, {ButtonGroup} from '../../common/Button';
import Dialog from '../../common/Dialog';
import Label from '../../common/Label';
import {MetadataType} from './types';
import Select from '../../common/Select';

export default class ModuleInsertionModal extends React.Component {
  props: {
    index: number;
    onClose: () => void;
    onInsert: (index: number, newTag: string) => void;
  };
  state: {selectedTag: string} = {selectedTag: 'header.centeredFixed'};

  handleChangeType = (newType: string) => {
    this.setState({selectedTag: newType});
  };
  handleInsert = () => {
    this.props.onInsert(this.props.index, this.state.selectedTag);
    this.props.onClose();
  };

  render() {
    return (
      <Dialog
        actions={
          <ButtonGroup>
            <Button onClick={this.props.onClose}>Cancel</Button>
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
    );
  }
}
