import {connect} from 'react-redux';
import * as React from 'react';

import Button from '@pinecast/common/Button';
import Checkbox from '@pinecast/common/Checkbox';
import ErrorState from '@pinecast/common/ErrorState';
import Form from '@pinecast/common/Form';
import Label from '@pinecast/common/Label';
import Link from '@pinecast/common/Link';
import LoadingState from '@pinecast/common/LoadingState';
import styled from '@pinecast/styles';
import Tabs, {Tab} from '@pinecast/common/Tabs';
import TextInput from '@pinecast/common/TextInput';
import {TextPill} from '@pinecast/common/Text';
import xhr from '@pinecast/xhr';

import {
  PageHeading,
  PanelDescription,
  PanelSectionDescription,
  PanelWrapper,
} from '../panelComponents';
import {ReducerType} from '../reducer';
import {refresh} from '../actions/preview';
import request, {clearCache} from '../data/requests';

const HeaderWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Settings {
  analytics_id: string | null;
  itunes_url: string | null;
  google_play_url: string | null;
  stitcher_url: string | null;
  custom_cname: string | null;
  show_itunes_banner: boolean;
}

class SettingsPanel extends React.PureComponent {
  props: {csrf: string; onRefresh: () => void; slug: string};
  state: {
    data: Settings | null;
    error: string | null;
    updatedData: Settings | null;
    pending: boolean;
  } = {
    data: null,
    error: null,

    updatedData: null,
    pending: true,
  };

