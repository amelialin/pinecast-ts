import * as React from 'react';

import Checkbox from '@pinecast/common/Checkbox';
import Group from '@pinecast/common/Group';
import {HelpIcon} from '@pinecast/common/TooltipContainer';

import {BoolProps} from './types';

export default class SchemaBool extends React.PureComponent {
  props: BoolProps;

  handleChange = (newValue: boolean) => {
    if (this.props.type !== 'bool') {
      throw new Error('unreachable');
    }
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    if (this.props.type !== 'bool') {
      throw new Error('unreachable');
    }
    return (
      <Checkbox
        checked={this.props.value}
        onChange={this.handleChange}
        tabIndex={this.props.open ? 0 : -1}
        text={
          <Group spacing={12}>
            <span>{this.props.name}</span>
            {this.props.description ? (
              <HelpIcon>{this.props.description}</HelpIcon>
            ) : null}
          </Group>
        }
      />
    );
  }
}
