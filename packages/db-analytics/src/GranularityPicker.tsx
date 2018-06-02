import * as React from 'react';

import {CSS} from '@pinecast/styles';
import Select from '@pinecast/common/Select';

import * as constants from './constants';
import {Consumer} from './Config';
import * as timeframeAndGranularity from './timeframeAndGranularity';

const GranularityPicker = ({
  onChange,
  style,
  timeframe,
  value,
}: {
  onChange: (newView: constants.Granularity) => void;
  style?: CSS;
  timeframe: constants.Timeframe;
  value: constants.Granularity;
}) => (
  <Consumer>
    {({customTimeframe, view}) => {
      const options = timeframeAndGranularity
        .getGranularities(view, timeframe, customTimeframe)
        .map(key => ({key, label: constants.GRANULARITY_LABELS[key]}));
      if (
        options.length === 1 ||
        !timeframeAndGranularity.hasGranularity(view)
      ) {
        return null;
      }
      return (
        <Select
          onChange={onChange}
          options={options}
          style={style}
          value={value}
        />
      );
    }}
  </Consumer>
);

export default GranularityPicker;
