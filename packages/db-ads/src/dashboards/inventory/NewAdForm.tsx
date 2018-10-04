import * as React from 'react';

import AudioUpload from '@pinecast/common/AudioUpload';
import Button, {ButtonGroup} from '@pinecast/common/Button';
import Checkbox from '@pinecast/common/Checkbox';
import DateTimeInput from '@pinecast/common/DateTimeInput';
import Dialog from '@pinecast/common/Dialog';
import ErrorState from '@pinecast/common/ErrorState';
import Fieldset from '@pinecast/common/Fieldset';
import Form from '@pinecast/common/Form';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import LoadingState from '@pinecast/common/LoadingState';
import Range from '@pinecast/common/Range';
import TagPicker from '@pinecast/common/TagPicker';
import TextInput from '@pinecast/common/TextInput';
import {dataProvider, DataProviderState} from '@pinecast/xhr';

import * as models from '../../models';

export type AdObject = {
  name: string;
  offer_code: string | null;
};

class NewAdForm extends React.PureComponent {
  props: {
    onCancel: () => void;
    onNewTag: (payload: AdObject) => void;
    tags: DataProviderState<Array<models.Tag>>;
  };

  state: {
    name: string;
    offerCode: string | null;
    tags: Array<string>;
    playOncePerEpisode: boolean;
    priority: number;

    startDate: Date;
    endDate: Date | null;

    signedAudioURL: string | null;
  } = {
    name: '',
    offerCode: null,
    tags: [],
    playOncePerEpisode: false,
    priority: 1,

    startDate: new Date(),
    endDate: null,

    signedAudioURL: null,
  };

  handleCreateSubmit = () => {
    const {name, offerCode} = this.state;
    if (!name.trim()) {
      return;
    }

    this.props.onNewTag({name: name.trim(), offer_code: offerCode});
  };

  handleNameChange = (value: string) => {
    this.setState({name: value});
  };
  handleOfferCodeChange = (value: string) => {
    this.setState({offerCode: value || null});
  };
  handleSetTags = (tags: Array<string>) => {
    this.setState({tags});
  };
  handleChangePlayOncePerEpisode = (playOncePerEpisode: boolean) => {
    this.setState({playOncePerEpisode});
  };
  handleChangePriority = (newPriority: number) => {
    this.setState({priority: newPriority / 100});
  };
  handleChangeStartDate = (newDate: Date) => {
    let {endDate} = this.state;
    if (endDate && endDate < new Date()) {
      endDate = new Date(newDate);
      endDate.setDate(endDate.getDate() + 1);
    }
    this.setState({startDate: newDate, endDate});
  };
  handleChangeHasEndDate = (hasEndDate: boolean) => {
    this.setState({endDate: !hasEndDate ? new Date() : null});
  };
  handleChangeEndDate = (endDate: Date) => {
    this.setState({endDate});
  };

  handleGotAudio = (signedURL: string) => {
    this.setState({signedAudioURL: signedURL});
    return Promise.resolve();
  };
  handleClearAudio = () => {
    this.setState({signedAudioURL: null});
  };

  renderInner() {
    const {tags} = this.props;
    if (tags.isLoading || tags.isInitial) {
      return <LoadingState title="Loading…" />;
    } else if (tags.isErrored) {
      return (
        <ErrorState
          actionLabel="Retry"
          onAction={tags.reload}
          title="We encountered an error while loading the form."
        />
      );
    }
    const {
      name,
      offerCode,
      playOncePerEpisode,
      priority,
      startDate,
      endDate,
      signedAudioURL,
    } = this.state;
    return (
      <React.Fragment>
        <Label text="Advertisement name">
          <TextInput
            maxLength={250}
            name="name"
            onChange={this.handleNameChange}
            required
            value={name}
          />
        </Label>
        <AudioUpload
          audioType="ads_advertisement"
          labelText="Advertisement audio"
          maxFileSize={16 * 1024 * 1024}
          onCleared={this.handleClearAudio}
          onNewFile={this.handleGotAudio}
          value={signedAudioURL}
        />
        <Label
          optional
          subText="If you provide an offer code in your ad, set that here."
          text="Offer code"
        >
          <TextInput
            onChange={this.handleOfferCodeChange}
            value={offerCode || ''}
          />
        </Label>
        <Fieldset label="Tags">
          <TagPicker
            emptyLabel="No tags selected"
            onSelectionChange={this.handleSetTags}
            options={tags.data.map(tag => ({
              key: tag.uuid,
              label: tag.name,
            }))}
            optionsLabel="All tags"
            selection={this.state.tags}
            selectionLabel="Selected tags"
            selectionSubtext="The tags you choose will be used to place your advertisement."
          />
        </Fieldset>
        <Fieldset label="Timing">
          <Group spacing={12}>
            <Label text="Start running on">
              <DateTimeInput
                onChange={this.handleChangeStartDate}
                value={startDate}
              />
            </Label>
            <Label text="Stop running on">
              <DateTimeInput
                disabled={endDate === null}
                isValidDate={date => date > startDate}
                onChange={this.handleChangeEndDate}
                style={{marginBottom: 8}}
                value={endDate}
              />
              <Checkbox
                checked={endDate === null}
                onChange={this.handleChangeHasEndDate}
                style={{paddingBottom: 0}}
                text="Run indefinitely"
              />
            </Label>
          </Group>
        </Fieldset>
        <Fieldset label="Placement">
          <Label
            subText="Ads with higher priority will be preferred over ads with lower priority when filling a placement."
            text="Priority"
          >
            <Range
              max={100}
              maxLabel="High"
              min={0}
              minLabel="Low"
              onChange={this.handleChangePriority}
              value={priority * 100}
            />
          </Label>
          <Checkbox
            checked={playOncePerEpisode}
            text="Play at most once per episode"
            onChange={this.handleChangePlayOncePerEpisode}
          />
        </Fieldset>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleCreateSubmit}>
        <Dialog
          actions={
            <ButtonGroup>
              <Button onClick={this.props.onCancel}>Cancel</Button>
              <Button $isPrimary type="submit">
                Create
              </Button>
            </ButtonGroup>
          }
          title="New advertisement"
        >
          {this.renderInner()}
        </Dialog>
      </Form>
    );
  }
}

export default dataProvider<NewAdForm['props'], 'tags', Array<models.Tag>>(
  'tags',
  () => ({
    method: 'GET',
    url: '/advertisements/tags/',
  }),
  (resp: string) => JSON.parse(resp),
)(NewAdForm);
