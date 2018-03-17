import * as React from 'react';

import styled from '@pinecast/styles';

import Button, {ButtonGroup} from '../../common/Button';
import Collapser from '../../common/Collapser';
import {MetadataType} from './types';
import {primitives} from '@pinecast/sb-components';
import * as SchemaFields from './schemaFields';

const Wrapper = styled('div', {
  marginBottom: -12,
  marginTop: 12,
});
const ButtonWrapper = styled('div', {
  display: 'flex',
  paddingBottom: 12,
});

export default class ModuleOptions extends React.PureComponent {
  props: {
    layout: primitives.ComponentLayout;
    metadata: MetadataType;
    moreButtons: JSX.Element | Array<JSX.Element | null | false> | null | false;
    onUpdate: (newLayout: primitives.ComponentLayout) => void;
  };
  state: {open: boolean} = {open: false};

  handleChange = (field: string, newValue: any) => {
    const {metadata} = this.props;
    if (!metadata.schema) {
      return;
    }
    const option = metadata.schema[field];

    let value = newValue;
    if (option.type === 'enum' && option.options) {
      const optionToChoose: any = option.options.find(
        x => x.key === newValue || x.value === newValue,
      );
      value = optionToChoose.value;
    }

    this.props.onUpdate(
      this.props.metadata.func({
        ...this.props.layout.tagOptions,
        [field]: value,
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
        Component = SchemaFields.SchemaBool;
        break;
      case 'enum':
        Component = SchemaFields.SchemaEnum;
        break;
      case 'longText':
        Component = SchemaFields.SchemaLongText;
        break;
      case 'orderedSet':
        Component = SchemaFields.SchemaOrderedSet;
        break;
      case 'text':
        Component = SchemaFields.SchemaText;
        break;
      default:
        console.error(`No schema input for ${option.type}`);
        return null;
    }

    const props: SchemaFields.SchemaProps = {
      field: key,
      name: option.name,
      onChange: this.handleChange,
      open: this.state.open,
      value: layout.tagOptions[key],
    };

    function setOptions() {
      (props as any).options =
        (option.options &&
          option.options.reduce((acc, cur) => {
            acc[cur.key || cur.value] = cur.name;
            return acc;
          }, {})) ||
        [];
    }

    switch (option.type) {
      case 'orderedSet':
        setOptions();
        break;
      case 'enum':
        setOptions();
        if (option.options) {
          const selOpt = option.options.find(x => {
            if (
              Array.isArray(props.value) &&
              Array.isArray(x.value) &&
              x.value.length === props.value.length &&
              x.value.every((val, i) => val === props.value[i])
            ) {
              return true;
            }
            if (typeof props.value === 'object') {
              throw new Error('Cannot compare object keys');
            }
            return x.value === props.value;
          });
          props.value = (selOpt && selOpt.key) || props.value;
        }
        break;
    }
    return <Component {...props} />;
  };

  handleToggle = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    const {metadata, moreButtons} = this.props;
    if (!metadata.schema) {
      return null;
    }

    const keys = Object.keys(metadata.schema);

    return (
      <Wrapper>
        <ButtonWrapper>
          <ButtonGroup>
            {Boolean(keys.length) && (
              <Button onClick={this.handleToggle}>
                {this.state.open ? 'Hide options' : 'Show options'}
              </Button>
            )}
            {this.props.moreButtons}
          </ButtonGroup>
        </ButtonWrapper>
        <Collapser open={this.state.open}>
          {keys
            .map(this.renderSchemaElement)
            .filter(x => x)
            .map((x, i) => x && React.cloneElement(x, {key: i}))}
        </Collapser>
      </Wrapper>
    );
  }
}