  componentDidMount() {
    const {slug} = this.props;
    request(`/sites/site_builder/editor/settings/${encodeURIComponent(slug)}`)
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          this.setState({data: parsed, updatedData: parsed, pending: false});
        },
        () => {
          this.setState({
            error: 'Failed to load settings from Pinecast',
            pending: false,
          });
        },
      );
  }

  handleChangeAnalyticsID = (analyticsID: string) => {
    this.setState({
      updatedData: {...this.state.updatedData, analytics_id: analyticsID},
    });
  };

  handleChangeApplePodcastsURL = (itunesURL: string) => {
    this.setState({
      updatedData: {
        ...this.state.updatedData,
        itunes_url: itunesURL,
        show_itunes_banner: itunesURL
          ? (this.state.updatedData || {show_itunes_banner: false})
              .show_itunes_banner
          : false,
      },
    });
  };
  handleChangeShowITunesBanner = (showITunesBanner: boolean) => {
    this.setState({
      updatedData: {
        ...this.state.updatedData,
        show_itunes_banner: showITunesBanner,
      },
    });
  };
  handleChangeGooglePlayURL = (googlePlayURL: string) => {
    this.setState({
      updatedData: {...this.state.updatedData, google_play_url: googlePlayURL},
    });
  };
  handleChangeStitcherRadioURL = (stitcherURL: string) => {
    this.setState({
      updatedData: {...this.state.updatedData, stitcher_url: stitcherURL},
    });
  };
  handleChangeCustomDomain = (customDomain: string) => {
    this.setState({
      updatedData: {...this.state.updatedData, custom_cname: customDomain},
    });
  };

  handleSubmit = () => {
    const updatedData = this.state.updatedData;
    this.setState({error: null, pending: true});

    const {csrf, slug} = this.props;
    xhr({
      body: JSON.stringify(updatedData),
      headers: {'X-CSRFToken': csrf},
      method: 'POST',
      url: `/sites/site_builder/editor/settings/${encodeURIComponent(slug)}`,
    })
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          this.setState({data: parsed, updatedData: parsed, pending: false});
          clearCache();
          this.props.onRefresh();
        },
        () => {
          this.setState({error: 'Could not contact Pinecast', pending: false});
        },
      );
  };

  renderInner() {
    const {data, error, pending, updatedData} = this.state;

    if (error) {
      return <ErrorState title={error} />;
    }

    if (!data) {
      return <LoadingState title="Loading site settings…" />;
    }

    if (!updatedData) {
      return;
    }

    return (
      <PanelWrapper>
        <PanelDescription>
          These settings and preferences allow you to customize options that
          don't involve the look and feel of your Pinecast site.
        </PanelDescription>

        <Form onSubmit={this.handleSubmit}>
          <Tabs>
            <Tab name="Subscribe links">
              <PanelSectionDescription>
                Add links to your show on podcast directories to drive listeners
                to subscribe.
              </PanelSectionDescription>

              <Label text="Apple Podcasts URL">
                <TextInput
                  disabled={pending}
                  maxLength={500}
                  onChange={this.handleChangeApplePodcastsURL}
                  pattern="https://itunes\\.apple\\.com/\\w{2,3}/podcast/[^/]+/.+"
                  placeholder="https://itunes.apple.com/us/podcast/almost-better-than-dragons/id981540916?mt=2"
                  value={updatedData.itunes_url || ''}
                />
              </Label>
              <Checkbox
                checked={updatedData.show_itunes_banner}
                disabled={!updatedData.itunes_url}
                onChange={this.handleChangeShowITunesBanner}
                text="Show iTunes directory banner on iOS Safari"
              />

              <Label text="Google Play URL">
                <TextInput
                  disabled={pending}
                  maxLength={500}
                  onChange={this.handleChangeGooglePlayURL}
                  pattern="https://play\\.google\\.com/music/(listen\\?|m/).+"
                  placeholder="https://play.google.com/music/listen?u=0#/ps/Iuscgum4gmep6isira64kdeskjm"
                  value={updatedData.google_play_url || ''}
                />
              </Label>

              <Label text="Stitcher Radio URL">
                <TextInput
                  disabled={pending}
                  maxLength={500}
                  onChange={this.handleChangeStitcherRadioURL}
                  pattern="https?://www\\.stitcher\\.com/podcast/.+"
                  placeholder="https://www.stitcher.com/podcast/this-american-life"
                  value={updatedData.stitcher_url || ''}
                />
              </Label>

              <Button $isBlock $isPrimary pending={pending} type="submit">
                Save
              </Button>
            </Tab>
            <Tab name="Custom domain name">
              <PanelSectionDescription>
                Host your Pinecast website on your own web domain. Once this has
                been set and your DNS settings have been configured, your
                Pinecast website will be available on this domain.
              </PanelSectionDescription>
              <PanelSectionDescription>
                Leaving this field blank will make your website available at{' '}
                <TextPill>
                  {`https://${this.props.slug.toLowerCase()}.pinecast.co/`}
                </TextPill>.
              </PanelSectionDescription>

              <PanelSectionDescription>
                <Link href="http://help.pinecast.com/knowledge-base/custom-domains/configuring-dns-settings-for-a-custom-domain">
                  Instructions for configuring DNS…
                </Link>
              </PanelSectionDescription>

              <Label
                text="Domain"
                subText="Enter the domain name that you've purchased exactly, without slashes."
              >
                <TextInput
                  disabled={pending}
                  onChange={this.handleChangeCustomDomain}
                  pattern="([\\w-]+\\.)+[a-z]+"
                  placeholder="your-domain.com"
                  prefix="http://"
                  value={updatedData.custom_cname || ''}
                />
              </Label>

              <Button $isBlock $isPrimary pending={pending} type="submit">
                Save
              </Button>
            </Tab>
            <Tab name="Integrations">
              <Label
                text="Google Analytics ID"
                subText="If you have a Google Analytics account, you can copy your account ID here to get visitor data reported to your Google Analytics account."
              >
                <TextInput
                  disabled={pending}
                  onChange={this.handleChangeAnalyticsID}
                  pattern="[\\w-]+"
                  placeholder="UA-123456"
                  value={updatedData.analytics_id || ''}
                />
              </Label>

              <Button $isBlock $isPrimary pending={pending} type="submit">
                Save
              </Button>
            </Tab>
          </Tabs>
        </Form>
      </PanelWrapper>
    );
  }

  render() {
    return (
      <React.Fragment>
        <HeaderWrapper>
          <PageHeading>Settings</PageHeading>
        </HeaderWrapper>
        {this.renderInner()}
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ReducerType) => ({
    csrf: state.csrf,
    slug: state.slug,
  }),
  {onRefresh: refresh},
)(SettingsPanel);
