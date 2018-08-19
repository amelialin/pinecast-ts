import * as React from 'react';

import {gettext} from '@pinecast/i18n';

const BankDetails = ({
  externalAccount: {bank_name, country, last4},
}: {
  externalAccount: {bank_name: string; country: string; last4: string};
}) => (
  <div className="panel bank-details-container">
    <div className="segment-fill">
      <b>{gettext('Account number')}</b>
      <br />
      {`···· ${last4}`}
    </div>
    <div className="segment-divide">
      <b>{gettext('Bank')}</b>
      <br />
      {bank_name}
    </div>
    <div className="segment-divide">
      <b>{gettext('Country')}</b>
      <br />
      {country}
    </div>
  </div>
);

export default BankDetails;
