import * as React from 'react';

import styled from '@pinecast/sb-styles';

import Button from '../../common/Button';
import Checkbox from '../../common/Checkbox';
import Label from '../../common/Label';
import {MetadataType} from './types';
import {primitives} from '@pinecast/sb-components';
import Select from '../../common/Select';
import TextInput from '../../common/TextInput';

const Wrapper = styled('div', {
  borderTop: '1px solid #dee1df',
  marginBottom: -16,
  marginTop: 12,
  paddingTop: 12,
});
const ButtonWrapper = styled('div', {
  paddingBottom: 16,
});
const Collapser = styled('div', ({$height}) => ({
  height: $height,
  margin: '0 -4px',
  overflowY: 'hidden',
  padding: '0 4px',
  transition: 'height 0.2s',
}));

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
  optionsEl: HTMLElement | null;
  props: {
    layout: primitives.ComponentLayout;
    metadata: MetadataType;
    onUpdate: (newLayout: primitives.ComponentLayout) => void;
  };
  state: {open: boolean} = {open: false};

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

  handleToggle = () => {
    this.setState({open: !this.state.open});
  };
  handleOptionsElRef = (el: HTMLElement | null) => {
    this.optionsEl = el;
  };

  render() {
    const {metadata} = this.props;
    if (!metadata.schema) {
      return null;
    }

    const keys = Object.keys(metadata.schema);

    return (
      <Wrapper>
        <ButtonWrapper>
          <Button onClick={this.handleToggle} size="small">
            {this.state.open ? 'Hide options' : 'Show options'}
          </Button>
        </ButtonWrapper>
        <Collapser
          $height={
            this.state.open && this.optionsEl
              ? this.optionsEl.clientHeight - 8
              : 0
          }
        >
          <div ref={this.handleOptionsElRef} style={{marginTop: -8}}>
            {keys
              .map(this.renderSchemaElement)
              .filter(x => x)
              .map((x, i) => x && React.cloneElement(x, {key: i}))}
          </div>
        </Collapser>
      </Wrapper>
    );
  }
}
