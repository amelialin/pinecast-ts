import * as React from 'react';

import {Plan} from './types';
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
    currentPlan: e => e.getAttribute('data-plan'),
    hasCustomer: e => e.getAttribute('data-customer') === 'true',
  };

  props: {
    currentPlan: Plan;
    hasCustomer: boolean;
  };
  state: {
    currentPlan: Plan;
    downgraded: Plan | null;
    upgraded: Plan | null;
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPlan: props.currentPlan,
      downgraded: null,
      upgraded: null,
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({currentPlan: newProps.currentPlan});
  }

  handlePlanDowngraded = (newPlan: Plan) => {
    this.setState({downgraded: newPlan, upgraded: null});
  };
  handlePlanUpgraded = (newPlan: Plan) => {
    this.setState({downgraded: null, upgraded: newPlan});
  };

  render() {
    const {currentPlan, downgraded, upgraded} = this.state;

    if (downgraded) {
      if (downgraded === 'demo') {
        return <ViewDowngradedToFree />;
      }
      return (
        <ViewDowngraded
          currentPlan={downgraded}
          onDowngrade={this.handlePlanDowngraded}
        />
      );
    }
    if (upgraded) {
      return <ViewUpgraded currentPlan={upgraded} previousPlan={currentPlan} />;
    }

    if (currentPlan === 'pro') {
      return <ViewPro onPlanDowngraded={this.handlePlanDowngraded} />;
    }
    if (currentPlan === 'starter') {
      return (
        <ViewStarter
          onPlanDowngraded={this.handlePlanDowngraded}
          onPlanUpgraded={this.handlePlanUpgraded}
        />
      );
    }
    if (currentPlan === 'community') {
      return <ViewCommunity />;
    }
    if (currentPlan === 'demo') {
      const {hasCustomer} = this.props;
      if (hasCustomer) {
        return <ViewDemoPrevious onPlanUpgraded={this.handlePlanUpgraded} />;
      } else {
        return <ViewDemo />;
      }
    }
  }
}
