import * as React from 'react';

import Card from '@pinecast/common/Card';
import {gettext} from '@pinecast/i18n';
import styled from '@pinecast/styles';

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
      <Heading>{gettext('Account number')}</Heading>
      {`···· ${last4}`}
    </Divide>
    <Fill>
      <Heading>{gettext('Bank')}</Heading>
      {bank_name}
    </Fill>
    <Divide>
      <Heading>{gettext('Country')}</Heading>
      {country}
    </Divide>
  </Card>
);

export default BankDetails;
