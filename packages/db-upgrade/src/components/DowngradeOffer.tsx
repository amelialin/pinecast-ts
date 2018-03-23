import * as React from 'react';

import Button from '@pinecast/common/Button';
import styled from '@pinecast/styles';
import xhr from '@pinecast/xhr';

import {Plan} from '../types';

const Wrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '44px 16px',
  textAlign: 'center',
});

const Copy = styled('span', {
  display: 'inline-flex',
  fontSize: 16,
  marginBottom: 20,
});

const ErrorMessage = styled('span', {
  color: '#EF6B6B',
  display: 'flex',
  fontSize: 12,
  marginBottom: 20,
  textAlign: 'center',
});
const Warning = styled('span', {
  color: '#b0b5b5',
  display: 'flex',
  fontSize: 12,
  textAlign: 'center',
  marginTop: 12,
  '@media (min-width: 500px)': {
    marginTop: 8,
  },
});

const FauxButtonGroup = styled('div', {
  display: 'flex',
  marginBottom: 16,

  ':not(:empty) > .Button-nativeButton:not(:first-child)': {
    marginLeft: 8,
  },
  '@media (max-width: 500px)': {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 8,
    ':not(:empty) > .Button-nativeButton:not(:first-child)': {
      marginBottom: 12,
      marginLeft: 0,
    },
  },
});

export default class DowngradeOffer extends React.PureComponent {
  props: {
    currentPlan: Plan;
    onDowngrade: (newPlan: Plan) => void;
  };
  state: {
    error: JSX.Element | string | null;
    pending: boolean;
  } = {
    error: null,
    pending: false,
  };

  async doDowngrade(toPlan: Plan): Promise<void> {
    this.setState({error: null, pending: true});
    const data = new FormData();
    data.append('new_plan', toPlan);
    try {
      const response = await xhr({
        method: 'POST',
        url: '/payments/services/plan/downgrade',
        body: data,
      }).then(data => JSON.parse(data));
      if (response.error) {
        this.setState({
          error: 'There was a problem while processing your request.',
          pending: false,
        });
      } else {
        this.setState({error: null, pending: false}, () => {
          this.props.onDowngrade(toPlan);
        });
      }
    } catch (e) {
      this.setState({error: 'We could not contact Pinecast.', pending: false});
    }
  }

  handleDowngradeToFree = () => {
    this.doDowngrade('demo');
  };
  handleDowngradeToStarter = () => {
    this.doDowngrade('starter');
  };

  render() {
    const {props: {currentPlan}, state: {error, pending}} = this;

    const errorMessage = error ? <ErrorMessage>{error}</ErrorMessage> : null;
    const warning = <Warning>Downgrading takes effect immediately.</Warning>;

    if (currentPlan === 'pro') {
      return (
        <Wrapper>
          <Copy>You can downgrade or cancel at any time.</Copy>
          {errorMessage}
          <FauxButtonGroup>
            <Button
              onClick={this.handleDowngradeToStarter}
              pending={pending}
              size="normal"
            >
              Downgrade to Starter
            </Button>
            <Button
              onClick={this.handleDowngradeToFree}
              pending={pending}
              size="normal"
            >
              Cancel subscription
            </Button>
          </FauxButtonGroup>
          {warning}
        </Wrapper>
      );
    } else if (currentPlan === 'starter') {
      return (
        <Wrapper>
          <Copy>
            You can cancel your Starter plan subscription at any time.
          </Copy>
          {errorMessage}
          <FauxButtonGroup>
            <Button
              onClick={this.handleDowngradeToFree}
              pending={pending}
              size="normal"
            >
              Cancel subscription
            </Button>
          </FauxButtonGroup>
          {warning}
        </Wrapper>
      );
    }

    throw new Error(
      `Unexpected plan ${currentPlan} when rendering downgrade offer`,
    );
  }
}
