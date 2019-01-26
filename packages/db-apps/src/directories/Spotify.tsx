import * as React from 'react';

import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import Collapser from '@pinecast/common/Collapser';
import {DashboardTitle, LegalP, P} from '@pinecast/common/Text';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import ErrorState from '@pinecast/common/ErrorState';
import Group from '@pinecast/common/Group';
import Link from '@pinecast/common/Link';
import LoadingState from '@pinecast/common/LoadingState';
import Switch from '@pinecast/common/Switch';
import Spinner from '@pinecast/common/Spinner';
import {url} from '@pinecast/common/helpers';
import xhr, {DataLoader, DataProviderState} from '@pinecast/xhr';

import * as Icons from './icons';

const messages = defineMessages({
  copy: {
    id: 'db-apps.Spotify.copy',
    description: 'Message shown on Spotify submission card',
    defaultMessage:
      'Pinecast has partnered with Spotify to list your podcast in the ' +
      'Spotify app. With a single click, you can make your podcast accessible ' +
      'to millions of potential listeners.',
  },
  ineligible: {
    id: 'db-apps.Spotify.ineligible',
    description:
      'Message shown when a podcast is not eligible for Spotify submission',
    defaultMessage:
      'This podcast has been flagged as ineligible for Spotify submission. ' +
      'Please contact Pinecast support for more information.',
  },
  errorLoad: {
    id: 'db-apps.Spotify.errorLoad',
    description: 'Error when data about Spotify could not be loaded',
    defaultMessage: 'Spotify submission information did not load.',
  },
  labelLoad: {
    id: 'db-apps.Spotify.labelLoad',
    description: 'Label when loading Spotify data',
    defaultMessage: 'Loading Spotify submission information…',
  },
  errorSubmitting: {
    id: 'db-apps.Spotify.errorSubmitting',
    description: 'Error when submitting podcast to Spotify',
    defaultMessage: 'There was a problem submitting your podcast.',
  },
  errorUnsubmitting: {
    id: 'db-apps.Spotify.errorUnsubmitting',
    description: 'Error when unsubmitting podcast to Spotify',
    defaultMessage: 'There was a problem unsubmitting your podcast.',
  },

  doSubmit: {
    id: 'db-apps.Spotify.doSubmit',
    description: 'Switch label when podcast has not been submitted to Spotify',
    defaultMessage: 'Submit my podcast to Spotify',
  },
  submitted: {
    id: 'db-apps.Spotify.submitted',
    description: 'Switch label when podcast has been submitted to Spotify',
    defaultMessage: 'Podcast submitted',
  },

  listingSoon: {
    id: 'db-apps.Spotify.listingSoon',
    description: 'Message that directory listing will be available soon',
    defaultMessage: 'Podcasts can take up to an hour to be listed.',
  },
  listing: {
    id: 'db-apps.Spotify.listing',
    description: 'Link text pointing to Spotify listing for a podcast',
    defaultMessage: 'Visit directory listing',
  },
});

type SpotifyDetails = {
  id: string | null;
  ineligible: boolean;
  submitted: boolean;
};

class SpotifyDashboard extends React.Component {
  props: {
    details: SpotifyDetails;
    reload: () => void;
    slug: string;
  };
  state: {
    error: React.ReactNode | null;
    isSubmitted: boolean;
    saved: boolean;
    saving: boolean;
  };

  constructor(props: SpotifyDashboard['props']) {
    super(props);
    this.state = {
      error: null,
      isSubmitted: props.details.submitted,
      saved: false,
      saving: false,
    };
  }

  handleToggle = (newValue: boolean) => {
    this.setState({error: null, saving: true});
    const body = new FormData();
    body.append('slug', this.props.slug);

    xhr({
      method: 'POST',
      url: `/dashboard/services/spotify/${newValue ? 'submit' : 'unsubmit'}`,
      body,
    }).then(
      () => {
        this.setState({saved: true, saving: false, isSubmitted: newValue});
      },
      () => {
        this.setState({
          error: (
            <FormattedMessage
              {...(newValue
                ? messages.errorSubmitting
                : messages.errorUnsubmitting)}
            />
          ),
          saving: false,
        });
      },
    );
  };

  renderInner() {
    const {id, ineligible} = this.props.details;
    if (ineligible) {
      return (
        <Callout type="negative">
          <FormattedMessage {...messages.ineligible} />
        </Callout>
      );
    }
    const {isSubmitted, saved, saving} = this.state;
    return (
      <React.Fragment>
        <Group spacing={16}>
          <Switch
            checked={isSubmitted}
            disabled={saving}
            onChange={this.handleToggle}
            style={{
              transition: 'padding 0.2s',
              padding: isSubmitted ? '0 0 0' : '0 0 20px',
            }}
            text={
              <React.Fragment>
                {isSubmitted ? (
                  <FormattedMessage {...messages.submitted} />
                ) : (
                  <FormattedMessage {...messages.doSubmit} />
                )}
                {saving && <Spinner style={{marginLeft: 8}} />}
              </React.Fragment>
            }
          />
          {Boolean(id) &&
            (saved ? (
              <FormattedMessage {...messages.listingSoon} />
            ) : (
              <Link href={`https://open.spotify.com/show/${id!.split(':')[2]}`}>
                <FormattedMessage {...messages.listing} />
              </Link>
            ))}
        </Group>
        <Collapser open={!isSubmitted} shave={0}>
          <LegalP style={{marginBottom: 0}}>
            By submitting your podcast to Spotify, you agree to{' '}
            <Link href="https://github.com/Pinecast/legal/blob/master/TERMS.md#spotify">
              the stipulations in the Pinecast terms of service
            </Link>{' '}
            regarding Spotify podcast submission. These stipulations may not
            have been present in the agreement when you signed up for Pinecast.
          </LegalP>
        </Collapser>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <P>
          <FormattedMessage {...messages.copy} />
        </P>
        {this.renderInner()}
      </React.Fragment>
    );
  }
}

export default ({slug}: {slug: string}) => (
  <DataLoader
    autoLoad
    input={{slug}}
    fetcher={({slug}) => ({
      method: 'GET',
      url: url`/dashboard/services/spotify?slug=${slug}`,
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
    }: DataProviderState<SpotifyDetails>) => (
      <Card whiteBack>
        <Group spacing={12}>
          <Icons.Spotify size={20} />
          <DashboardTitle>Spotify</DashboardTitle>
        </Group>
        {isLoading || isInitial ? (
          <LoadingState title={<FormattedMessage {...messages.labelLoad} />} />
        ) : isErrored ? (
          <ErrorState title={<FormattedMessage {...messages.errorLoad} />} />
        ) : (
          <SpotifyDashboard details={data!} reload={reload} slug={slug} />
        )}
      </Card>
    )}
  </DataLoader>
);
