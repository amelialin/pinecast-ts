import {Elements as StripeElements} from 'react-stripe-elements';
import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';

const Elements = ({children}: {children: React.ReactNode}) => (
  <StripeElements
    fonts={[
      {
        cssSrc: `https://fonts.googleapis.com/css?family=${DEFAULT_FONT}:400,500`,
      },
    ]}
  >
    {children}
  </StripeElements>
);

export default Elements;
