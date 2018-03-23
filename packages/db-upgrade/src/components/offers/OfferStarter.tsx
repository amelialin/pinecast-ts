import * as React from 'react';

import {Children} from '@pinecast/common/types';
import styled from '@pinecast/styles';

import OfferBase from './OfferBase';
import Reason from './Reason';

const DetailsWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  fontSize: 16,
  padding: '16px 0 36px',
});

const OfferStarter = ({children}: {children: Children}) => (
  <OfferBase period="month" planName="Starter plan" price={500}>
    <React.Fragment>
      <DetailsWrapper>
        <Reason>64MB/episode size limit</Reason>
        <Reason>Unlimited shows</Reason>
        <Reason>Unlimited episodes</Reason>
        <Reason>Unlimited bandwidth and storage</Reason>
        <Reason>$0 convenience fee tip jar</Reason>
        <Reason>Comprehensive analytics</Reason>
        <Reason>Customizable podcast website</Reason>
      </DetailsWrapper>
      {children}
    </React.Fragment>
  </OfferBase>
);

export default OfferStarter;
