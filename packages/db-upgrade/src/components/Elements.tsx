import {Elements as StripeElements} from 'react-stripe-elements';
import * as React from 'react';

import {Children} from '@pinecast/common/types';
import {DEFAULT_FONT} from '@pinecast/common/constants';

const Elements = ({children}: {children: Children}) => (
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
