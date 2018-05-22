import * as React from 'react';

import Card from '@pinecast/common/Card';
import ErrorState from '@pinecast/common/ErrorState';
import Group from '@pinecast/common/Group';
import LoadingState from '@pinecast/common/LoadingState';
import ProBadge from '@pinecast/common/ProBadge';
import styled from '@pinecast/styles';
import Upsell from '@pinecast/common/Upsell';
import {url} from '@pinecast/common/helpers';

import * as constants from './constants';
import GranularityPicker from './GranularityPicker';
import Loader, {State as LoaderState} from './Loader';
import * as persist from './persist';
import {Provider} from './Config';
import render from './charts';
import * as timeframeAndGranularity from './timeframeAndGranularity';
import TimeframePicker from './TimeframePicker';
import TypePicker from './TypePicker';

const Toolbar = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 16,

  '@media (max-width: 500px)': {
    flexDirection: 'column',
  },
});

export default class AnalyticsDash extends React.Component {
  static selector = '.placeholder-analytics-dash';

  static propExtraction = {
    episode: (e: HTMLElement) => e.getAttribute('data-episode'),
    network: (e: HTMLElement) => e.getAttribute('data-network'),
    isOwner: (e: HTMLElement) =>
      e.getAttribute('data-is-podcast-owner') === 'true',
    isPro: (e: HTMLElement) => e.getAttribute('data-is-pro') === 'true',
    isStarter: (e: HTMLElement) => e.getAttribute('data-is-starter') === 'true',
    podcast: (e: HTMLElement) => e.getAttribute('data-podcast'),
    upgradeURL: (e: HTMLElement) => e.getAttribute('data-upgrade-url'),
  };

  props: {
    episode: string | null;
    network: string | null;
    isOwner: boolean;
    isPro: boolean;
    isStarter: boolean;
    podcast: string | null;
    upgradeURL: string;
  };
  state: {
    error: string | null;
    granularity: constants.Granularity;
    timeframe: constants.Timeframe;
    view: constants.AnalyticsView;
  };

  constructor(props: AnalyticsDash['props']) {
    super(props);
    this.state = {
      error: null,
      view: persist.get(
        'dash.view',
        constants.TYPE_LISTENS,
      ) as constants.AnalyticsView,
      // These are just happy defaults because we know the default view is
      // always TYPE_LISTENS, above.
      granularity: persist.get(
        'dash.granularity',
        'daily',
      ) as constants.Granularity,
      timeframe: persist.get('dash.timeframe', 'month') as constants.Timeframe,
    };
  }

  componentDidUpdate() {
    const {granularity, timeframe, view} = this.state;
    persist.set('dash.view', view);
    persist.set('dash.granularity', granularity);
    persist.set('dash.timeframe', timeframe);
  }

  getType(): 'network' | 'episode' | 'podcast' {
    if (this.props.network) {
      return 'network';
    }
    if (this.props.episode) {
      return 'episode';
    }
    return 'podcast';
  }

  getQueryString(): string {
    const type = this.getType();
    const {granularity, timeframe, view} = this.state;
    return (
      url`${type}=${this.props[type] as string}` +
      (timeframeAndGranularity.hasGranularity(view)
        ? url`&interval=${granularity}`
        : '') +
      (timeframeAndGranularity.hasTimeframe(view)
        ? url`&timeframe=${timeframe}`
        : '')
    );
  }

  handleError = (error: string) => {
    this.setState({error});
  };
  clearError = () => {
    this.setState({error: null});
  };

  handleChangeType = (view: constants.AnalyticsView) => {
    this.setState({
      view,
      error: null,
      granularity: timeframeAndGranularity.getDefaultGranularity(
        view,
        this.state.granularity,
        this.state.timeframe,
      ),
      timeframe: timeframeAndGranularity.getDefaultTimeframe(
        view,
        this.state.timeframe,
      ),
    });
  };
  handleChangeTimeframe = (timeframe: constants.Timeframe) => {
    this.setState({
      timeframe,
      granularity: timeframeAndGranularity.getDefaultGranularity(
        this.state.view,
        this.state.granularity,
        timeframe,
      ),
    });
  };
  handleChangeGranularity = (granularity: constants.Granularity) => {
    this.setState({granularity});
  };

  renderToolbar() {
    return (
      <Toolbar>
        <TypePicker
          onChange={this.handleChangeType}
          type={this.getType()}
          view={this.state.view}
        />
        <Group spacing={8}>
          <TimeframePicker
            onChange={this.handleChangeTimeframe}
            value={this.state.timeframe}
            view={this.state.view}
          />
          <GranularityPicker
            onChange={this.handleChangeGranularity}
            timeframe={this.state.timeframe}
            value={this.state.granularity}
            view={this.state.view}
          />
        </Group>
      </Toolbar>
    );
  }

  handleUpgrade = () => {
    window.location.href = '/payments/upgrade';
  };

  renderChart = (state: LoaderState) => {
    if (state.isLoading) {
      return <LoadingState title="Loading analytics…" />;
    }

    return render(this.state.view, state.data, state.episodes || null);
  };

  renderBody() {
    if (this.state.error) {
      return (
        <ErrorState
          actionLabel="Retry"
          onAction={this.clearError}
          title={this.state.error}
        />
      );
    }
    const type = this.getType();
    const {isOwner, isPro, isStarter} = this.props;
    if (
      constants.TYPES_CHART_REQUIRES[this.state.view] === 'pro' &&
      type !== 'network' &&
      !isPro
    ) {
      return (
        <Upsell
          actionLabel={isOwner ? 'Upgrade to Pro' : undefined}
          copy={
            isOwner ? (
              <React.Fragment>
                These analytics are for podcasts owned by <ProBadge />{' '}
                customers.
              </React.Fragment>
            ) : (
              <React.Fragment>
                These analytics are available for <ProBadge /> customers.
              </React.Fragment>
            )
          }
          onAction={this.handleUpgrade}
          title="See more with Pro analytics"
        />
      );
    }
    if (
      constants.TYPES_CHART_REQUIRES[this.state.view] === 'starter' &&
      type !== 'network' &&
      !isPro &&
      !isStarter
    ) {
      return (
        <Upsell
          actionLabel={isOwner ? 'Upgrade to Starter' : undefined}
          copy={
            isOwner ? (
              <React.Fragment>
                These analytics are for podcasts owned by Starter customers.
              </React.Fragment>
            ) : (
              <React.Fragment>
                These analytics are available for Starter customers.
              </React.Fragment>
            )
          }
          onAction={this.handleUpgrade}
          title="More analytics with Starter"
        />
      );
    }

    return (
      <Loader
        analyticsType={this.getType()}
        analyticsView={this.state.view}
        onError={this.handleError}
        queryString={this.getQueryString()}
      >
        {this.renderChart}
      </Loader>
    );
  }

  render() {
    return (
      <Provider
        value={{
          queryString: this.getQueryString(),
          type: this.getType(),
          view: this.state.view,
        }}
      >
        {this.renderToolbar()}
        <Card style={{padding: '12px 12px 12px'}} whiteBack>
          {this.renderBody()}
        </Card>
      </Provider>
    );
  }
}
