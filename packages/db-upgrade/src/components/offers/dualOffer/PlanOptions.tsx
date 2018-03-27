import * as React from 'react';

import Radio from '@pinecast/common/Radio';
import styled, {CSS} from '@pinecast/styles';

import Price from '../Price';

const DoubleWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'stretch',
  padding: '20px 32px 0',
  width: '100%',
});
const DoubleWrapperInner = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flex: '1 1',
  flexDirection: 'column',
  textAlign: 'center',
});

const InnerWrap = styled('div', {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
});
const Plan = styled('strong', {
  fontSize: 20,
  fontWeight: 400,
  marginBottom: 8,
  marginTop: -4,
});

const radioStyles: CSS = {
  paddingBottom: 0,
};

export default class PlanOptions extends React.PureComponent {
  props: {
    onChange: (newPlan: 'starter' | 'pro') => void;
    value: 'starter' | 'pro' | null;
  };

  handleStarterChanged = (newValue: boolean) => {
    if (newValue) {
      this.props.onChange('starter');
    }
  };
  handleProChanged = (newValue: boolean) => {
    if (newValue) {
      this.props.onChange('pro');
    }
  };

  render() {
    return (
      <DoubleWrapper>
        <DoubleWrapperInner>
          <Radio
            alignInput="top"
            checked={this.props.value === 'starter'}
            name="upgrade--plan"
            onChange={this.handleStarterChanged}
            style={radioStyles}
            text={
              <InnerWrap>
                <Plan>Starter</Plan>
                <Price amount={500} period="mo" size={16} />
              </InnerWrap>
            }
          />
        </DoubleWrapperInner>
        <DoubleWrapperInner>
          <Radio
            alignInput="top"
            checked={this.props.value === 'pro'}
            name="upgrade--plan"
            onChange={this.handleProChanged}
            style={radioStyles}
            text={
              <InnerWrap>
                <Plan>Pro</Plan>
                <Price amount={5000} period="mo" size={16} />
              </InnerWrap>
            }
          />
        </DoubleWrapperInner>
      </DoubleWrapper>
    );
  }
}
