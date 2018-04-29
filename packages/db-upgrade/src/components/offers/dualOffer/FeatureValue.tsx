import * as React from 'react';

import {Check, Cross} from '@pinecast/common/icons';

import {Feature} from './topicData';
import {Td} from './TableCells';

const FeatureValue = ({
  feature,
  forPlan,
}: {
  feature: Feature;
  forPlan: 'starter' | 'pro';
}) => (
  <Td>
    {forPlan === 'starter' &&
      (feature.textStarter ||
        (feature.inStarter ? (
          <Check
            aria-label="Include"
            color="#51D197"
            style={{verticalAlign: 'middle'}}
          />
        ) : (
          <Cross
            aria-label="Not included"
            color="#eeefea"
            style={{verticalAlign: 'middle'}}
          />
        )))}
    {forPlan === 'pro' &&
      (feature.textPro ||
        (feature.inPro ? (
          <Check
            aria-label="Include"
            color="#51D197"
            style={{verticalAlign: 'middle'}}
          />
        ) : (
          <Cross
            aria-label="Not included"
            color="#eeefea"
            style={{verticalAlign: 'middle'}}
          />
        )))}
  </Td>
);

export default FeatureValue;
