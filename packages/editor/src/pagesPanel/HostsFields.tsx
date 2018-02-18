import * as React from 'react';

import styled from '@pinecast/sb-styles';

import Button from '../common/Button';
import HostEditor from './HostEditor';
import {Host, HostsBody} from './types';

const Divider = styled('hr', {
  background: '#c6caca',
  border: 0,
  height: 1,
  margin: '0 0 20px',
  width: '100%',
});

export default class HostsFields extends React.PureComponent {
  props: {
    onChange: (value: HostsBody) => void;
    value: HostsBody;
  };

  handleAdd = () => {
    const updated = [...this.props.value];
    updated.push({name: ''});
    this.props.onChange(updated);
  };

  handleHostChange = (index: number, host: Host) => {
    const updated = [...this.props.value];
    updated[index] = host;
    this.props.onChange(updated);
  };
  handleHostChangeIndex = (index: number, newIndex: number) => {
    const updated = [...this.props.value];
    const old = updated[newIndex];
    updated[newIndex] = updated[index];
    updated[index] = old;
    this.props.onChange(updated);
  };
  handleHostDeleted = (index: number) => {
    const updated = [...this.props.value];
    updated.splice(index, 1);
    this.props.onChange(updated);
  };
  render() {
    return (
      <div>
        {this.props.value.map((host, i) => (
          <React.Fragment key={i}>
            <Divider />
            <HostEditor
              canDelete={this.props.value.length > 1}
              index={i}
              isFirst={i === 0}
              isLast={i === this.props.value.length - 1}
              onChange={this.handleHostChange}
              onChangeIndex={this.handleHostChangeIndex}
              onDelete={this.handleHostDeleted}
              value={host}
            />
          </React.Fragment>
        ))}
        <Divider />
        <Button onClick={this.handleAdd}>Add another host</Button>
      </div>
    );
  }
}
