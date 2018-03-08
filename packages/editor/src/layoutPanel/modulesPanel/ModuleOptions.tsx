import * as React from 'react';

import Checkbox from '../../common/Checkbox';
import Label from '../../common/Label';
import {MetadataType} from './types';
import {primitives} from '@pinecast/sb-components';
import Select from '../../common/Select';
import styled from '@pinecast/sb-styles';
import TextInput from '../../common/TextInput';

const Wrapper = styled('div', {
  borderTop: '1px solid #dee1df',
  marginTop: 12,
  paddingTop: 12,
});

type SchemaProps = {
  name: string;
  field: string;
  onChange: (field: string, newValue: any) => void;
  value: any;
};

class SchemaText extends React.PureComponent {
  props: SchemaProps;

  handleChange = (newValue: string) => {
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    return (
      <Label text={this.props.name}>
        <TextInput onChange={this.handleChange} value={this.props.value} />
      </Label>
    );
  }
}
class SchemaEnum extends React.PureComponent {
  props: SchemaProps & {options: {[value: string]: string}};

  handleChange = (newValue: string) => {
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    return (
      <Label text={this.props.name}>
        <Select
          onChange={this.handleChange}
          options={this.props.options}
          value={this.props.value}
        />
      </Label>
    );
  }
}
class SchemaBool extends React.PureComponent {
  props: SchemaProps;

  handleChange = (newValue: boolean) => {
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    return (
      <Checkbox
        checked={this.props.value}
        onChange={this.handleChange}
        text={this.props.name}
      />
    );
  }
}

export default class ModuleOptions extends React.PureComponent {
  props: {
    layout: primitives.ComponentLayout;
    metadata: MetadataType;
    onUpdate: (newLayout: primitives.ComponentLayout) => void;
  };

  handleChange = (field: string, newValue: any) => {
    this.props.onUpdate(
      this.props.metadata.func({
        ...this.props.layout.tagOptions,
        [field]: newValue,
      }),
    );
  };

  renderSchemaElement = (key: string) => {
    const {layout, metadata} = this.props;
    if (!metadata.schema) {
      return;
    }
    const option = metadata.schema[key];
    let Component: React.ComponentType;
    switch (option.type) {
      case 'bool':
        Component = SchemaBool;
        break;
      case 'enum':
        Component = SchemaEnum;
        break;
      case 'text':
        Component = SchemaText;
        break;
      default:
        console.error(`No schema input for ${option.type}`);
        return null;
    }

    const props: SchemaProps = {
      field: key,
      name: option.name,
      onChange: this.handleChange,
      value: layout.tagOptions[key],
    };
    switch (option.type) {
      case 'enum':
        (props as any).options =
          (option.options &&
            option.options.reduce((acc, cur) => {
              acc[cur.value] = cur.name;
              return acc;
            }, {})) ||
          [];
        break;
    }
    return <Component {...props} />;
  };

  render() {
    const {metadata} = this.props;
    if (!metadata.schema) {
      return null;
    }

    const keys = Object.keys(metadata.schema);

    return (
      <Wrapper>
        {keys
          .map(this.renderSchemaElement)
          .filter(x => x)
          .map((x, i) => x && React.cloneElement(x, {key: i}))}
      </Wrapper>
    );
  }
}
