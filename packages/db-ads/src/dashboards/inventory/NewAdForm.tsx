import * as React from 'react';

import AudioUpload from '@pinecast/common/AudioUpload';
import Button, {ButtonGroup} from '@pinecast/common/Button';
import Checkbox from '@pinecast/common/Checkbox';
import {compose} from '@pinecast/common/helpers';
import DateTimeInput from '@pinecast/common/DateTimeInput';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Dialog from '@pinecast/common/Dialog';
import ErrorState from '@pinecast/common/ErrorState';
import Fieldset from '@pinecast/common/Fieldset';
import Form from '@pinecast/common/Form';
import getAudioDuration from '@pinecast/common/audio/duration';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import LoadingState from '@pinecast/common/LoadingState';
import {Omit} from '@pinecast/common/types';
import Range from '@pinecast/common/Range';
import TagPicker from '@pinecast/common/TagPicker';
import TextInput from '@pinecast/common/TextInput';
import xhr from '@pinecast/xhr';

import {
  listEligiblePodcasts,
  ListEligiblePodcastsState,
} from '../../dataProviders/podcasts';
import {listTags, ListTagsState} from '../../dataProviders/tags';

const messages = defineMessages({
  loading: {
    id: 'db-ads.NewAdForm.loading',
    description: 'Loading message for new ad form',
    defaultMessage: 'Loading…',
  },
  ctaRetry: {
    id: 'db-ads.NewAdForm.cta.retry',
    description: 'Retry button for errors',
    defaultMessage: 'Retry',
  },
  errorState: {
    id: 'db-ads.NewAdForm.error',
    description: 'Error state copy',
    defaultMessage: 'We encountered an error while loading the form.',
  },

  labelName: {
    id: 'db-ads.NewAdForm.name.label',
    description: 'Label for name field',
    defaultMessage: 'Advertisement name',
  },
  labelAudio: {
    id: 'db-ads.NewAdForm.audio.label',
    description: 'Label for audio field',
    defaultMessage: 'Advertisement audio',
  },
  labelOfferCode: {
    id: 'db-ads.NewAdForm.offerCode.label',
    description: 'Label for offer code field',
    defaultMessage: 'Offer code',
  },

  fieldsetRunAdOn: {
    id: 'db-ads.NewAdForm.runAdOn.label',
    description: 'Label for ad applicability fieldset',
    defaultMessage: 'Run ad on…',
  },
  podcastsEmptyLabel: {
    id: 'db-ads.NewAdForm.podcasts.emptyLabel',
    description: 'Empty label for podcast list',
    defaultMessage: 'No podcasts selected',
  },
  podcastsOptionsLabel: {
    id: 'db-ads.NewAdForm.podcasts.optionsLabel',
    description: 'Options label for podcast list',
    defaultMessage: 'All podcasts',
  },
  podcastsSelectedLabel: {
    id: 'db-ads.NewAdForm.podcasts.selectedLabel',
    description: 'Selected label for podcast list',
    defaultMessage: 'Selected podcasts',
  },
  podcastsSelectedSubtext: {
    id: 'db-ads.NewAdForm.podcasts.selectedSubtext',
    description: 'Selected subtext for podcast list',
    defaultMessage:
      'The podcasts you choose will be eligible to use this advertisement.',
  },

  fieldsetTags: {
    id: 'db-ads.NewAdForm.tags.label',
    description: 'Label for tags fieldset',
    defaultMessage: 'Tags',
  },
  tagsEmptyLabel: {
    id: 'db-ads.NewAdForm.tags.emptyLabel',
    description: 'Empty label for podcast list',
    defaultMessage: 'No tags selected',
  },
  tagsOptionsLabel: {
    id: 'db-ads.NewAdForm.tags.optionsLabel',
    description: 'Options label for podcast list',
    defaultMessage: 'All tags',
  },
  tagsSelectedLabel: {
    id: 'db-ads.NewAdForm.tags.selectedLabel',
    description: 'Selected label for podcast list',
    defaultMessage: 'Selected tags',
  },
  tagsSelectedSubtext: {
    id: 'db-ads.NewAdForm.tags.selectedSubtext',
    description: 'Selected subtext for podcast list',
    defaultMessage:
      'The tags you choose will be used to place your advertisement.',
  },

  fieldsetTiming: {
    id: 'db-ads.NewAdForm.timing.label',
    description: 'Fieldset label for timing',
    defaultMessage: 'Timing',
  },
  labelStartDate: {
    id: 'db-ads.NewAdForm.startDate.label',
    description: 'Label for start date field',
    defaultMessage: 'Start running on',
  },
  labelEndDate: {
    id: 'db-ads.NewAdForm.endDate.label',
    description: 'Label for end date field',
    defaultMessage: 'Stop running on',
  },
  labelRunIndefinitely: {
    id: 'db-ads.NewAdForm.runIndefinitely.label',
    description: 'Label for run indefinitely option',
    defaultMessage: 'Run indefinitely',
  },

  fieldsetPlacement: {
    id: 'db-ads.NewAdForm.placement.label',
    description: 'Label for the placement fieldset',
    defaultMessage: 'Placement',
  },
  labelPriority: {
    id: 'db-ads.NewAdForm.priority.label',
    description: 'Label for priority field',
    defaultMessage: 'Priority',
  },
  subtextPriority: {
    id: 'db-ads.NewAdForm.priority.subtext',
    description: 'Subtext for priority field',
    defaultMessage:
      'Ads with higher priority will be preferred over ads with lower priority when filling a placement.',
  },

  priorityLabelLow: {
    id: 'db-ads.NewAdForm.priority.option.low.label',
    description: 'Low label for priority slider',
    defaultMessage: 'Low',
  },
  priorityLabelHigh: {
    id: 'db-ads.NewAdForm.priority.option.high.label',
    description: 'High label for priority slider',
    defaultMessage: 'High',
  },

  labelPlayAtMostOnce: {
    id: 'db-ads.NewAdForm.playAtMostOnce.label',
    description:
      'Label for option to play advertisement at most once per episode',
    defaultMessage: 'Play at most once per episode',
  },

  ctaCreate: {
    id: 'db-ads.NewAdForm.button.create',
    description: 'Create button',
    defaultMessage: 'Create',
  },
  ctaCancel: {
    id: 'db-ads.NewAdForm.button.cancel',
    description: 'Cancel button',
    defaultMessage: 'Cancel',
  },

  title: {
    id: 'db-ads.NewAdForm.title',
    description: 'Title of the New Ad form',
    defaultMessage: 'New advertisement',
  },
});

