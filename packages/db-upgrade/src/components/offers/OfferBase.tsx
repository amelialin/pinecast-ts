import numeral from 'numeral';
import * as React from 'react';

import styled from '@pinecast/styles';

import Card from '@pinecast/common/Card';
import {Children} from '@pinecast/common/types';

const Name = styled('h2', {
  fontSize: 32,
  fontWeight: 500,
});
const Price = styled('div', {
  alignItems: 'center',
  display: 'inline-flex',
  fontSize: 26,
  fontWeight: 400,
  justifyContent: 'center',
  margin: '20px 0 12px',
  textAlign: 'center',

  ':not(:empty)[data-period=month]::before': {
    background: '#000',
    content: '""',
    display: 'inline-block',
    height: 16,
    margin: '0 4px',
    order: 1,
    transform: 'translateY(4px) rotate(35deg)',
    width: 1,
  },
  ':not(:empty)[data-period=month]::after': {
    content: '"mo"',
    display: 'inline-flex',
    fontSize: 18,
    order: 2,
    position: 'relative',
    top: 4,
  },
  ':not(:empty)[data-period=year]::after': {
    content: '"yr"',
    display: 'inline-flex',
    fontSize: 18,
    order: 2,
    position: 'relative',
    top: 4,
  },
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
  <Card style={cardStyles} $whiteBack>
    <Name>{planName}</Name>
    <Price data-period={period}>{numeral(price / 100).format('$0,0')}</Price>
    {children}
  </Card>
);

export default OfferBase;
