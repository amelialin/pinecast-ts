import * as React from 'react';

import Checkbox from '@pinecast/common/Checkbox';
import EmptyState from '@pinecast/common/EmptyState';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import styled from '@pinecast/styles';
import Tag from '@pinecast/common/Tag';

const AllOptions = styled('div', {overflow: 'auto'});

type Key = string | number;
type Option = {
  key: Key;
  label: React.ReactNode;
};
export default class TagPicker extends React.Component {
  props: {
    emptyLabel: React.ReactNode;
    maxChoices?: number;
    maxHeight?: number;
    onSelectionChange: (options: Array<Key>) => void;
    options: Array<Option>;
    optionsLabel: React.ReactNode;
    selection: Array<Key>;
    selectionLabel: React.ReactNode;
    selectionSubtext?: React.ReactNode;
  };

  doSelect(key: Key) {
    const {selection} = this.props;
    this.props.onSelectionChange(
      this.props.options.reduce(
        (acc, cur) => {
          if (cur.key === key || selection.includes(cur.key)) {
            acc.push(cur.key);
          }
          return acc;
        },
        [] as Array<Key>,
      ),
    );
  }
  doUnselect(key: Key) {
    this.props.onSelectionChange(this.props.selection.filter(x => x !== key));
  }

  renderOption = (option: Option) => {
    const checked = this.props.selection.includes(option.key);
    return (
      <Checkbox
        checked={checked}
        disabled={
          !checked && this.props.selection.length === this.props.maxChoices
        }
        key={option.key}
        onChange={checked => {
          if (checked) {
            this.doSelect(option.key);
          } else {
            this.doUnselect(option.key);
          }
        }}
        text={option.label}
      />
    );
  };

  renderSelection = (key: Key) => {
    const option = this.props.options.find(x => x.key === key);
    if (!option) {
      throw new Error(`${key} not found in options`);
    }
    return (
      <Tag
        color="gray"
        deleteButton
        key={option.key}
        onDelete={() => {
          this.doUnselect(option.key);
        }}
        size="large"
        style={{marginBottom: 8}}
      >
        {option.label}
      </Tag>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Label
          componentType="div"
          subText={this.props.selectionSubtext}
          text={this.props.selectionLabel}
        >
          {this.props.selection.length ? (
            <Group spacing={8} wrapperStyle={{flexWrap: 'wrap'}}>
              {this.props.selection.map(this.renderSelection)}
            </Group>
          ) : (
            <EmptyState
              style={{
                color: '#7f8486',
                marginBottom: 0,
                padding: '20px 0',
              }}
              title={this.props.emptyLabel}
            />
          )}
        </Label>
        <Label
          componentType="div"
          style={{marginBottom: 0}}
          text={this.props.optionsLabel}
        >
          <AllOptions style={{maxHeight: this.props.maxHeight}}>
            {this.props.options.map(this.renderOption)}
          </AllOptions>
        </Label>
      </React.Fragment>
    );
  }
}
