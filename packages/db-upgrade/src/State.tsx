import createReactContext, {Context} from 'create-react-context';

import {Plan} from './types';

const {
  Consumer,
  Provider: Provider_,
}: Context<{
  hasCustomer: boolean;
  onDowngraded: (plan: Plan) => void;
  onUpgraded: (plan: Plan) => void;
  stripeKey: string;
}> = createReactContext({
  hasCustomer: false,
  onDowngraded: () => {},
  onUpgraded: () => {},
  stripeKey: '',
});

export default Consumer;

export const Provider = Provider_;
