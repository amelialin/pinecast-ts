import * as React from 'react';

import Card from '@pinecast/common/Card';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import styled from '@pinecast/styles';

const messages = defineMessages({
  accountNumber: {
    id: 'db-tip-jar-connect.BankDetails.accountNumber',
    description: 'Abbreviated account number heading',
    defaultMessage: 'Account number',
  },
  bank: {
    id: 'db-tip-jar-connect.BankDetails.bank',
    description: 'Heading for bank account name',
    defaultMessage: 'Bank',
  },
  country: {
    id: 'db-tip-jar-connect.BankDetails.country',
    description: 'Heading for bank account country',
    defaultMessage: 'Country',
  },
});

const Fill = styled('div', {flex: '2 2', paddingRight: 12});
const Divide = styled('div', {flex: '1 1', paddingRight: 12});
const Heading = styled('b', {display: 'block', whiteSpace: 'nowrap'});

const BankDetails = ({
  externalAccount: {bank_name, country, last4},
}: {
  externalAccount: {bank_name: string; country: string; last4: string};
}) => (
  <Card
    style={{
      flexDirection: 'row',
      justifyContent: 'stretch',
      marginTop: 16,
      maxWidth: 500,
    }}
    whiteBack
  >
    <Divide>
      <Heading>
        <FormattedMessage {...messages.accountNumber} />
      </Heading>
      {`···· ${last4}`}
    </Divide>
    <Fill>
      <Heading>
        <FormattedMessage {...messages.bank} />
      </Heading>
      {bank_name}
    </Fill>
    <Divide>
      <Heading>
        <FormattedMessage {...messages.country} />
      </Heading>
      {country}
    </Divide>
  </Card>
);

export default BankDetails;
