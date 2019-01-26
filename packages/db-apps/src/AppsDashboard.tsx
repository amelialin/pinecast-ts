import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import {P} from '@pinecast/common/Text';
import Tabs, {Tab} from '@pinecast/common/Tabs';

import AnalyticsProvider from './AnalyticsProvider';
import GenericDirectory from './directories/GenericDirectory';
import * as Icons from './directories/icons';
import Spotify from './directories/Spotify';

const messages = defineMessages({
  copyDirectories: {
    id: 'db-apps.AppsDashboard.copyDirectories',
    description: 'Copy for the directories tab',
    defaultMessage:
      'Listeners find podcasts through podcast directories like the ones below. To be listed, submit your show to each directory.',
  },
  tabDirectories: {
    id: 'db-apps.AppsDashboard.tabDirectories',
    description: 'Title of the tab for podcast directories',
    defaultMessage: 'Directories',
  },
  tabAnalytics: {
    id: 'db-apps.AppsDashboard.tabAnalytics',
    description: 'Title of the tab for analytics service integrations',
    defaultMessage: 'Analytics',
  },

  submitCta: {
    id: 'db-apps.AppsDashboard.submitCta',
    description: 'Button to visit a podcast service submission portal',
    defaultMessage: 'Visit portal',
  },
});

export default class AppsDashboard extends React.Component {
  static selector = '.placeholder-apps';

  static propExtraction = {
    slug: (e: HTMLElement) => e.getAttribute('data-slug'),
  };

  props: {slug: string};

  render() {
    return (
      <React.Fragment>
        <Tabs style={{paddingTop: 40}}>
          <Tab name={<FormattedMessage {...messages.tabDirectories} />}>
            <P>
              <FormattedMessage {...messages.copyDirectories} />
            </P>
            <GenericDirectory
              cta={<FormattedMessage {...messages.submitCta} />}
              directoryName="Apple Podcasts"
              href="https://podcastsconnect.apple.com/"
              icon={<Icons.ApplePodcasts size={20} />}
            />
            <GenericDirectory
              cta={<FormattedMessage {...messages.submitCta} />}
              directoryName="Google Podcasts"
              href="https://play.google.com/music/podcasts/portal/"
              icon={<Icons.GooglePodcasts size={20} />}
            />
            <GenericDirectory
              cta={<FormattedMessage {...messages.submitCta} />}
              directoryName="Player FM"
              href="https://player.fm/importer/feed"
              icon={<Icons.PlayerFM size={20} />}
            />
            <GenericDirectory
              cta={<FormattedMessage {...messages.submitCta} />}
              directoryName="Pocket Casts"
              href="https://pocketcasts.com/submit"
              icon={<Icons.PocketCasts size={20} />}
            />
            <GenericDirectory
              cta={<FormattedMessage {...messages.submitCta} />}
              directoryName="RadioPublic"
              href="https://podcasters.radiopublic.com/"
              icon={<Icons.RadioPublic size={20} />}
            />
            <Spotify slug={this.props.slug} />
            <GenericDirectory
              cta={<FormattedMessage {...messages.submitCta} />}
              directoryName="TuneIn"
              href="https://help.tunein.com/contact/add-podcast-S19TR3Sdf"
              icon={<Icons.TuneIn size={20} />}
            />
          </Tab>
          <Tab name={<FormattedMessage {...messages.tabAnalytics} />}>
            <AnalyticsProvider slug={this.props.slug} />
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}
