import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import {componentsMetadata} from '@pinecast/sb-presets';
import Dialog from '@pinecast/common/Dialog';
import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';

import {MetadataType} from './types';

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
            autoFocus
            onChange={this.handleChangeType}
            options={Object.entries(componentsMetadata as {
              [key: string]: MetadataType;
            }).reduce(
              (acc, [key, value]) => {
                acc[key] = value.name;
                return acc;
              },
              {} as {[key: string]: string},
            )}
            value={this.state.selectedTag}
          />
        </Label>
      </Dialog>
    );
  }
}
