import * as React from 'react';

import Checkbox from '@pinecast/common/Checkbox';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  InjectedIntlProps,
} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import Switch from '@pinecast/common/Switch';

import AreaChartBody from './components/AreaChartBody';
import * as constants from '../constants';
import CSVLink from '../CSVLink';
import {Episode, TimeSeriesData} from '../types';
import EpisodeOverlay from './components/EpisodeOverlay';
import Legend from './components/Legend';
import LineChartAxes from './components/LineChartAxes';
import LineChartBody from './components/LineChartBody';
import * as persist from '../persist';
import SubToolbar from './components/SubToolbar';
import TimeSeriesTooltips from './components/TimeSeriesTooltips';

const messages = defineMessages({
  episodeOption: {
    id: 'db-analytics.TimeSeriesChart.episodeOption',
    description: 'Checkbox option to show episode markers',
    defaultMessage: 'Episodes',
  },
  lineView: {
    id: 'db-analytics.TimeSeriesChart.type.line',
    description: 'Option to show chart as a line chart',
    defaultMessage: 'Line',
  },
  areaView: {
    id: 'db-analytics.TimeSeriesChart.type.area',
    description: 'Option to show chart as an area chart',
    defaultMessage: 'Area',
  },

  timestampLabel: {
    id: 'db-analytics.TimeSeriesChart.csv.timestamp',
    description: 'Timestamp label for CSVs',
    defaultMessage: 'Timestamp',
  },
});

class TimeSeriesChart extends React.Component {
  props: {
    data: TimeSeriesData;
    episodes: Array<Episode> | null;
    view: constants.AnalyticsView;
  } & InjectedIntlProps;
  state: {
    activeSeries: Array<string | number>;
    chartType: 'line' | 'area';
    hovering: string | number | null;
    showEpisodes: boolean;
  };

  constructor(props: TimeSeriesChart['props']) {
    super(props);

    const shouldDefaultToArea =
      constants.LINE_CHART_DEFAULT_DISPLAY_OVERRIDE[props.view] === 'area';
    this.state = {
      activeSeries: (props.data.datasets || []).map((_, i) => i),
      chartType:
        shouldDefaultToArea && this.canHaveAreaChart(props.data)
          ? 'area'
          : 'line',
      hovering: null,
      showEpisodes: persist.get('tschart.showEpisodes', 'true') === 'true',
    };
  }

  componentWillReceiveProps(newProps: TimeSeriesChart['props']) {
    const canHaveArea = this.canHaveAreaChart(newProps.data);
    if (!canHaveArea && this.state.chartType === 'area') {
      this.setState({chartType: 'line'});
    } else if (
      canHaveArea &&
      constants.LINE_CHART_DEFAULT_DISPLAY_OVERRIDE[newProps.view] === 'area'
    ) {
      this.setState({chartType: 'area'});
    }
  }

  canHaveAreaChart(data: TimeSeriesData) {
    return data && data.datasets && data.datasets.length > 1;
  }

  handleHover = (key: string | number) => this.setState({hovering: key});
  handleUnhover = (key: string | number) => {
    if (this.state.hovering === key) {
      this.setState({hovering: null});
    }
  };
  handleActivate = (key: string | number) => {
    if (!this.state.activeSeries.includes(key)) {
      this.setState({activeSeries: [...this.state.activeSeries, key]});
    }
  };
  handleDeactivate = (key: string | number) => {
    this.setState({
      activeSeries: this.state.activeSeries.filter(x => x !== key),
    });
  };

  renderLegend = () => {
    return (
      <Legend
        activeSeries={this.state.activeSeries}
        hoveringSeries={this.state.hovering}
        series={this.props.data.datasets.map((ds, i) => ({
          color: ds.strokeColor || 'red', // TODO: Ehh
          key: i,
          label: ds.label,
          total: ds.data.reduce((acc, cur) => acc + cur, 0),
        }))}
        showTotal={constants.TYPES_SHOW_TOTAL[this.props.view] || false}
        onActivate={this.handleActivate}
        onDeactivate={this.handleDeactivate}
        onHover={this.handleHover}
        onUnhover={this.handleUnhover}
        view={this.props.view}
      />
    );
  };

