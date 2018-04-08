import * as React from 'react';

import styled from '@pinecast/styles';

import Card from '@pinecast/common/Card';
import {Children} from '@pinecast/common/types';

import Price from './Price';

const Name = styled('h2', {
  fontSize: 32,
  fontWeight: 500,
});

const cardStyles: React.CSSProperties = {
  alignItems: 'center',
  margin: '0 auto',
  maxWidth: 400,
  paddingTop: 32,
  textAlign: 'center',
};

const OfferBase = ({
  children,
  planName,
  period = 'month',
  price,
}: {
  children: Children;
  planName: string;
  period?: 'month' | 'year';
  price: number;
}) => (
  <Card style={cardStyles} whiteBack>
    <Name>{planName}</Name>
    <Price
      amount={price}
      period={period === 'month' ? 'mo' : 'yr'}
      size={26}
      style={{margin: '20px 0 12px'}}
    />
    {children}
  </Card>
);

export default OfferBase;
