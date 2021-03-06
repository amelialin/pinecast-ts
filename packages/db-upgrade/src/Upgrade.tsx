import * as React from 'react';
import {StripeProvider} from 'react-stripe-elements';

import {Plan} from './types';
import {Provider} from './State';
import ViewCommunity from './ViewCommunity';
import ViewDemo from './ViewDemo';
import ViewDemoPrevious from './ViewDemoPrevious';
import ViewDowngraded from './ViewDowngraded';
import ViewDowngradedToFree from './ViewDowngradedToFree';
import ViewPro from './ViewPro';
import ViewStarter from './ViewStarter';
import ViewUpgraded from './ViewUpgraded';

export default class Upgrade extends React.Component {
  static selector = '.placeholder-upgrade';

  static propExtraction = {
    currentPlan: (e: HTMLElement) => e.getAttribute('data-plan'),
    hasCustomer: (e: HTMLElement) => e.getAttribute('data-customer') === 'true',
    stripeKey: (e: HTMLElement) =>
      e.getAttribute('data-stripe-publishable-key'),
  };

  props: {
    currentPlan: Plan;
    email: string;
    hasCustomer: boolean;
    stripeKey: string;
  };
  state: {
    currentPlan: Plan;
    downgraded: Plan | null;
    upgraded: Plan | null;
  };

  constructor(props: Upgrade['props']) {
    super(props);
    this.state = {
      currentPlan: props.currentPlan,
      downgraded: null,
      upgraded: null,
    };
  }
  componentWillReceiveProps(newProps: Upgrade['props']) {
    this.setState({currentPlan: newProps.currentPlan});
  }

  handlePlanDowngraded = (newPlan: Plan) => {
    this.setState({downgraded: newPlan, upgraded: null});
  };
  handlePlanUpgraded = (newPlan: Plan) => {
    window.scrollTo(0, 0);
    this.setState({downgraded: null, upgraded: newPlan});
  };

  renderInner() {
    const {currentPlan, downgraded, upgraded} = this.state;

    if (downgraded) {
      if (downgraded === 'demo') {
        return <ViewDowngradedToFree />;
      }
      return <ViewDowngraded currentPlan={downgraded} />;
    }
    if (upgraded) {
      return <ViewUpgraded currentPlan={upgraded} previousPlan={currentPlan} />;
    }

    if (currentPlan === 'pro') {
      return <ViewPro />;
    }
    if (currentPlan === 'starter') {
      return <ViewStarter />;
    }
    if (currentPlan === 'community') {
      return <ViewCommunity />;
    }
    if (currentPlan === 'demo') {
      const {hasCustomer} = this.props;
      if (hasCustomer) {
        return <ViewDemoPrevious />;
      } else {
        return <ViewDemo />;
      }
    }
    return null;
  }

  getValue() {
    return {
      hasCustomer: this.props.hasCustomer,
      onDowngraded: this.handlePlanDowngraded,
      onUpgraded: this.handlePlanUpgraded,
      stripeKey: this.props.stripeKey,
    };
  }

  render() {
    return (
      <StripeProvider apiKey={this.props.stripeKey}>
        <Provider value={this.getValue()}>{this.renderInner()}</Provider>
      </StripeProvider>
    );
  }
}