class NewAdForm extends React.PureComponent {
  props: {
    onCancel: () => void;
    onNewAd: () => void;
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

  handleCreateSubmit = async () => {
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

    const fd = new FormData();
    fd.append('name', name);
    if (offerCode) {
      fd.append('offer_code', offerCode);
    }

    fd.append('start_date', startDate.toISOString());
    if (endDate) {
      fd.append('end_date', endDate.toISOString());
    }

    tags.forEach(tag => {
      fd.append('tags', tag);
    });
    podcasts.forEach(podcast => {
      fd.append('for_podcasts', podcast);
    });

    if (playOncePerEpisode) {
      fd.append('play_only_once', 'true');
    }
    fd.append('priority', priority.toFixed(3));

    try {
      await xhr({
        method: 'POST',
        url: '/advertisements/inventory',
        body: fd,
      });
    } catch (e) {
      debugger;
      return;
    }

    this.props.onNewAd();
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

  handleGotAudio = async (signedURL: string, blob: File) => {
    this.setState({
      signedAudioURL: signedURL,
      duration: await getAudioDuration(blob).catch(() => 0),
    });
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
      return (
        <LoadingState title={<FormattedMessage {...messages.loading} />} />
      );
    } else if (tags.isErrored || podcasts.isErrored) {
      return (
        <ErrorState
          actionLabel={<FormattedMessage {...messages.ctaRetry} />}
          onAction={tags.reload}
          title={<FormattedMessage {...messages.errorState} />}
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
        <Label text={<FormattedMessage {...messages.labelName} />}>
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
          labelText={<FormattedMessage {...messages.labelAudio} />}
          maxFileSize={16 * 1024 * 1024}
          onCleared={this.handleClearAudio}
          onNewFile={this.handleGotAudio}
          value={signedAudioURL}
        />
        <Label
          optional
          subText="If you provide an offer code in your ad, set that here."
          text={<FormattedMessage {...messages.labelOfferCode} />}
        >
          <TextInput
            onChange={this.handleOfferCodeChange}
            value={offerCode || ''}
          />
        </Label>
        <Fieldset label={<FormattedMessage {...messages.fieldsetRunAdOn} />}>
          <TagPicker
            emptyLabel={<FormattedMessage {...messages.podcastsEmptyLabel} />}
            onSelectionChange={this.handleSetPodcasts}
            options={podcasts.data.map(podcast => ({
              key: podcast.slug,
              label: podcast.name,
            }))}
            optionsLabel={
              <FormattedMessage {...messages.podcastsOptionsLabel} />
            }
            selection={this.state.podcasts}
            selectionLabel={
              <FormattedMessage {...messages.podcastsSelectedLabel} />
            }
            selectionSubtext={
              <FormattedMessage {...messages.podcastsSelectedSubtext} />
            }
          />
        </Fieldset>
        <Fieldset label={<FormattedMessage {...messages.fieldsetTags} />}>
          <TagPicker
            emptyLabel={<FormattedMessage {...messages.tagsEmptyLabel} />}
            onSelectionChange={this.handleSetTags}
            options={tags.data.map(tag => ({
              key: tag.uuid,
              label: tag.name,
            }))}
            optionsLabel={<FormattedMessage {...messages.tagsOptionsLabel} />}
            selection={this.state.tags}
            selectionLabel={
              <FormattedMessage {...messages.tagsSelectedLabel} />
            }
            selectionSubtext={
              <FormattedMessage {...messages.tagsSelectedSubtext} />
            }
          />
        </Fieldset>
        <Fieldset label={<FormattedMessage {...messages.fieldsetTiming} />}>
          <Group spacing={12}>
            <Label text={<FormattedMessage {...messages.labelStartDate} />}>
              <DateTimeInput
                onChange={this.handleChangeStartDate}
                value={startDate}
              />
            </Label>
            <Label text={<FormattedMessage {...messages.labelEndDate} />}>
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
                text={<FormattedMessage {...messages.labelRunIndefinitely} />}
              />
            </Label>
          </Group>
        </Fieldset>
        <Fieldset label={<FormattedMessage {...messages.fieldsetPlacement} />}>
          <Label
            subText={<FormattedMessage {...messages.subtextPriority} />}
            text={<FormattedMessage {...messages.labelPriority} />}
          >
            <Range
              max={100}
              maxLabel={<FormattedMessage {...messages.priorityLabelHigh} />}
              min={0}
              minLabel={<FormattedMessage {...messages.priorityLabelLow} />}
              onChange={this.handleChangePriority}
              value={priority * 100}
            />
          </Label>
          <Checkbox
            checked={playOncePerEpisode}
            text={<FormattedMessage {...messages.labelPlayAtMostOnce} />}
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
