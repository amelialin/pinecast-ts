import {injectStripe, ReactStripeElements} from 'react-stripe-elements';
import * as React from 'react';

import Card from '@pinecast/common/Card';
import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled, {CSS} from '@pinecast/styles';

import CreditCardForm from '../CreditCardForm';
import Elements from '../Elements';
import FeatureValue from './dualOffer/FeatureValue';
import {HeadingLabel, RowLabel, Th} from './dualOffer/TableCells';
import {Plan} from '../../types';
import PlanOptions from './dualOffer/PlanOptions';
import State from '../../State';
import Step from './dualOffer/Step';
import topicData, {Topics} from './dualOffer/topicData';
import TopicSwitch from './dualOffer/TopicSwitch';
import UpgradeOffer from '../UpgradeOffer';

const cardStyles: CSS = {
  margin: '0 auto 32px',
  maxWidth: '46vw',

  ':last-of-type': {
    marginBottom: 120,
  },
  '@media (max-width: 900px)': {
    maxWidth: 500,
  },
};

const InnerHeading = styled('h2', {
  fontFamily: DEFAULT_FONT,
  fontSize: 18,
  textAlign: 'center',
});
const Table = styled('table', {
  borderSpacing: 0,
});
const CardError = styled('div', {
  color: '#BF1D1D',
  fontSize: 14,
  marginBottom: 16,
  textAlign: 'center',
});

type Props = {
  onUpgraded: (newPlan: Plan) => void;
};

class DualOffer_ extends React.Component {
  props: Props & ReactStripeElements.InjectedStripeProps;
  state: {
    cardError: false;
    cardProvided: boolean;
    selectedPlan: 'starter' | 'pro' | null;
    selectedTopic: Topics;
  } = {
    cardError: false,
    cardProvided: false,
    selectedPlan: null,
    selectedTopic: 'account',
  };

  handleTopicChange = (newTopic: Topics) => {
    this.setState({selectedTopic: newTopic});
  };

  renderTable() {
    return (
      <Table key={this.state.selectedTopic}>
        <thead>
          <tr>
            <HeadingLabel />
            <Th>Starter</Th>
            <Th>Pro</Th>
          </tr>
        </thead>
        <tbody>
          {topicData[this.state.selectedTopic].features.map((feature, i) => (
            <tr key={i}>
              <RowLabel>{feature.name}</RowLabel>
              <FeatureValue feature={feature} forPlan="starter" />
              <FeatureValue feature={feature} forPlan="pro" />
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  handlePlanChange = (newPlan: Plan) => {
    this.setState({selectedPlan: newPlan});
  };
  handleCardReadyChange = (ready: boolean) => {
    this.setState({cardError: ready ? false : undefined, cardProvided: ready});
  };
  handleRequestPayment = (): Promise<void> => {
    this.setState({cardError: true});
    return new Promise(() => {});
  };

  renderSteps() {
    return (
      <React.Fragment>
        <Step name="First, choose a plan.">
          <PlanOptions
            onChange={this.handlePlanChange}
            value={this.state.selectedPlan}
          />
        </Step>
        {this.state.selectedPlan && (
          <Step name="Now we'll need a credit card.">
            {this.state.cardError && (
              <CardError>
                We tried charging your card, but it was declined.
              </CardError>
            )}
            <CreditCardForm
              invalid={this.state.cardError}
              onReadyChange={this.handleCardReadyChange}
            />
          </Step>
        )}
        {this.state.cardProvided && (
          <Step
            innerStyle={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
            name="That's it!"
          >
            <State>
              {({onUpgraded}) => (
                <UpgradeOffer
                  canUseCoupon
                  chargeCard
                  currentPlan="demo"
                  onRequestPayment={this.handleRequestPayment}
                  onUpgrade={onUpgraded}
                  toPlan={this.state.selectedPlan || 'starter'}
                />
              )}
            </State>
          </Step>
        )}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Card style={cardStyles} whiteBack>
          <InnerHeading style={{padding: '20px 0 32px'}}>
            Compare our plans
          </InnerHeading>
          <TopicSwitch
            onChange={this.handleTopicChange}
            value={this.state.selectedTopic}
          />
          {this.renderTable()}
        </Card>
        <Card style={cardStyles} whiteBack>
          <InnerHeading style={{paddingTop: 12}}>Ready to go?</InnerHeading>
          {this.renderSteps()}
        </Card>
      </React.Fragment>
    );
  }
}

const DualOffer = injectStripe(DualOffer_) as React.ComponentType<Props>;

export default function DualOfferWrapper(props: Props) {
  return (
    <Elements>
      <DualOffer {...props} />
    </Elements>
  );
}
