import * as React from 'react';

import {componentsMetadata} from '@pinecast/sb-presets';
import {primitives} from '@pinecast/sb-components';
import styled from '@pinecast/styles';

import EmptyState from '../../common/EmptyState';
import {MetadataType} from './types';
import {ModalOpener} from '../../common/ModalLayer';
import ModuleCard from './ModuleCard';
import ModuleInsertionPoint from './ModuleInsertionPoint';
import ModuleInsertionModal from './ModuleInsertionModal';

const Wrapper = styled('div', {
  marginBottom: 28,
  ':not(:empty) .ModuleCard--outerWrapper:hover + .ModuleInsertionPoint--Wrapper .Button-nativeButton': {
    opacity: 1,
  },
});

export default class ComponentLayoutGroup extends React.PureComponent {
  props: {
    layouts: Array<primitives.ComponentLayout>;
    onUpdated: (newLayout: Array<primitives.ComponentLayout>) => void;
  };

  handleMove = (oldIndex: number, newIndex: number) => {
    const out = [...this.props.layouts];
    const toMove = out[oldIndex];
    out[oldIndex] = out[newIndex];
    out[newIndex] = toMove;
    this.props.onUpdated(out);
  };
  handleRemove = (index: number) => {
    const out = [...this.props.layouts];
    out.splice(index, 1);
    this.props.onUpdated(out);
  };
  handleReplace = (index: number, newLayout: primitives.ComponentLayout) => {
    const out = [...this.props.layouts];
    out[index] = newLayout;
    this.props.onUpdated(out);
  };

  handleOnInsert = (index: number, tag: string) => {
    const newAddition = (componentsMetadata as {[key: string]: MetadataType})[
      tag
    ].func({});
    const out = [...this.props.layouts];
    out.splice(index, 0, newAddition);
    this.props.onUpdated(out);
  };

  render() {
    const {layouts} = this.props;

    if (!layouts.length) {
      return (
        <Wrapper>
          <ModalOpener
            renderModal={({handleClose}) => (
              <ModuleInsertionModal
                index={0}
                onClose={handleClose}
                onInsert={this.handleOnInsert}
              />
            )}
          >
            {({handleOpen}) => (
              <EmptyState
                actionLabel="Add module"
                copy="This section will appear empty until you add a module."
                onAction={handleOpen}
                title="There are no modules in this section."
              />
            )}
          </ModalOpener>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        {layouts.map((layout, i) => (
          <React.Fragment key={i}>
            <ModuleInsertionPoint index={i} onInsert={this.handleOnInsert} />
            <ModuleCard
              canDelete
              index={i}
              isFirst={i === 0}
              isLast={i === layouts.length - 1}
              layout={layout}
              onMove={this.handleMove}
              onRemove={this.handleRemove}
              onUpdate={this.handleReplace}
            />
          </React.Fragment>
        ))}
        <ModuleInsertionPoint
          index={layouts.length}
          onInsert={this.handleOnInsert}
        />
      </Wrapper>
    );
  }
}
