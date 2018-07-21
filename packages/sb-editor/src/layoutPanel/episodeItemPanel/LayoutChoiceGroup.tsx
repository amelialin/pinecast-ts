import * as React from 'react';

import EmptyState from '@pinecast/common/EmptyState';
import {itemLayoutsMetadata} from '@pinecast/sb-presets';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import {primitives} from '@pinecast/sb-components';
import styled from '@pinecast/styles';

import LayoutChoice from './LayoutChoice';
import LayoutInsertionModal from './LayoutInsertionModal';
import InsertionPoint from '../moduleHelpers/InsertionPoint';

const Wrapper = styled('div', {
  marginBottom: 28,
});

export default class LayoutChoiceGroup extends React.PureComponent {
  props: {
    canDelete: boolean;
    consumeBudget: number;
    layouts: Array<primitives.LayoutConfig>;
    onUpdated: (newLayout: Array<primitives.LayoutConfig>) => void;
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
  handleReplace = (index: number, newLayout: primitives.LayoutConfig) => {
    const out = [...this.props.layouts];
    out[index] = newLayout;
    this.props.onUpdated(out);
  };

  handleOnInsert = (index: number, tag: string) => {
    const layout = itemLayoutsMetadata[tag];
    const newAddition: primitives.LayoutConfig = {
      alignment: 'left',
      consumeCount:
        layout.forceConsumeCount || Math.min(this.props.consumeBudget, 5),
      elementLayout: itemLayoutsMetadata[tag].func({}),
      itemSpacing: layout.type === 'grid' ? 15 : undefined,
      type: tag.split('.')[0],
      width: 'default',
    };
    const out = [...this.props.layouts];
    out.splice(index, 0, newAddition);
    this.props.onUpdated(out);
  };

  render() {
    const {canDelete, consumeBudget, layouts} = this.props;

    if (!layouts.length) {
      if (consumeBudget) {
        return (
          <Wrapper>
            <ModalOpener
              renderModal={({handleClose}) => (
                <LayoutInsertionModal
                  index={0}
                  onClose={handleClose}
                  onInsert={this.handleOnInsert}
                />
              )}
            >
              {({handleOpen}) => (
                <EmptyState
                  actionLabel="Add layout"
                  copy="This section will be collapsed until an episode layout is added."
                  onAction={handleOpen}
                  title="There are no episode layouts in this section."
                />
              )}
            </ModalOpener>
          </Wrapper>
        );
      } else {
        return (
          <Wrapper>
            <EmptyState
              copy="This section will be collapsed until an episode layout is added, but you've reached the limit for the number of episodes shown on one page."
              title="There are no episode layouts in this section."
            />
          </Wrapper>
        );
      }
    }

    return (
      <Wrapper>
        {layouts.map((layout, i) => (
          <React.Fragment key={i}>
            {consumeBudget > 0 && (
              <InsertionPoint
                index={i}
                label="Add episode layout"
                Modal={LayoutInsertionModal}
                onInsert={this.handleOnInsert}
              />
            )}
            <LayoutChoice
              canDelete={canDelete}
              consumeBudget={consumeBudget}
              index={i}
              isFirst={i === 0}
              isLast={i === layouts.length - 1}
              layout={layout}
              onChange={this.handleReplace}
              onDelete={this.handleRemove}
              onSwap={this.handleMove}
            />
          </React.Fragment>
        ))}
        {consumeBudget > 0 && (
          <InsertionPoint
            index={layouts.length}
            label="Add episode layout"
            Modal={LayoutInsertionModal}
            onInsert={this.handleOnInsert}
          />
        )}
      </Wrapper>
    );
  }
}
