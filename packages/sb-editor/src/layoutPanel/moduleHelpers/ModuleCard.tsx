import * as React from 'react';

import {primitives} from '@pinecast/sb-components';
import {componentsMetadata} from '@pinecast/sb-presets';
import styled, {CSS} from '@pinecast/styles';

import Button from '../../common/Button';
import {Delete, Down, Up} from '../../common/icons';
import {MetadataType} from './types';
import ModuleOptions from './ModuleOptions';

const OuterWrapper = styled(
  'div',
  {
    border: '1px solid #dee1df',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 2,
    padding: 12,

    ':not(:empty) ~ .ModuleCard--outerWrapper': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    ':not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  {className: 'ModuleCard--outerWrapper'},
);
const ComponentName = styled('b', {
  display: 'block',
  fontSize: 16,
  fontWeight: 500,
});
const ComponentDescription = styled('div', {
  fontSize: 14,
  marginTop: 4,
});

const buttonStyle: CSS = {
  justifyContent: 'center',
  padding: 0,
  width: 32,
};

export default class ModuleCard extends React.Component {
  props: {
    canDelete: boolean;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    layout: primitives.ComponentLayout;
    onMove: (oldIndex: number, newIndex: number) => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, newLayout: primitives.ComponentLayout) => void;
  };

  handleMoveUp = () => {
    this.props.onMove(this.props.index, this.props.index - 1);
  };
  handleDelete = () => {
    this.props.onRemove(this.props.index);
  };
  handleMoveDown = () => {
    this.props.onMove(this.props.index, this.props.index + 1);
  };

  getMetadata(): MetadataType {
    return (
      componentsMetadata[this.props.layout.tag] || {
        name: 'Obsolete module',
        type: 'unknown',
        func: () => {},

        obsolete: true,
      }
    );
  }

  handleUpdate = (newLayout: primitives.ComponentLayout) => {
    this.props.onUpdate(this.props.index, newLayout);
  };

  render() {
    const {canDelete, isFirst, isLast, layout} = this.props;
    const metadata = this.getMetadata();
    return (
      <OuterWrapper>
        <ComponentName>{metadata.name}</ComponentName>
        <ComponentDescription>{metadata.description}</ComponentDescription>
        <ModuleOptions
          layout={layout}
          metadata={metadata}
          moreButtons={
            <React.Fragment>
              {!isFirst && (
                <Button
                  className="ModuleCard--ToolButton"
                  onClick={this.handleMoveUp}
                  style={buttonStyle}
                >
                  <Up />
                </Button>
              )}
              {canDelete && (
                <Button
                  className="ModuleCard--ToolButton"
                  onClick={this.handleDelete}
                  style={buttonStyle}
                >
                  <Delete style={{transform: 'translateX(-0.5px)'}} />
                </Button>
              )}
              {!isLast && (
                <Button
                  className="ModuleCard--ToolButton"
                  onClick={this.handleMoveDown}
                  style={buttonStyle}
                >
                  <Down />
                </Button>
              )}
            </React.Fragment>
          }
          onUpdate={this.handleUpdate}
        />
      </OuterWrapper>
    );
  }
}
