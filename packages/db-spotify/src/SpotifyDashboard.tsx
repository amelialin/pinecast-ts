import * as React from 'react';

import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import {DashboardTitle, LegalP, P} from '@pinecast/common/Text';
import Link from '@pinecast/common/Link';
import Switch from '@pinecast/common/Switch';
import Spinner from '@pinecast/common/Spinner';
import xhr from '@pinecast/xhr';

export default class SpotifyDashboard extends React.Component {
  static selector = '.placeholder-spotify';

  static propExtraction = {
    isEligible: e => e.getAttribute('data-is-eligible') === 'true',
    isSubmitted: e => e.getAttribute('data-is-submitted') === 'true',
    slug: e => e.getAttribute('data-slug'),
  };

  props: {
    isEligible: boolean;
    isSubmitted: boolean;
    slug: string;
  };
  state: {error: string | null; isSubmitted: boolean; saving: boolean};

  constructor(props) {
    super(props);
    this.state = {error: null, isSubmitted: props.isSubmitted, saving: false};
  }

  handleToggle = (newValue: boolean) => {
    this.setState({error: null, saving: true});
    const body = new FormData();
    body.append('slug', this.props.slug);
    xhr({
      method: 'POST',
      url: '/dashboard/services/spotify/submit',
      body,
    }).then(
      () => {
        this.setState({saving: false, isSubmitted: newValue});
      },
      () => {
        this.setState({
          error: 'There was a problem submitting your podcast.',
          saving: false,
        });
      },
    );
  };

  renderInner() {
    if (!this.props.isEligible) {
      return (
        <Callout type="negative">
          This podcast has been flagged as ineligible for Spotify submission.
          Please contact Pinecast support for more information.
        </Callout>
      );
    }
    return (
      <React.Fragment>
        <Switch
          checked={this.state.isSubmitted}
          disabled={this.state.saving || this.state.isSubmitted}
          onChange={this.handleToggle}
          text={
            <React.Fragment>
              {this.state.isSubmitted
                ? 'Podcast submitted to Spotify'
                : 'Submit my podcast to Spotify'}
              {this.state.saving && <Spinner style={{marginLeft: 8}} />}
            </React.Fragment>
          }
        />
        <LegalP>
          By submitting your podcast to Spotify, you agree to{' '}
          <Link href="https://github.com/Pinecast/legal/blob/master/TERMS.md#spotify">
            the stipulations in the Pinecast terms of service
          </Link>{' '}
          regarding Spotify podcast submission. These stipulations may not have
          been present in the agreement when you signed up for Pinecast.
        </LegalP>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Card whiteBack>
        <DashboardTitle>Submit to Spotify</DashboardTitle>
        <P>
          Pinecast has partnered with Spotify to list your podcast in the
          Spotify app. With a single click, you can make your podcast accessible
          to millions of potential listeners.
        </P>
        {this.renderInner()}
      </Card>
    );
  }
}
