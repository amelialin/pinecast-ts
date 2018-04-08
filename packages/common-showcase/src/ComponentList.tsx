import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled from '@pinecast/styles';

import components from './components';

const Option = styled(
  'button',
  ({$isSelected}: {$isSelected: boolean}) => ({
    appearance: 'none',
    backgroundColor: $isSelected ? '#dee1df' : 'transparent',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 0 0 0 transparent',
    flex: '0 0 36px',
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    fontWeight: $isSelected ? 500 : 400,
    lineHeight: 20,
    marginBottom: 4,
    padding: '8px 12px',
    textAlign: 'left',
    transition: 'background-color 0.2s, box-shadow 0.2s',

    ':hover': {
      backgroundColor: '#eeefea',
    },
    ':focus': {
      boxShadow: '0 0 0 4px #eeefea',
      outline: 'none',
    },
    ':focus:hover': {
      backgroundColor: '#ddd',
      boxShadow: '0 0 0 4px #eeefea',
    },
  }),
  {type: 'button'},
);

const componentPairs = Object.entries(components);

type Props = {
  onSet: (component: string) => void;
  selected: string;
};

const ComponentList = ({onSet, selected}: Props) => (
  <React.Fragment>
    {componentPairs
      .sort(([, a], [, b]) => a.name.localeCompare(b.name))
      .map(([key, {name}]) => (
        <Option
          $isSelected={selected === key}
          key={key}
          onClick={e => {
            e.preventDefault();
            onSet(key);
          }}
        >
          {name}
        </Option>
      ))}
  </React.Fragment>
);

export default ComponentList;
