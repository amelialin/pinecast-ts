import * as React from 'react';

import {primitives} from '@pinecast/sb-components';

import * as RootComponents from './rootComponents';
export {RootComponents as rootComponents};

import SchemaBool from './SchemaBool';
import SchemaEnum from './SchemaEnum';
import SchemaLongText from './SchemaLongText';
import SchemaNumber from './SchemaNumber';
import SchemaOrderedSet from './SchemaOrderedSet';
import SchemaPadding from './SchemaPadding';
import SchemaText from './SchemaText';

export {default as SchemaBool} from './SchemaBool';
export {default as SchemaEnum} from './SchemaEnum';
export {default as SchemaLongText} from './SchemaLongText';
export {default as SchemaNumber} from './SchemaNumber';
export {default as SchemaOrderedSet} from './SchemaOrderedSet';
export {default as SchemaPadding} from './SchemaPadding';
export {default as SchemaText} from './SchemaText';

export {SchemaProps} from './types';

export default class SchemaField extends React.Component {
  props: {
    field: string;
    onUpdate: (field: string, newValue: any) => void;
    open: boolean;
    schema: primitives.ComponentLayoutOption;
    tagOptions: {[field: string]: any};
  };

  render() {
    const {field, onUpdate, open, schema, tagOptions} = this.props;

    const baseProps = {
      field,
      name: schema.name,
      onChange: onUpdate,
      open: open,
      value: tagOptions[field],
    };
    switch (schema.type) {
      case 'bool':
        return <SchemaBool {...baseProps} type={schema.type} />;
      case 'enum':
        return (
          <SchemaEnum
            {...baseProps}
            options={schema.options}
            type={schema.type}
          />
        );
      case 'longText':
        return <SchemaLongText {...baseProps} type={schema.type} />;
      case 'number':
        return (
          <SchemaNumber
            {...baseProps}
            canBeNegative={schema.canBeNegative}
            suffix={schema.suffix}
            type={schema.type}
          />
        );
      case 'rootComponents.fixedWidth':
        return (
          <RootComponents.SchemaFixedWidth {...baseProps} type={schema.type} />
        );
      case 'orderedSet':
        return (
          <SchemaOrderedSet
            {...baseProps}
            options={schema.options}
            type={schema.type}
          />
        );
      case 'text':
        return <SchemaText {...baseProps} type={schema.type} />;
      case 'padding':
        return <SchemaPadding {...baseProps} type={schema.type} />;
      default:
        throw new Error(`Unrecognized type ${(schema as any).type}`);
    }
  }
}
