import * as React from 'react';

import {componentsMetadata} from '@pinecast/sb-presets';
import {KebabIconMenu} from '@pinecast/common/ContextMenu';
import {primitives} from '@pinecast/sb-components';
import StackedSection from '@pinecast/common/StackedSection';
import styled from '@pinecast/styles';

import {MetadataType} from './types';
import ModuleOptions from './ModuleOptions';

const ComponentName = styled('b', {
  display: 'block',
  fontSize: 16,
  fontWeight: 500,
});
const ComponentDescription = styled('div', {
  fontSize: 14,
  marginTop: 4,
});

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
      <StackedSection>
        <ComponentName>{metadata.name}</ComponentName>
        <ComponentDescription>{metadata.description}</ComponentDescription>
        <ModuleOptions
          layout={layout}
          metadata={metadata}
          moreButtons={
            (!isFirst || !isLast || canDelete) && (
              <KebabIconMenu
                onSelect={option => {
                  switch (option) {
                    case 'moveUp':
                      this.handleMoveUp();
                      return;
                    case 'moveDown':
                      this.handleMoveDown();
                      return;
                    case 'delete':
                      this.handleDelete();
                      return;
                  }
                }}
                options={[
                  !isFirst && {name: 'Move up', slug: 'moveUp'},
                  !isLast && {name: 'Move down', slug: 'moveDown'},
                  canDelete && {name: 'Delete', slug: 'delete'},
                ]}
              />
            )
          }
          onUpdate={this.handleUpdate}
        />
      </StackedSection>
    );
  }
}
