import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  InjectedIntlProps,
} from '@pinecast/i18n';
import Dialog from '@pinecast/common/Dialog';
import Form from '@pinecast/common/Form';
import Label from '@pinecast/common/Label';
import TextArea from '@pinecast/common/TextArea';
import TextInput from '@pinecast/common/TextInput';

const messages = defineMessages({
  ctaCancel: {
    id: 'db-ads.NewTagForm.button.cancel',
    description: 'Cancel button',
    defaultMessage: 'Cancel',
  },
  ctaCreate: {
    id: 'db-ads.NewTagForm.button.create',
    description: 'Create button',
    defaultMessage: 'Create',
  },
  title: {
    id: 'db-ads.NewTagForm.title',
    description: 'Title of the new tag form',
    defaultMessage: 'New tag',
  },

  labelName: {
    id: 'db-ads.NewTagForm.name.label',
    description: 'Label for name field',
    defaultMessage: 'Tag name',
  },
  placeholderName: {
    id: 'db-ads.NewTagForm.name.placeholder',
    description: 'Placeholder for the name field',
    defaultMessage: 'Pre-roll',
  },
  labelDescription: {
    id: 'db-ads.NewTagForm.description.label',
    description: 'Label for description field',
    defaultMessage: 'Description',
  },
  placeholderDescription: {
    id: 'db-ads.NewTagForm.description.placeholder',
    description: 'Placeholder for the description field',
    defaultMessage: 'Ads with this tag go at the start of episodes',
  },
});

type OwnProps = {
  onCancel: () => void;
  onNewTag: (name: string, description: string) => void;
};

class NewTagForm extends React.PureComponent {
  props: OwnProps & InjectedIntlProps;

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
    const {intl} = this.props;
    const {description, name} = this.state;
    return (
      <Form action="" onSubmit={this.handleCreateSubmit}>
        <Dialog
          actions={
            <ButtonGroup>
              <Button onClick={this.props.onCancel}>
                <FormattedMessage {...messages.ctaCancel} />
              </Button>
              <Button $isPrimary type="submit">
                <FormattedMessage {...messages.ctaCreate} />
              </Button>
            </ButtonGroup>
          }
          title={<FormattedMessage {...messages.title} />}
        >
          <Label text={<FormattedMessage {...messages.labelName} />}>
            <TextInput
              maxLength={250}
              name="name"
              onChange={this.handleNameChange}
              placeholder={intl.formatMessage(messages.placeholderName)}
              required
              value={name}
            />
          </Label>
          <Label text={<FormattedMessage {...messages.labelDescription} />}>
            <TextArea
              onChange={this.handleDescriptionChange}
              placeholder={intl.formatMessage(messages.placeholderDescription)}
              value={description}
            />
          </Label>
        </Dialog>
      </Form>
    );
  }
}

export default injectIntl(NewTagForm) as React.ComponentType<OwnProps>;
