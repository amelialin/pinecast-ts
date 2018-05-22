import * as React from 'react';

import {CSS} from '@pinecast/styles';
import Select from '@pinecast/common/Select';

import * as constants from './constants';
import * as timeframeAndGranularity from './timeframeAndGranularity';

function getOptions(
  view: constants.AnalyticsView,
  timeframe: constants.Timeframe,
): Array<{key: string; label: string}> {
  return timeframeAndGranularity
    .getGranularities(view, timeframe)
    .map(key => ({key, label: constants.GRANULARITY_LABELS[key]}));
}

const GranularityPicker = ({
  onChange,
  style,
  timeframe,
  value,
  view,
}: {
  onChange: (newView: constants.Granularity) => void;
  style?: CSS;
  timeframe: constants.Timeframe;
  value: constants.Granularity;
  view: constants.AnalyticsView;
}) => {
  const options = getOptions(view, timeframe);
  if (options.length === 1 || !timeframeAndGranularity.hasGranularity(view)) {
    return null;
  }
  return (
    <Select onChange={onChange} options={options} style={style} value={value} />
  );
};

export default GranularityPicker;
