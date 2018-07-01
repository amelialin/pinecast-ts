import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Dialog from '@pinecast/common/Dialog';

import LayoutPicker from './LayoutPicker';

export default class LayoutInsertionModal extends React.Component {
  props: {
    index: number;
    onClose: () => void;
    onInsert: (index: number, newTag: string) => void;
  };
  state: {selectedTag: string} = {selectedTag: 'grid.minimal'};

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
        title="Insert new episode layout"
      >
        <LayoutPicker
          onSelect={this.handleChangeType}
          selection={this.state.selectedTag}
        />
      </Dialog>
    );
  }
}
