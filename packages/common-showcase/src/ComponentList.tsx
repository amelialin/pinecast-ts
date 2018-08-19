import * as React from 'react';

import OptionButton from '@pinecast/common/OptionButton';

import components from './components';

const componentPairs = Object.entries(components);

type Props = {
  onSet: (component: string) => void;
  selected: string;
};

const ComponentList = ({onSet, selected}: Props) => (
  <div>
    {componentPairs
      .sort(([, a], [, b]) => a.name.localeCompare(b.name))
      .map(([key, {name}]) => (
        <OptionButton
          key={key}
          onClick={() => {
            onSet(key);
          }}
          selected={selected === key}
          style={{
            marginBottom: 8,
            width: '100%',
          }}
        >
          {name}
        </OptionButton>
      ))}
  </div>
);

export default ComponentList;
