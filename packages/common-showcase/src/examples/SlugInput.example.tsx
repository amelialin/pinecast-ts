import * as React from 'react';

import Label from '@pinecast/common/Label';
import {default as SlugInput, ProviderType} from '@pinecast/common/SlugInput';
import TextInput from '@pinecast/common/TextInput';

class SlugHost extends React.Component {
  props: {
    children: (
      props: {
        onChange: (value: string) => void;
        provider: ProviderType;
        sourceValue: string;
        value: string;
      },
    ) => JSX.Element;
  };
  state: {sourceValue: string; value: string} = {sourceValue: '', value: ''};

  provider = (slug: string) => {
    let resolve;
    const promise = new Promise<'available' | 'unavailable'>(innerResolve => {
      resolve = innerResolve;
    });
    let timeout = setTimeout(
      resolve,
      Math.random() * 1000,
      slug === 'test' ? 'unavailable' : 'available',
    );
    return {
      abort: () => {
        clearTimeout(timeout);
      },
      status: promise,
    };
  };

  handleSourceChange = (sourceValue: string) => {
    this.setState({sourceValue});
  };
  handleChange = (value: string) => {
    this.setState({value});
  };
  render() {
    return (
      <div>
        <Label text="Source input">
          <TextInput
            onChange={this.handleSourceChange}
            placeholder="Maybe this is a title or something"
            value={this.state.sourceValue}
          />
        </Label>
        <Label text="Slug input">
          {this.props.children({
            onChange: this.handleChange,
            provider: this.provider,
            sourceValue: this.state.sourceValue,
            value: this.state.value,
          })}
        </Label>
        <div>Value: {this.state.value}</div>
      </div>
    );
  }
}

export default {
  name: 'Slug input',
  examples: [
    {
      title: 'Basic use ("test" is taken)',
      render: () => (
        <SlugHost>
          {({onChange, provider, sourceValue, value}) => (
            <SlugInput
              onChange={onChange}
              onStatusChanged={() => {}}
              provider={provider}
              sourceValue={sourceValue}
              value={value}
            />
          )}
        </SlugHost>
      ),
    },
  ],
};
