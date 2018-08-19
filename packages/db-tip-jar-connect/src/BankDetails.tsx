import * as React from 'react';

import Card from '@pinecast/common/Card';
import {gettext} from '@pinecast/i18n';
import styled from '@pinecast/styles';

const Fill = styled('div', {flex: '2 2'});
const Divide = styled('div', {flex: '1 1', paddingLeft: 12});

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
    <Fill>
      <b>{gettext('Account number')}</b>
      <br />
      {`···· ${last4}`}
    </Fill>
    <Divide>
      <b>{gettext('Bank')}</b>
      <br />
      {bank_name}
    </Divide>
    <Divide>
      <b>{gettext('Country')}</b>
      <br />
      {country}
    </Divide>
  </Card>
);

export default BankDetails;
