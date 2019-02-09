import * as React from 'react';

import * as constants from '../constants';
import CSVLink from '../CSVLink';
import {defineMessages, injectIntl, InjectedIntlProps} from '@pinecast/i18n';
import Legend from './components/Legend';
import LineChartAxes from './components/LineChartAxes';
import LineChartBody from './components/LineChartBody';

import {Episode, TimeSeriesData} from '../types';
import SubToolbar from './components/SubToolbar';
import TimeSeriesTooltips from './components/TimeSeriesTooltips';

const messages = defineMessages({
  timestampLabel: {
    id: 'db-analytics.GrowthChart.csv.timestamp',
    description: 'Timestamp label for CSVs',
    defaultMessage: 'Timestamp',
  },
});

class GrowthChart extends React.Component {
  props: {
    data: TimeSeriesData;
    episodes: Array<Episode> | null;
    view: constants.AnalyticsView;
  } & InjectedIntlProps;
  state: {
    activeSeries: Array<string | number>;
    hovering: string | number | null;
  };

  constructor(props: GrowthChart['props']) {
    super(props);
    this.state = {
      activeSeries: props.data.datasets!.map((_, i) => i),
      hovering: null,
    };
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
        series={this.props.data.datasets!.map((ds, i) => ({
          color: ds.strokeColor || '#bf1d1d',
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
    const {activeSeries, hovering} = this.state;
    return (
      <React.Fragment>
        <LineChartBody
          activeSeries={activeSeries}
          data={this.props.data}
          hovering={hovering}
          xRange={xRange}
          yRange={yRange}
        />
        <TimeSeriesTooltips
          data={this.props.data}
          height={height}
          xRange={xRange}
        />
      </React.Fragment>
    );
  };

  getYRange(): [number, number] {
    const {data} = this.props;
    const {activeSeries} = this.state;
    return [
      0,
      Math.max(
        0,
        ...data.datasets!.map((ds, i) =>
          activeSeries.includes(i) ? Math.max(0, ...ds.data) : 0,
        ),
      ),
    ];
  }

  handleChartTypeChange = (newChecked: boolean) => {
    this.setState({chartType: newChecked ? 'area' : 'line'});
  };

  getCSVData = () => {
    const {
      data: {datasets = [], labels},
    } = this.props;
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
    return (
      <SubToolbar>
        <CSVLink data={this.getCSVData} />
      </SubToolbar>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderSubToolbar()}
        <LineChartAxes labels={this.props.data.labels} range={this.getYRange()}>
          {this.renderSeries}
        </LineChartAxes>
        {this.renderLegend()}
      </React.Fragment>
    );
  }
}

export default injectIntl(GrowthChart);
