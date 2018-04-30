import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Collapser from '@pinecast/common/Collapser';
import {Delete, Down, Up} from '@pinecast/common/icons';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import {primitives} from '@pinecast/sb-components';
import Select from '@pinecast/common/Select';
import StackedSection from '@pinecast/common/StackedSection';
import styled, {CSS} from '@pinecast/styles';
import TextInput from '@pinecast/common/TextInput';
import Toggler from '@pinecast/common/Toggler';

import ElementColorSelector from '../ElementColorSelector';

const layoutTypeOptions = {
  stacked: 'Stacked',
  grid: 'Grid',
};
const widthOptions = {
  full: 'Full width',
  default: 'Use default page body width',
};
const alignmentOptions = {
  left: 'Left',
  center: 'Center',
  right: 'Right',
};
const buttonStyle: CSS = {
  justifyContent: 'center',
  padding: 0,
  width: 32,
};

const MenuWrapper = styled('div', {
  display: 'flex',
});

export default class LayoutChoice extends React.PureComponent {
  props: {
    canDelete: boolean;
    consumeBudget: number;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    layout: primitives.LayoutConfig;
    onChange: (index: number, newLayout: primitives.LayoutConfig) => void;
    onSwap: (i1: number, i2: number) => void;
    onDelete: (index: number) => void;
  };

  handleChangeLayoutType = (newType: string) => {};

  handleDelete = () => {
    this.props.onDelete(this.props.index);
  };
  handleMoveDown = () => {
    this.props.onSwap(this.props.index, this.props.index - 1);
  };
  handleMoveUp = () => {
    this.props.onSwap(this.props.index, this.props.index + 1);
  };

  handleBGChange = (newBG: string | undefined) => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      bgColor: newBG,
    });
  };
  handleFGChange = (newFG: string | undefined) => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      fgColor: newFG,
    });
  };

  handleAlignmentChange = (newAlignment: 'left' | 'center' | 'right') => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      alignment: newAlignment,
    });
  };

  handleCountChange = (newCount: string) => {
    let consumeCount = Number(newCount);
    if (isNaN(consumeCount)) {
      consumeCount = 1;
    }
    consumeCount = Math.min(
      Math.max(1, consumeCount),
      this.props.layout.consumeCount + this.props.consumeBudget,
    );
    let {maxItemsAcross} = this.props.layout;
    if (maxItemsAcross && consumeCount < maxItemsAcross) {
      maxItemsAcross = consumeCount;
    }
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      consumeCount,
      maxItemsAcross,
    });
  };

  handleChangeItemSpacing = (newSpacing: string) => {
    let spacing = Number(newSpacing);
    if (isNaN(spacing)) {
      spacing = 0;
    }
    spacing = Math.max(spacing, 0);
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      itemSpacing: spacing,
    });
  };
  handleChangeEpisodesAcross = (newCount: string) => {
    const {maxItemsAcross = 2} = this.props.layout;
    let count = Number(newCount);
    if (isNaN(count) || count < 2) {
      count = 2;
    }
    count = Math.max(count, 2);
    if (count - maxItemsAcross > this.props.consumeBudget) {
      count = maxItemsAcross + this.props.consumeBudget;
    }
    let {consumeCount} = this.props.layout;
    if (count > consumeCount) {
      consumeCount = count;
    }
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      consumeCount,
      maxItemsAcross: count,
    });
  };

  handleWidthChange = (newWidth: 'full' | 'default') => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      width: newWidth,
    });
  };

  render() {
    const {canDelete, consumeBudget, isFirst, isLast, layout} = this.props;
    return (
      <StackedSection>
        <Label text="Layout type">
          <Select
            onChange={this.handleChangeLayoutType}
            options={layoutTypeOptions}
            style={{display: 'inline-flex'}}
            value={layout.type}
          />
        </Label>
        <Label componentType="div" text="Number of episodes to show">
          <TextInput
            onChange={this.handleCountChange}
            style={{marginRight: 8, width: 120}}
            suffix={layout.consumeCount === 1 ? 'episode' : 'episodes'}
            value={String(layout.consumeCount)}
          />
          {consumeBudget === 0 && ' (at maximum for one page)'}
        </Label>
        {layout.type === 'grid' && (
          <Group spacing={16}>
            <Label
              subText="The spacing between episodes"
              text="Grid item spacing"
            >
              <TextInput
                onChange={this.handleChangeItemSpacing}
                style={{display: 'inline-flex', width: 90}}
                suffix="px"
                value={String(layout.itemSpacing || 0)}
              />
            </Label>
            <Label
              subText="The most episodes per row on a large screen"
              text="Max episodes per row"
            >
              <TextInput
                onChange={this.handleChangeEpisodesAcross}
                style={{display: 'inline-flex', width: 120}}
                suffix="episodes"
                value={String(layout.maxItemsAcross || 1)}
              />
            </Label>
          </Group>
        )}
        <Toggler>
          {({open, toggle}) => (
            <React.Fragment>
              <MenuWrapper>
                <Button onClick={toggle} style={{marginRight: 'auto'}}>
                  {open ? 'Hide options' : 'Show options'}
                </Button>
                {(!isFirst || !isLast || canDelete) && (
                  <ButtonGroup>
                    {!isFirst && (
                      <Button
                        className="ModuleCard--ToolButton"
                        onClick={this.handleMoveUp}
                        style={buttonStyle}
                      >
                        <Up />
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
                    {canDelete && (
                      <Button onClick={this.handleDelete} style={buttonStyle}>
                        <Delete style={{transform: 'translateX(-0.5px)'}} />
                      </Button>
                    )}
                  </ButtonGroup>
                )}
              </MenuWrapper>
              <Collapser open={open}>
                <Label $oneLine style={{marginTop: 12}} text="Body width">
                  <Select
                    onChange={this.handleWidthChange}
                    options={widthOptions}
                    value={layout.width || 'default'}
                  />
                </Label>
                <Label $oneLine text="Body alignment">
                  <Select
                    onChange={this.handleAlignmentChange}
                    options={alignmentOptions}
                    value={layout.alignment || 'center'}
                  />
                </Label>
                <ElementColorSelector
                  onChange={this.handleBGChange}
                  type="background"
                  value={layout.bgColor || ''}
                />
                <ElementColorSelector
                  onChange={this.handleFGChange}
                  type="foreground"
                  value={layout.fgColor || ''}
                />
              </Collapser>
            </React.Fragment>
          )}
        </Toggler>
      </StackedSection>
    );
  }
}
