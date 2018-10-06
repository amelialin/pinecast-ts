import * as React from 'react';

import Card from '@pinecast/common/Card';
import * as dateHelpers from '@pinecast/common/helpers/dates';
import ErrorState from '@pinecast/common/ErrorState';
import Group from '@pinecast/common/Group';
import LoadingState from '@pinecast/common/LoadingState';
import ProBadge from '@pinecast/common/ProBadge';
import {nullThrows, url} from '@pinecast/common/helpers';
import styled from '@pinecast/styles';
import Upsell from '@pinecast/common/Upsell';

import * as constants from './constants';
import DateRangePicker from './DateRangePicker';
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
    customTimeframe: [Date, Date] | null;
    error: string | null;
    granularity: constants.Granularity;
    timeframe: constants.Timeframe;
    view: constants.AnalyticsView;
  };

  constructor(props: AnalyticsDash['props']) {
    super(props);

    const type = this.getType();
    const customTFPreviousUnparsed = persist.get(`dash.${type}.ctf`, '');
    const customTFPrevious: AnalyticsDash['state']['customTimeframe'] = customTFPreviousUnparsed
      ? (customTFPreviousUnparsed.split(',').map(x => new Date(x)) as [
          Date,
          Date
        ])
      : null;

    this.state = {
      customTimeframe: customTFPrevious,
      error: null,
      view: persist.get(
        `dash.${type}.view`,
        constants.TYPE_LISTENS,
      ) as constants.AnalyticsView,
      // These are just happy defaults because we know the default view is
      // always TYPE_LISTENS, above.
      granularity: persist.get(
        `dash.${type}.granularity`,
        'daily',
      ) as constants.Granularity,
      timeframe: persist.get(
        `dash.${type}.timeframe`,
        'month',
      ) as constants.Timeframe,
    };
  }

  componentDidUpdate() {
    const type = this.getType();
    const {customTimeframe, granularity, timeframe, view} = this.state;
    persist.set(
      `dash.${type}.ctf`,
      customTimeframe
        ? customTimeframe.map(x => x.toISOString()).join(',')
        : '',
    );
    persist.set(`dash.${type}.view`, view);
    persist.set(`dash.${type}.granularity`, granularity);
    persist.set(`dash.${type}.timeframe`, timeframe);
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

  getQueryStringTimeframe(): string {
    if (!timeframeAndGranularity.hasTimeframe(this.state.view)) {
      return '';
    }
    const out = url`&timeframe=${this.state.timeframe}`;
    if (this.state.timeframe !== 'custom') {
      return out;
    }
    return (
      out +
      url`&tf_range=${nullThrows(this.state.customTimeframe)
        .map(x => x.toISOString())
        .join(',')}`
    );
  }
  getQueryString(): string {
    const type = this.getType();
    const {view} = this.state;
    const timeframe = this.getQueryStringTimeframe();
    const granularity = timeframeAndGranularity.hasGranularity(view)
      ? url`&interval=${this.state.granularity}`
      : '';
    const timezone = url`&tz=${new Date().getTimezoneOffset() / 60}`;
    if (type === 'episode') {
      return (
        url`episode=${nullThrows(this.props.episode)}&podcast=${nullThrows(
          this.props.podcast,
        )}` +
        granularity +
        timeframe +
        timezone
      );
    }
    return (
      url`${type}=${this.props[type] as string}` +
      granularity +
      timeframe +
      timezone
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
        this.state.customTimeframe,
      ),
      timeframe: timeframeAndGranularity.getDefaultTimeframe(
        view,
        this.state.timeframe,
      ),
    });
  };
  handleChangeTimeframe = (timeframe: constants.Timeframe) => {
    const customTimeframe =
      timeframe === 'custom'
        ? this.getDefaultCustomTimeframe()
        : this.state.customTimeframe;
    this.setState({
      timeframe,
      granularity: timeframeAndGranularity.getDefaultGranularity(
        this.state.view,
        this.state.granularity,
        timeframe,
        customTimeframe,
      ),
      customTimeframe,
    });
  };
  handleChangeGranularity = (granularity: constants.Granularity) => {
    this.setState({granularity});
  };

  getDefaultCustomTimeframe(): [Date, Date] {
    const {customTimeframe, timeframe} = this.state;
    if (timeframe === 'custom') {
      return [nullThrows(customTimeframe)[0], dateHelpers.endOfDay(new Date())];
    }

    const durations = {
      day: 1,
      week: 7,
      month: 30,
      sixmonth: 30 * 6,
      year: 365,
      all: 365, // whatever
    };
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - durations[timeframe]);

    return [
      dateHelpers.startOfDay(startDate),
      dateHelpers.endOfDay(new Date()),
    ];
  }

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
          />
        </Group>
      </Toolbar>
    );
  }

  isOutsideRange = (day: Date) => {
    const ctf = nullThrows(this.state.customTimeframe);
    return (
      dateHelpers.addDays(ctf[0], 365) < day ||
      dateHelpers.addDays(ctf[1], -365) > day ||
      day > dateHelpers.addDays(dateHelpers.startOfDay(new Date()), 1)
    );
  };
  handleCustomTimeframeChanged = ({
    endDate,
    startDate,
  }: {
    endDate: Date;
    startDate: Date;
  }) => {
    const customTimeframe: [Date, Date] = [startDate, endDate];
    this.setState({
      customTimeframe,
      granularity: timeframeAndGranularity.getDefaultGranularity(
        this.state.view,
        this.state.granularity,
        this.state.timeframe,
        customTimeframe,
      ),
    });
  };

  renderCustomTimeframe() {
    const {customTimeframe, timeframe} = this.state;
    const [startDate, endDate] = nullThrows(customTimeframe);
    return (
      timeframe === 'custom' && (
        <DateRangePicker
          endDate={startDate}
          isOutsideRange={this.isOutsideRange}
          onDatesChanged={this.handleCustomTimeframeChanged}
          startDate={endDate}
        />
      )
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
                These analytics are for podcasts owned by{' '}
                <ProBadge marginRight={false} /> customers.
              </React.Fragment>
            ) : (
              <React.Fragment>
                These analytics are available for{' '}
                <ProBadge marginRight={false} /> customers.
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
        analyticsType={type}
        analyticsView={this.state.view}
        loadEpisodes={
          type !== 'episode' &&
          constants.TYPES_CHART_TYPES[this.state.view] === 'timeseries' &&
          this.state.timeframe !== 'all'
        }
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
          customTimeframe: this.state.customTimeframe,
          queryString: this.getQueryString(),
          type: this.getType(),
          view: this.state.view,
        }}
      >
        {this.renderToolbar()}
        {this.renderCustomTimeframe()}
        <Card style={{padding: '12px 12px 12px'}} whiteBack>
          {this.renderBody()}
        </Card>
      </Provider>
    );
  }
}
