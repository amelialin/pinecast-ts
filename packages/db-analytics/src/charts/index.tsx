import * as React from 'react';

import * as constants from '../constants';
import CityChart from './CityChart';
import CountryChart from './CountryChart';
import {Episode} from '../types';
import GrowthChart from './GrowthChart';
import {
  BreakdownData,
  Data,
  GeographicData,
  GranularGeographicData,
  MenuData,
  TabularData,
  TimeSeriesData,
} from '../types';
import Menu from './Menu';
import Table from './Table';
import SharesChart from './SharesChart';
import TimeSeriesChart from './TimeSeriesChart';

export default function render(
  view: constants.AnalyticsView,
  data: Data,
  episodes: Array<Episode> | null,
  chartTypeOverride?: string,
): React.ReactNode {
  switch (chartTypeOverride || constants.TYPES_CHART_TYPES[view]) {
    case 'geo':
      return <CountryChart data={data as GeographicData} />;
    case 'geo_gran':
      return <CityChart data={data as GranularGeographicData} />;
    case 'growth':
      return (
        <GrowthChart
          data={data as TimeSeriesData}
          episodes={episodes}
          view={view}
        />
      );
    case 'menu':
      return <Menu data={data as MenuData} view={view} />;
    case 'pie':
      return <SharesChart data={data as BreakdownData} />;
    case 'table':
      return <Table data={data as TabularData} />;
    case 'timeseries':
      return (
        <TimeSeriesChart
          data={data as TimeSeriesData}
          episodes={episodes}
          view={view}
        />
      );
    default:
      throw new Error(`Unrecognized chart type for view ${view}`);
  }
}
