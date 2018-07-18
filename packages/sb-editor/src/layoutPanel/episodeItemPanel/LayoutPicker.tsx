import * as React from 'react';

import Group from '@pinecast/common/Group';
import {itemLayoutsMetadata} from '@pinecast/sb-presets';
import Label from '@pinecast/common/Label';
import {nullThrows} from '@pinecast/common/helpers';
import Select from '@pinecast/common/Select';

const layoutTypeOptions = [
  {key: 'stacked', label: 'Stacked'},
  {key: 'grid', label: 'Grid'},
];

export default class LayoutPicker extends React.PureComponent {
  props: {
    oneLine?: boolean;
    onSelect: (key: string) => void;
    selection: string;
  };

  handleChangeLayoutType = (newType: string) => {
    const key = Object.keys(itemLayoutsMetadata).find(k =>
      k.startsWith(`${newType}.`),
    );
    this.props.onSelect(nullThrows(key));
  };

  render() {
    const type = this.props.selection.split('.')[0];
    return (
      <Label
        $oneLine={this.props.oneLine}
        $oneLineCollapse={this.props.oneLine}
        text="Layout type"
      >
        <Group spacing={16}>
          <Select
            onChange={this.handleChangeLayoutType}
            options={layoutTypeOptions}
            style={{display: 'inline-flex'}}
            value={type}
          />
          <Select
            onChange={this.props.onSelect}
            options={Object.entries(itemLayoutsMetadata)
              .filter(([key]) => key.startsWith(`${type}.`))
              .map(([key, {name}]) => ({label: name, key}))}
            style={{display: 'inline-flex'}}
            value={this.props.selection}
          />
        </Group>
      </Label>
    );
  }
}
