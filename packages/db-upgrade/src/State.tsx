import * as React from 'react';

import {Plan} from './types';

const {
  Consumer,
  Provider: Provider_,
}: React.Context<{
  hasCustomer: boolean;
  onDowngraded: (plan: Plan) => void;
  onUpgraded: (plan: Plan) => void;
  stripeKey: string;
}> = React.createContext({
  hasCustomer: false,
  onDowngraded: () => {},
  onUpgraded: () => {},
  stripeKey: '',
});

export default Consumer;

export const Provider = Provider_;
