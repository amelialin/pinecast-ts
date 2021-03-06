import * as numeral from 'numeral';
import * as React from 'react';

import {DashboardTitle} from '@pinecast/common/Text';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import styled from '@pinecast/styles';

const messages = defineMessages({
  title: {
    id: 'db-ads.UsageCard.title',
    description: 'Title for usage card',
    defaultMessage: 'Usage for this billing cycle',
  },
  swaps: {
    id: 'db-ads.UsageCard.swaps',
    description: 'Unit for number of swaps',
    defaultMessage: 'swaps',
  },
  cost: {
    id: 'db-ads.UsageCard.cost',
    description: 'Label for bill amount',
    defaultMessage: 'cost',
  },
});

const Wrapper = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
});
const UseItem = styled('div', {
  ':not(:first-child)': {
    marginLeft: 20,
  },
});
const UseItemTitle = styled('strong', {
  display: 'block',
  fontSize: 28,
  fontWeight: 500,
  lineHeight: '1em',
});
const UseItemValue = styled('span', {
  display: 'block',
  fontSize: 14,
  fontWeight: 400,
});

const UsageCard = ({cost, swaps}: {cost: number; swaps: number}) => (
  <React.Fragment>
    <DashboardTitle>
      <FormattedMessage {...messages.title} />
    </DashboardTitle>
    <Wrapper>
      <UseItem>
        <UseItemTitle>{numeral(swaps).format('0,0')}</UseItemTitle>
        <UseItemValue>
          <FormattedMessage {...messages.swaps} />
        </UseItemValue>
      </UseItem>
      <UseItem>
        <UseItemTitle>{numeral(cost / 100).format('$0,0[.]00')}</UseItemTitle>
        <UseItemValue>
          <FormattedMessage {...messages.cost} />
        </UseItemValue>
      </UseItem>
    </Wrapper>
  </React.Fragment>
);
export default UsageCard;
