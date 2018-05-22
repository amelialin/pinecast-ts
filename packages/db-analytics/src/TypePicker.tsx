import * as React from 'react';

import {memoize} from '@pinecast/common/helpers';
import ProBadge from '@pinecast/common/ProBadge';
import SelectCustom, {Option} from '@pinecast/common/SelectCustom';
import styled, {CSS} from '@pinecast/styles';

import * as constants from './constants';

const Wrap = styled('div', {
  '@media (max-width: 500px)': {
    marginBottom: 12,
  },
} as CSS);

const options = memoize((type: constants.AnalyticsType) =>
  constants.TYPES[type].map((view): Option => {
    const proTag =
      constants.TYPES_CHART_REQUIRES[view] === 'pro' && type !== 'network';
    return {
      key: view,
      render: proTag
        ? () => (
            <React.Fragment>
              <ProBadge /> {constants.TYPES_NAMES[view]}
            </React.Fragment>
          )
        : () => constants.TYPES_NAMES[view],
    };
  }),
);

const TypePicker = ({
  onChange,
  view,
  type,
}: {
  onChange: (newView: constants.AnalyticsView) => void;
  view: constants.AnalyticsView;
  type: constants.AnalyticsType;
}) => (
  <Wrap>
    <SelectCustom onChange={onChange} options={options(type)} value={view} />
  </Wrap>
);

export default TypePicker;
