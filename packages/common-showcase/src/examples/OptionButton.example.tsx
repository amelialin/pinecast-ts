import * as React from 'react';

import Card from '@pinecast/common/Card';
import Group from '@pinecast/common/Group';
import OptionButton from '@pinecast/common/OptionButton';

class Selection extends React.Component {
  props: {
    children: (
      props: {setValue: (value: any) => void; value: any},
    ) => React.ReactNode;
  };
  state: {value: any} = {value: null};

  handleSetValue = (value: any) => {
    this.setState({value});
  };
  render() {
    return this.props.children({
      setValue: this.handleSetValue,
      value: this.state.value,
    });
  }
}

export default {
  name: 'Option button',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Card whiteBack>
          <Selection>
            {({setValue, value}) => (
              <Group spacing={12}>
                <OptionButton
                  onClick={() => setValue('left')}
                  selected={value === 'left'}
                >
                  Left
                </OptionButton>
                <OptionButton
                  onClick={() => setValue('right')}
                  selected={value === 'right'}
                >
                  Right
                </OptionButton>
              </Group>
            )}
          </Selection>
        </Card>
      ),
    },
  ],
};
