import {nullThrows} from '@pinecast/common/helpers';

import * as constants from './constants';

export function hasGranularity(view: constants.AnalyticsView): boolean {
  const viewType = constants.TYPES_CHART_TYPES[view];
  return viewType === 'timeseries' || viewType === 'growth';
}
export function hasTimeframe(view: constants.AnalyticsView): boolean {
  const viewType = constants.TYPES_CHART_TYPES[view];
  return viewType !== 'growth';
}

export function getGranularities(
  view: constants.AnalyticsView,
  timeframe: constants.Timeframe,
  tfRange: [Date, Date] | null = null,
): Array<constants.Granularity> {
  if (timeframe === 'custom') {
    const out: Array<constants.Granularity> = ['daily'];
    const start = nullThrows(tfRange)[0].getTime() / 1000;
    const end = nullThrows(tfRange)[1].getTime() / 1000;

    if (end - start < 86400 * 3) {
      out.push('hourly');
    }
    if (end - start > 86400 * 7) {
      out.unshift('weekly');
    }
    if (end - start > 86400 * 30) {
      out.unshift('monthly');
    }
    return out;
  }

  const out = [
    ...(constants.TYPE_GRANULARITIES[view] || constants.DEFAULT_GRANULARITIES),
  ];

  const viewType = constants.TYPES_CHART_TYPES[view];
  if (viewType === 'timeseries') {
    if (timeframe === 'day') {
      return ['hourly'];
    }
    if (timeframe === 'week') {
      return ['daily', 'hourly'];
    }
    if (timeframe === 'all') {
      return ['monthly', 'weekly'];
    }

    return out.filter(granularity => {
      switch (granularity) {
        case 'hourly':
          return false;
        case 'daily':
          return timeframe !== 'year';
        case 'monthly':
          return timeframe !== 'month';
      }
      return true;
    });
  }

  return out;
}

export function getDefaultGranularity(
  newView: constants.AnalyticsView,
  previousGranularity: constants.Granularity,
  timeframe: constants.Timeframe,
  tfRange: [Date, Date] | null,
): constants.Granularity {
  const newGrans = getGranularities(newView, timeframe, tfRange);
  if (newGrans.includes(previousGranularity)) {
    return previousGranularity;
  }
  if (newGrans.includes(constants.DEFAULT_GRANULARITY)) {
    return constants.DEFAULT_GRANULARITY;
  }
  return newGrans[0];
}

export function getTimeframes(
  view: constants.AnalyticsView,
): Array<constants.Timeframe> {
  return constants.TYPE_TIMEFRAMES[view] || constants.DEFAULT_TIMEFRAMES;
}

export function getDefaultTimeframe(
  newView: constants.AnalyticsView,
  previousTimeframe: constants.Timeframe,
): constants.Timeframe {
  const newTFs = getTimeframes(newView);
  if (newTFs.includes(previousTimeframe)) {
    return previousTimeframe;
  }
  if (newTFs.includes(constants.DEFAULT_TIMEFRAME)) {
    return constants.DEFAULT_TIMEFRAME;
  }
  return newTFs[0];
}
