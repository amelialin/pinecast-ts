import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Dialog from '@pinecast/common/Dialog';
import Form from '@pinecast/common/Form';
import Label from '@pinecast/common/Label';
import TextArea from '@pinecast/common/TextArea';
import TextInput from '@pinecast/common/TextInput';

export default class NewLinkForm extends React.PureComponent {
  props: {
    onCancel: () => void;
    onNewTag: (name: string, description: string) => void;
  };

  state: {
    name: string;
    description: string;
  } = {name: '', description: ''};

  handleCreateSubmit = () => {
    const {name, description} = this.state;
    if (!name.trim() || !description) {
      return;
    }

    this.props.onNewTag(name, description);
  };

  handleNameChange = (value: string) => {
    this.setState({name: value});
  };
  handleDescriptionChange = (value: string) => {
    this.setState({description: value});
  };

  render() {
    const {description, name} = this.state;
    return (
      <Form action="" onSubmit={this.handleCreateSubmit}>
        <Dialog
          actions={
            <ButtonGroup>
              <Button onClick={this.props.onCancel}>Cancel</Button>
              <Button $isPrimary onClick={this.handleCreateSubmit}>
                Create
              </Button>
            </ButtonGroup>
          }
          title="New tag"
        >
          <Label text="Tag name">
            <TextInput
              maxLength={250}
              name="name"
              onChange={this.handleNameChange}
              placeholder="Pre-roll"
              required
              value={name}
            />
          </Label>
          <Label text="Description">
            <TextArea
              onChange={this.handleDescriptionChange}
              placeholder="Ads with this tag go at the start of episodes"
              value={description}
            />
          </Label>
        </Dialog>
      </Form>
    );
  }
}
