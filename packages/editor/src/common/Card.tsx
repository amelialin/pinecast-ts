import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';

const style = {
  border: 0,
  borderRadius: 2,
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15), 0 0 0 transparent',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: DEFAULT_FONT,
  fontSize: 'inherit',
  margin: '0 0 20px',
  overflow: 'hidden',
  padding: 20,
  textAlign: 'left',
  transition: 'box-shadow 0.2s',
  width: '100%',
};

const cardMap = new Map<string, React.ComponentType>();
function getCard(type: string): React.ComponentType {
  const existing = cardMap.get(type);
  if (existing) {
    return existing;
  }

  const card = styled(type, style);
  cardMap.set(type, card);
  return card;
}

const Card = ({
  children,
  type = 'div',
  ...rest
}: {
  children: any;
  type?: string;
  [key: string]: any;
}) => {
  const Card_ = getCard(type);
  return <Card_ {...rest}>{children}</Card_>;
};

export default Card;
