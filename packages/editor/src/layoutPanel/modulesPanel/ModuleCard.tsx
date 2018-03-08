import * as React from 'react';

import {primitives} from '@pinecast/sb-components';
import {componentsMetadata} from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import Button from '../../common/Button';
import {Delete, Down, Up} from '../../common/icons';
import {Kebab} from '../../common/icons/menus';
import {MetadataType} from './types';
import ModuleOptions from './ModuleOptions';

const OuterWrapper = styled(
  'div',
  {
    border: '1px solid #dee1df',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 2,
    padding: 0,

    ':hover .ModuleCard-menuWrapper': {
      right: -10,
    },
    ':hover .ModuleCard-menuSymbol': {
      opacity: 0,
    },
    ':not(:hover) .Button-nativeButton': {
      opacity: 0,
    },
    ':hover .Button-nativeButton': {
      opacity: 1,
    },

    ':not(:empty) + .ModuleCard-outerWrapper': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    ':not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  {className: 'ModuleCard-outerWrapper'},
);

const BodyWrapper = styled('div', {
  flex: '1 1',
  padding: 16,
});
const ComponentName = styled('b', {
  display: 'block',
  fontWeight: 500,
});

const MenuWrapper = styled(
  'div',
  {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 56px',
    flexDirection: 'column',
    padding: '2px 0',
    position: 'relative',
    right: 0,
    transition: 'right 0.2s',
  },
  {className: 'ModuleCard-menuWrapper'},
);
const MenuSymbol = styled(
  'div',
  {
    display: 'flex',
    justifyContent: 'center',
    opacity: 1,
    padding: '4px 0',
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'opacity 0.2s',
    width: 20,
  },
  {className: 'ModuleCard-menuSymbol'},
);

const buttonStyle: React.CSSProperties = {
  height: 27, // To match width
  justifyContent: 'center',
  margin: '2px 0',
  padding: 0,
  width: 27, // Because icon is odd width
  transition: 'opacity 0.2s',
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
        <BodyWrapper>
          <ComponentName>{metadata.name}</ComponentName>
          <ModuleOptions
            layout={layout}
            metadata={metadata}
            onUpdate={this.handleUpdate}
          />
        </BodyWrapper>
        {(!isFirst || canDelete || !isLast) && (
          <MenuWrapper>
            <MenuSymbol>
              <Kebab color="#c6caca" />
            </MenuSymbol>
            {!isFirst && (
              <Button onClick={this.handleMoveUp} style={buttonStyle}>
                <Up />
              </Button>
            )}
            {canDelete && (
              <Button onClick={this.handleDelete} style={buttonStyle}>
                <Delete style={{transform: 'translateX(-0.5px)'}} />
              </Button>
            )}
            {!isLast && (
              <Button onClick={this.handleMoveDown} style={buttonStyle}>
                <Down />
              </Button>
            )}
          </MenuWrapper>
        )}
      </OuterWrapper>
    );
  }
}
