import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';
import {Omit} from './types';

const style = ({
  $shadow,
  $whiteBack,
}: {
  $shadow: boolean;
  $whiteBack: boolean;
}) => ({
  backgroundColor: $whiteBack ? '#fff' : undefined,
  border: 0,
  borderRadius: 2,
  boxShadow: $shadow
    ? '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025)'
    : undefined,
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
});

const cardMap = new Map<string, React.ComponentType>();
function getCard(type: string): React.ComponentType<{[key: string]: any}> {
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
  shadow = true,
  tabindex = null,
  type = 'div',
  whiteBack = false,
  ...rest
}: {
  children: any;
  shadow?: boolean;
  style?: CSS;
  tabindex?: number | null;
  type?: string;
  whiteBack?: boolean;
} & Omit<React.HTMLProps<HTMLDivElement>, 'style'>) => {
  const Card_ = getCard(type);
  return (
    <Card_
      $shadow={shadow}
      $whiteBack={whiteBack}
      tabIndex={tabindex}
      {...rest}
    >
      {children}
    </Card_>
  );
};

export default Card;
