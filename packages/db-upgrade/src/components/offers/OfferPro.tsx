import * as React from 'react';

import styled from '@pinecast/styles';
import Tag from '@pinecast/common/Tag';

import OfferBase from './OfferBase';
import Reason from './Reason';

const DetailsWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  fontSize: 16,
  padding: '16px 0 36px',
});

const OfferPro = ({children}: {children: React.ReactNode}) => (
  <OfferBase period="month" planName="Pro plan" price={5000}>
    <React.Fragment>
      <DetailsWrapper>
        <Tag color="green" size="large" style={{marginBottom: 8}}>
          Everything from the Starter plan
        </Tag>
        <Reason>256MB/episode size limit</Reason>
        <Reason>Podcast networks and collaboration</Reason>
        <Reason>Comment box</Reason>
        <Reason>Advanced analytics</Reason>
        <Reason>Slack and email notifications, webhooks</Reason>
      </DetailsWrapper>
      {children}
    </React.Fragment>
  </OfferBase>
);

export default OfferPro;
