import * as React from 'react';

import AudioUpload from '@pinecast/common/AudioUpload';
import Button, {ButtonGroup} from '@pinecast/common/Button';
import Checkbox from '@pinecast/common/Checkbox';
import {compose} from '@pinecast/common/helpers';
import DateTimeInput from '@pinecast/common/DateTimeInput';
import Dialog from '@pinecast/common/Dialog';
import ErrorState from '@pinecast/common/ErrorState';
import Fieldset from '@pinecast/common/Fieldset';
import Form from '@pinecast/common/Form';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import LoadingState from '@pinecast/common/LoadingState';
import {Omit} from '@pinecast/common/types';
import Range from '@pinecast/common/Range';
import TagPicker from '@pinecast/common/TagPicker';
import TextInput from '@pinecast/common/TextInput';

import {
  listEligiblePodcasts,
  ListEligiblePodcastsState,
} from '../../dataProviders/podcasts';
import {listTags, ListTagsState} from '../../dataProviders/tags';
import * as models from '../../models';

class NewAdForm extends React.PureComponent {
  props: {
    onCancel: () => void;
    onNewTag: (payload: models.MutableAdvertisement) => void;
    podcasts: ListEligiblePodcastsState;
    tags: ListTagsState;
  };

  state: {
    name: string;
    offerCode: string | null;
    tags: Array<string>;
    podcasts: Array<string>;
    playOncePerEpisode: boolean;
    priority: number;

    startDate: Date;
    endDate: Date | null;

    signedAudioURL: string | null;
  } = {
    name: '',
    offerCode: null,
    tags: [],
    podcasts: [],
    playOncePerEpisode: false,
    priority: 1,

    startDate: new Date(),
    endDate: null,

    signedAudioURL: null,
  };

  handleCreateSubmit = () => {
    const {
      name,
      offerCode,
      startDate,
      endDate,
      tags,
      playOncePerEpisode,
      priority,
      podcasts,
    } = this.state;
    if (!name.trim()) {
      return;
    }

    this.props.onNewTag({
      name: name.trim(),
      duration: 0,
      offer_code: offerCode,
      start_date: startDate,
      end_date: endDate,
      tags,
      priority,
      place_only_once: playOncePerEpisode,
      for_podcasts: podcasts,
    });
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
  handleSetPodcasts = (podcasts: Array<string>) => {
    this.setState({podcasts});
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
    const now = new Date();
    const {startDate} = this.state;
    const max = now < startDate ? startDate : now;
    if (max === startDate) {
      max.setDate(max.getDate() + 1);
    }
    this.setState({endDate: !hasEndDate ? max : null});
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
    const {podcasts, tags} = this.props;
    if (
      tags.isLoading ||
      tags.isInitial ||
      podcasts.isLoading ||
      podcasts.isInitial
    ) {
      return <LoadingState title="Loading…" />;
    } else if (tags.isErrored) {
      return (
        <ErrorState
          actionLabel="Retry"
          onAction={tags.reload}
          title="We encountered an error while loading the form."
        />
      );
    } else if (podcasts.isErrored) {
      return (
        <ErrorState
          actionLabel="Retry"
          onAction={podcasts.reload}
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
        <Fieldset label="Run ad on…">
          <TagPicker
            emptyLabel="No podcasts selected"
            onSelectionChange={this.handleSetPodcasts}
            options={podcasts.data.map(podcast => ({
              key: podcast.slug,
              label: podcast.name,
            }))}
            optionsLabel="All podcasts"
            selection={this.state.podcasts}
            selectionLabel="Selected podcasts"
            selectionSubtext="The podcasts you choose will be eligible to use this advertisement."
          />
        </Fieldset>
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

export default compose(
  listTags<Omit<NewAdForm['props'], 'podcasts'>, 'tags'>('tags'),
  listEligiblePodcasts<NewAdForm['props'], 'podcasts'>('podcasts'),
)(NewAdForm);
