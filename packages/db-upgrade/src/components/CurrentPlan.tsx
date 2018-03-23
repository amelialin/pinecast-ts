import * as React from 'react';

import Card from '@pinecast/common/Card';
import ProBadge from '@pinecast/common/ProBadge';
import styled from '@pinecast/styles';

import {Plan} from '../types';

const Name = styled('strong', {
  display: 'block',
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 12,
});
const Description = styled('p', {
  display: 'block',
  fontSize: 14,
  lineHeight: 24,
  margin: 0,
});

const CurrentPlan = ({plan}: {plan: Plan}) => {
  let inner;
  switch (plan) {
    case 'pro':
      inner = (
        <div>
          <Name>
            <ProBadge />
            Pro plan
          </Name>
          <Description>
            Track your podcast with the best analytics available, monetize with
            a customizable tip jar, and collaborate with your fellow producers
            with ease.
          </Description>
        </div>
      );
      break;
    case 'starter':
      inner = (
        <div>
          <Name>Starter</Name>
        </div>
      );
      break;
    case 'demo':
      inner = (
        <div>
          <Name>Free</Name>
        </div>
      );
      break;
    case 'community':
      inner = (
        <div>
          <Name>Community</Name>
        </div>
      );
      break;
    default:
      throw new Error(`Unknown plan ${plan}`);
  }

  return (
    <Card style={{margin: '0 auto', maxWidth: 500}} whiteBack>
      {inner}
    </Card>
  );
};

export default CurrentPlan;
