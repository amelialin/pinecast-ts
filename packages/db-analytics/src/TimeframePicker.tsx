import * as React from 'react';

import {CSS} from '@pinecast/styles';
import Select from '@pinecast/common/Select';

import * as constants from './constants';
import * as timeframeAndGranularity from './timeframeAndGranularity';

function getOptions(
  view: constants.AnalyticsView,
): Array<{key: string; label: string}> {
  return timeframeAndGranularity
    .getTimeframes(view)
    .map(key => ({key, label: constants.TIMEFRAME_LABELS[key]}));
}

const TimeframePicker = ({
  onChange,
  style,
  value,
  view,
}: {
  onChange: (newView: constants.Timeframe) => void;
  style?: CSS;
  value: constants.Timeframe;
  view: constants.AnalyticsView;
}) => {
  const options = getOptions(view);
  if (options.length === 1 || !timeframeAndGranularity.hasTimeframe(view)) {
    return null;
  }
  return (
    <Select onChange={onChange} options={options} style={style} value={value} />
  );
};

export default TimeframePicker;