  renderSeries = ({
    height,
    width,
    xRange,
    yRange,
  }: {
    height: number;
    width: number;
    xRange: (n: number) => number;
    yRange: (n: number) => number;
  }) => {
    const overlay =
      this.props.episodes && this.state.showEpisodes ? (
        <EpisodeOverlay
          baseline={yRange(0)}
          data={this.props.data}
          episodes={this.props.episodes}
          xOffset={xRange(0)}
          width={width}
        />
      ) : null;
    const tooltips = (
      <TimeSeriesTooltips
        data={this.props.data}
        height={height}
        xRange={xRange}
      />
    );

    const {activeSeries, chartType, hovering} = this.state;
    if (chartType === 'line') {
      return (
        <React.Fragment>
          <LineChartBody
            activeSeries={activeSeries}
            data={this.props.data}
            hovering={hovering}
            xRange={xRange}
            yRange={yRange}
          />
          {tooltips}
          {overlay}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <AreaChartBody
            activeSeries={activeSeries}
            data={this.props.data}
            height={height}
            hovering={hovering}
            width={width}
            xRange={xRange}
            yRange={yRange}
          />
          {tooltips}
          {overlay}
        </React.Fragment>
      );
    }
  };

  getYRange = (data: TimeSeriesData): [number, number] => {
    const {activeSeries} = this.state;
    if (this.state.chartType === 'line') {
      return [
        Math.min(
          0,
          ...data.datasets.map(
            (ds, i) => (activeSeries.includes(i) ? Math.min(0, ...ds.data) : 0),
          ),
        ),
        Math.max(
          0,
          ...data.datasets.map(
            (ds, i) => (activeSeries.includes(i) ? Math.max(0, ...ds.data) : 0),
          ),
        ),
      ];
    } else {
      return [
        0,
        Math.max(
          0,
          ...data.labels.map((_, i) =>
            data.datasets
              .filter((_, i) => activeSeries.includes(i))
              .reduce(
                (acc, cur) =>
                  acc + cur.data[i - (data.labels.length - cur.data.length)] ||
                  0,
                0,
              ),
          ),
        ),
      ];
    }
  };

  handleChartTypeChange = (newChecked: boolean) => {
    this.setState({chartType: newChecked ? 'area' : 'line'});
  };
  handleChangeShowEpisodes = (newState: boolean) => {
    this.setState({showEpisodes: newState});
    persist.set('tschart.showEpisodes', newState ? 'true' : 'false');
  };

  getCSVData = () => {
    const {datasets, labels} = this.props.data;
    return [
      [
        this.props.intl.formatMessage(messages.timestampLabel),
        ...datasets.map(ds => ds.label),
      ],
      ...labels.map((label, i) => [
        label,
        ...datasets.map(ds => ds.data[labels.length - ds.data.length + i]),
      ]),
    ];
  };

  renderSubToolbar() {
    const {data, episodes} = this.props;
    const {chartType, showEpisodes} = this.state;

    return (
      <SubToolbar>
        <Group spacing={16}>
          {Boolean(episodes) && (
            <Checkbox
              checked={showEpisodes}
              onChange={this.handleChangeShowEpisodes}
              style={{paddingBottom: 0}}
              text={<FormattedMessage {...messages.episodeOption} />}
            />
          )}
          {this.canHaveAreaChart(data) && (
            <Switch
              activeColor="#708d9e"
              checked={chartType === 'area'}
              offText={<FormattedMessage {...messages.lineView} />}
              onChange={this.handleChartTypeChange}
              style={{paddingBottom: 0}}
              text={<FormattedMessage {...messages.areaView} />}
            />
          )}
          <CSVLink data={this.getCSVData} />
        </Group>
      </SubToolbar>
    );
  }

  render() {
    if (!this.props.data.datasets) {
      return null;
    }
    return (
      <React.Fragment>
        {this.renderSubToolbar()}
        <LineChartAxes
          labels={this.props.data.labels}
          range={this.getYRange(this.props.data)}
        >
          {this.renderSeries}
        </LineChartAxes>
        {this.renderLegend()}
      </React.Fragment>
    );
  }
}

export default injectIntl(TimeSeriesChart);
