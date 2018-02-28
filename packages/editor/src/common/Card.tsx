import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';

function boxShadow(shadow: boolean, hairline: boolean, canFocus: boolean) {
  const focusPlaceholder = canFocus ? ', 0 0 0 transparent' : '';
  if (shadow && hairline) {
    return `0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15)${focusPlaceholder}`;
  }
  if (shadow) {
    return `0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05)${focusPlaceholder}`;
  }
  if (hairline) {
    return `0 0 0 0.5px rgba(0, 0, 0, .15)${focusPlaceholder}`;
  }
}

const style = ({
  $canFocus,
  $shadow,
  $hairline,
}: {
  $canFocus: boolean;
  $shadow: boolean;
  $hairline: boolean;
}) => ({
  border: 0,
  borderRadius: 2,
  boxShadow: boxShadow($shadow, $hairline, $canFocus),
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
  canFocus,
  children,
  hairline = true,
  shadow = true,
  tabindex = null,
  type = 'div',
  ...rest
}: {
  canFocus?: boolean;
  children: any;
  hairline?: boolean;
  shadow?: boolean;
  tabindex?: number | null;
  type?: string;
  [key: string]: any;
}) => {
  const Card_ = getCard(type);
  return (
    <Card_
      $canFocus={tabindex !== -1 || canFocus}
      $hairline={hairline}
      $shadow={shadow}
      tabIndex={tabindex}
      {...rest}
    >
      {children}
    </Card_>
  );
};

export default Card;
