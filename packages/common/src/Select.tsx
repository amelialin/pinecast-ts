import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const Wrapper = styled('div', ({$disabled}: {$disabled: boolean}) => ({
  alignItems: 'center',
  background: '#fff',
  borderRadius: 3,
  display: 'flex',
  fontSize: 14,
  height: 30,
  opacity: 1,
  position: 'relative',
  transition: 'box-shadow 0.2s, opacity 0.2s',

  ':before': {
    border: '2px solid #222',
    borderLeft: 0,
    borderTop: 0,
    content: '""',
    display: 'block',
    height: 6,
    opacity: $disabled ? 0.5 : 1,
    position: 'absolute',
    right: 10,
    transform: 'translateY(-2px) rotate(45deg)',
    width: 6,
  },
}));
const Select_ = styled(
  'select',
  ({$invalid, disabled}: {$invalid: boolean; disabled: boolean}) => ({
    appearance: 'none',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    background: 'transparent',
    border: 0,
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
    borderRadius: 3,
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    height: 30,
    lineHeight: '30px',
    margin: 0,
    padding: '0 25px 0 10px',
    transition: 'box-shadow 0.2s, opacity 0.2s',
    width: '100%',

    ':hover': !disabled
      ? {
          boxShadow:
            '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
        }
      : undefined,
    ':active': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
    },
    ':disabled': {
      opacity: 0.5,
    },

    ':focus': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), inset 0 0 0 0.5px #8aa3b1, rgba(167, 210, 243, 0.75) 0 0 0 3px inset',
      outline: 'none',
    },
    ':focus:hover': !disabled
      ? {
          boxShadow:
            '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px #8aa3b1, rgba(167, 210, 243, 0.75) 0 0 0 3px inset',
        }
      : undefined,
    ':focus:active': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #8aa3b1, rgba(167, 210, 243, 0.75) 0 0 0 3px inset',
    },
  }),
  {className: 'Select'},
);

export type Option = {
  key: string | number;
  label: string;
};

const Select = ({
  autoFocus,
  disabled,
  invalid,
  nativeEvents,
  onChange,
  options,
  style,
  tabIndex,
  value,
}: {
  autoFocus?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  nativeEvents?: Partial<{
    onBlur: React.HTMLAttributes<HTMLSelectElement>['onBlur'];
    onChange: React.HTMLAttributes<HTMLSelectElement>['onChange'];
    onClick: React.HTMLAttributes<HTMLSelectElement>['onClick'];
    onFocus: React.HTMLAttributes<HTMLSelectElement>['onFocus'];
    onKeyDown: React.HTMLAttributes<HTMLSelectElement>['onKeyDown'];
    onKeyUp: React.HTMLAttributes<HTMLSelectElement>['onKeyUp'];
    onKeyPress: React.HTMLAttributes<HTMLSelectElement>['onKeyPress'];
  }>;
  onChange: (newValue: string) => void;
  options: Array<Option>;
  style?: CSS;
  tabIndex?: number;
  value: string | number;
}) => (
  <Wrapper style={style} $disabled={disabled || false}>
    <Select_
      autoFocus={autoFocus}
      disabled={disabled || false}
      $invalid={invalid || false}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(e.target.value)
      }
      {...nativeEvents}
      tabIndex={tabIndex}
      value={value}
    >
      {options.map(({key, label}) => (
        <option key={String(key)} value={key}>
          {label}
        </option>
      ))}
    </Select_>
  </Wrapper>
);

export default Select;
