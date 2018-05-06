import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';
import Toggler from '@pinecast/common/Toggler';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Collapser from '@pinecast/common/Collapser';
import {MetadataType} from './types';
import {primitives} from '@pinecast/sb-components';
import SchemaField from './schemaFields';

const Wrapper = styled('div', {
  marginBottom: -12,
  marginTop: 12,
});
const buttonWrapperStyle: CSS = {
  display: 'flex',
  paddingBottom: 12,
};

const ShowOptionsWrap = styled('div', {
  display: 'flex',
  flex: '1 1',
});

export default class ModuleOptions extends React.PureComponent {
  props: {
    layout: primitives.ComponentLayout;
    metadata: MetadataType;
    moreButtons: JSX.Element | Array<JSX.Element | null | false> | null | false;
    onUpdate: (newLayout: primitives.ComponentLayout) => void;
  };

  handleChange = (field: string, newValue: any) => {
    const {metadata} = this.props;
    if (!metadata.schema) {
      return;
    }
    this.props.onUpdate(
      this.props.metadata.func({
        ...this.props.layout.tagOptions,
        [field]: newValue,
      }),
    );
  };

  render() {
    const {layout, metadata: {schema}, moreButtons} = this.props;
    if (!schema) {
      return null;
    }

    const keys = Object.keys(schema);

    return (
      <Toggler>
        {({open, toggle}) => (
          <Wrapper>
            <ButtonGroup wrapperStyle={buttonWrapperStyle}>
              {Boolean(keys.length) && (
                <ShowOptionsWrap>
                  <Button onClick={toggle}>
                    {open ? 'Hide options' : 'Show options'}
                  </Button>
                </ShowOptionsWrap>
              )}
              {moreButtons}
            </ButtonGroup>
            <Collapser open={open}>
              {keys
                .sort((a, b) => {
                  if (a === b) {
                    return 1;
                  }
                  if (b === 'elementOptions') {
                    return -1;
                  }
                  if (a === 'elementOptions') {
                    return 1;
                  }
                  return 0;
                })
                .filter(key => Boolean(schema[key]))
                .map(key => (
                  <SchemaField
                    field={key}
                    key={key}
                    onUpdate={this.handleChange}
                    open={open}
                    schema={schema[key] as any}
                    tagOptions={layout.tagOptions}
                  />
                ))}
            </Collapser>
          </Wrapper>
        )}
      </Toggler>
    );
  }
}
