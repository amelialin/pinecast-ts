import * as React from 'react';

import Button from '@pinecast/common/Button';
import Fieldset from '@pinecast/common/Fieldset';
import Form from '@pinecast/common/Form';
import Label from '@pinecast/common/Label';
import TextInput from '@pinecast/common/TextInput';

export default class NewLinkForm extends React.PureComponent {
  props: {
    onNewLink: (title: string, url: string) => void;
  };

  state: {
    title: string;
    url: string;
  } = {title: '', url: ''};

  handleCreateSubmit = () => {
    const {title, url} = this.state;
    if (
      !title ||
      !url ||
      !(url.startsWith('http://') || url.startsWith('https://'))
    ) {
      return;
    }

    this.props.onNewLink(title, url);
    this.setState({title: '', url: ''});
  };

  handleTitleChange = (value: string) => {
    this.setState({title: value});
  };
  handleURLChange = (value: string) => {
    this.setState({url: value});
  };

  render() {
    const {url} = this.state;
    const urlInvalid =
      url.length > 5 &&
      !(url.startsWith('http://') || url.startsWith('https://'));
    return (
      <Form onSubmit={this.handleCreateSubmit} style={{marginBottom: 20}}>
        <Fieldset label="Add a new link">
          <Label text="Link title">
            <TextInput
              maxLength={250}
              name="title"
              onChange={this.handleTitleChange}
              placeholder="Text your visitor will see"
              required
              value={this.state.title}
            />
          </Label>
          <Label
            error={
              urlInvalid
                ? 'URLs must begin with "https://" or "http://".'
                : undefined
            }
            text="Link URL"
          >
            <TextInput
              invalid={urlInvalid}
              maxLength={500}
              name="url"
              onChange={this.handleURLChange}
              placeholder="https://"
              required
              value={this.state.url}
            />
          </Label>
          <Button $isBlock $isPrimary type="submit">
            Create
          </Button>
        </Fieldset>
      </Form>
    );
  }
}
