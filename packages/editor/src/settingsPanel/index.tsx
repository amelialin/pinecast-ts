import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import Button from '../common/Button';
import ErrorState from '../common/ErrorState';
import Form from '../common/Form';
import Label from '../common/Label';
import LoadingState from '../common/LoadingState';
import {
  PageHeading,
  PanelDescription,
  PanelDivider,
  PanelWrapper,
} from '../panelComponents';
import {ReducerType} from '../reducer';
import {refresh} from '../actions/preview';
import request, {clearCache} from '../data/requests';
import TextInput from '../common/TextInput';
import xhr from '../data/xhr';

const HeaderWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Settings {
  analytics_id: string;
  itunes_url: string;
  google_play_url: string;
  stitcher_url: string;
}

class SettingsPanel extends React.PureComponent {
  props: {csrf: string; onRefresh: () => void; slug: string};
  state: {
    data: Settings | null;
    error: string | null;
    updatedData: Settings | null;
  } = {
    data: null,
    error: null,

    updatedData: null,
  };

  componentDidMount() {
    const {slug} = this.props;
    request(`/sites/site_builder/editor/settings/${encodeURIComponent(slug)}`)
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          this.setState({data: parsed, updatedData: parsed});
        },
        () => {
          this.setState({error: 'Failed to load settings from Pinecast'});
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
      updatedData: {...this.state.updatedData, itunes_url: itunesURL},
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

  handleSubmit = () => {};

  renderInner() {
    const {data, updatedData} = this.state;
    if (!updatedData) {
      return;
    }

    return (
      <PanelWrapper>
        <Form onSubmit={this.handleSubmit}>
          <Label
            text="Google Analytics ID"
            subText="If you have a Google Analytics account, you can copy your account ID here to get visitor data reported to your Google Analytics account."
          >
            <TextInput
              onChange={this.handleChangeAnalyticsID}
              pattern="[\\w-]+"
              placeholder="UA-123456"
              value={updatedData.analytics_id}
            />
          </Label>

          <PanelDivider />

          <Label text="Apple Podcasts URL">
            <TextInput
              onChange={this.handleChangeApplePodcastsURL}
              pattern="https://itunes\\.apple\\.com/la/podcast/[^\\/]+/.+"
              placeholder="https://itunes.apple.com/la/podcast/almost-better-than-dragons/id981540916?mt=2"
              value={updatedData.itunes_url}
            />
          </Label>

          <Label text="Google Play URL">
            <TextInput
              onChange={this.handleChangeGooglePlayURL}
              pattern="https://play\\.google\\.com/music/listen?u=0#.+"
              placeholder="https://play.google.com/music/listen?u=0#/ps/Iuscgum4gmep6isira64kdeskjm"
              value={updatedData.google_play_url}
            />
          </Label>

          <Label text="Stitcher Radio URL">
            <TextInput
              onChange={this.handleChangeStitcherRadioURL}
              pattern="https?://www\\.stitcher\\.com/podcast/.+"
              placeholder="https://www.stitcher.com/podcast/this-american-life"
              value={updatedData.stitcher_url}
            />
          </Label>

          <Button $isPrimary>Save</Button>
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
