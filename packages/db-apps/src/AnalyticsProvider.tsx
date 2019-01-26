import * as React from 'react';

import Button from '@pinecast/common/Button';
import ButtonLabel from '@pinecast/common/ButtonLabel';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import ErrorState from '@pinecast/common/ErrorState';
import LoadingState from '@pinecast/common/LoadingState';
import {P} from '@pinecast/common/Text';
import Radio from '@pinecast/common/Radio';
import xhr, {DataLoader, DataProviderState} from '@pinecast/xhr';
import {url} from '@pinecast/common/helpers';

const messages = defineMessages({
  errorLoad: {
    id: 'db-apps.AnalyticsProvider.errorLoad',
    description: 'Error when data about Spotify could not be loaded',
    defaultMessage: 'Analytics provider data could not be loaded.',
  },
  labelLoad: {
    id: 'db-apps.AnalyticsProvider.labelLoad',
    description: 'Label when loading Spotify data',
    defaultMessage: 'Loading analytics provider information…',
  },
  errorSubmitting: {
    id: 'db-apps.AnalyticsProvider.errorSubmitting',
    description: 'Error when submitting podcast to Spotify',
    defaultMessage: 'There was a problem saving your selection.',
  },

  copy: {
    id: 'db-apps.AnalyticsProvider.copy',
    description: 'Copy for analytics provider',
    defaultMessage:
      'Pinecast can forward listen event data to third parties. If you sign up for a third party analytics service, select it below. You can only have one service active at a time.',
  },

  optionNone: {
    id: 'db-apps.AnalyticsProvider.option.none',
    description: 'Option when no third party analytics provider is set up',
    defaultMessage: 'Do not forward my listen analytics data.',
  },
  optionChartable: {
    id: 'db-apps.AnalyticsProvider.option.chartable',
    description:
      'Option to configure Chartable as a third party analytics provider',
    defaultMessage: 'Forward listen data to Chartable.',
  },
  optionPodtrac: {
    id: 'db-apps.AnalyticsProvider.option.podtrac',
    description:
      'Option to configure Podtrac as a third party analytics provider',
    defaultMessage: 'Forward listen data to Podtrac.',
  },
  ctaSave: {
    id: 'db-apps.AnalyticsProvider.ctaSave',
    description: 'Button to save analytics provider choice',
    defaultMessage: 'Save',
  },

  saved: {
    id: 'db-apps.AnalyticsProvider.saved',
    description: 'Message shown when the analytics provider choice was saved',
    defaultMessage: 'Saved',
  },
  errorSaving: {
    id: 'db-apps.AnalyticsProvider.errorSaving',
    description: 'Error shown when failing to save analytics provider choice',
    defaultMessage: 'Could not save',
  },
});

class AnalyticsProvider extends React.Component {
  props: {
    provider: null | 'chartable' | 'podtrac';
    reload: () => void;
    slug: string;
  };
  state: {
    errored: boolean;
    provider: null | 'chartable' | 'podtrac';
    saved: boolean;
    saving: boolean;
  };

  constructor(props: AnalyticsProvider['props']) {
    super(props);
    this.state = {
      errored: false,
      provider: props.provider,
      saved: false,
      saving: false,
    };
  }

  handleSetNone = () => {
    this.setState({provider: null, saved: false});
  };
  handleSetChartable = () => {
    this.setState({provider: 'chartable', saved: false});
  };
  handleSetPodtrac = () => {
    this.setState({provider: 'podtrac', saved: false});
  };

  handleSave = async () => {
    this.setState({errored: false, saved: false, saving: true});
    const body = new FormData();
    body.append('service', String(this.state.provider));
    body.append('slug', this.props.slug);
    try {
      await xhr({
        method: 'POST',
        url: '/dashboard/services/analytics/set',
        body,
      });
    } catch {
      this.setState({saving: false, errored: true});
      return;
    }
    this.setState({saved: true, saving: false});
    this.props.reload();
  };

  render() {
    const {errored, provider, saved, saving} = this.state;
    return (
      <React.Fragment>
        <P>
          <FormattedMessage {...messages.copy} />
        </P>
        <Radio
          checked={provider === null}
          onChange={this.handleSetNone}
          text={<FormattedMessage {...messages.optionNone} />}
        />
        <Radio
          checked={provider === 'chartable'}
          onChange={this.handleSetChartable}
          text={<FormattedMessage {...messages.optionChartable} />}
        />
        <Radio
          checked={provider === 'podtrac'}
          onChange={this.handleSetPodtrac}
          text={<FormattedMessage {...messages.optionPodtrac} />}
        />
        <ButtonLabel
          message={
            errored ? (
              <FormattedMessage {...messages.errorSaving} />
            ) : saved ? (
              <FormattedMessage {...messages.saved} />
            ) : null
          }
          type={errored ? 'negative' : saved ? 'positive' : undefined}
        >
          <Button
            disabled={this.props.provider === this.state.provider}
            onClick={this.handleSave}
            pending={saving}
          >
            <FormattedMessage {...messages.ctaSave} />
          </Button>
        </ButtonLabel>
      </React.Fragment>
    );
  }
}

type AnalyticsData = {
  active_service: null | 'chartable' | 'podtrac';
};
export default ({slug}: {slug: string}) => (
  <DataLoader
    autoLoad
    input={{slug}}
    fetcher={({slug}) => ({
      method: 'GET',
      url: url`/dashboard/services/analytics?slug=${slug}`,
    })}
    transformer={(resp: string) => JSON.parse(resp)}
  >
    {({
      isLoading,
      isErrored,
      isCompleted,
      isInitial,
      data,
      reload,
    }: DataProviderState<AnalyticsData>) =>
      isLoading || isInitial ? (
        <LoadingState title={<FormattedMessage {...messages.labelLoad} />} />
      ) : isErrored ? (
        <ErrorState title={<FormattedMessage {...messages.errorLoad} />} />
      ) : (
        <AnalyticsProvider
          provider={data!.active_service}
          reload={reload}
          slug={slug}
        />
      )
    }
  </DataLoader>
);
