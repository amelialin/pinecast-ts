import * as React from 'react';

import Button from '@pinecast/common/Button';
import Collapser from '@pinecast/common/Collapser';
import {KebabIconMenu} from '@pinecast/common/ContextMenu';
import Fieldset from '@pinecast/common/Fieldset';
import Group from '@pinecast/common/Group';
import {itemLayoutsMetadata} from '@pinecast/sb-presets';
import Label from '@pinecast/common/Label';
import {primitives} from '@pinecast/sb-components';
import Select from '@pinecast/common/Select';
import StackedSection from '@pinecast/common/StackedSection';
import styled from '@pinecast/styles';
import TextInput from '@pinecast/common/TextInput';
import {HelpIcon} from '@pinecast/common/TooltipContainer';

import ElementColorSelector from '../ElementColorSelector';
import LayoutPicker from './LayoutPicker';
import SchemaField from '../moduleHelpers/schemaFields';

const widthOptions = [
  {key: 'full', label: 'Full width'},
  {key: 'default', label: 'Use default page body width'},
];
const alignmentOptions = [
  {key: 'left', label: 'Left'},
  {key: 'center', label: 'Center'},
  {key: 'right', label: 'Right'},
];

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
  state: {containerOptionOpen: boolean} = {containerOptionOpen: false};

  handleChangeLayout = (preset: string) => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      elementLayout: itemLayoutsMetadata[preset].func(),
    });
  };

  handleDelete = () => {
    this.props.onDelete(this.props.index);
  };
  handleMoveDown = () => {
    this.props.onSwap(this.props.index, this.props.index + 1);
  };
  handleMoveUp = () => {
    this.props.onSwap(this.props.index, this.props.index - 1);
  };

  handleToggleContainer = () => {
    this.setState({
      containerOptionOpen: !this.state.containerOptionOpen,
      episodeOptionOpen: false,
    });
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
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      consumeCount: Math.min(
        Math.max(1, consumeCount),
        this.props.layout.consumeCount + this.props.consumeBudget,
      ),
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
  handleChangeEpisodesMinWidth = (newWidth: string) => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      minimumItemWidth: Math.max(Number(newWidth) || 0, 100),
    });
  };

  handleWidthChange = (newWidth: 'full' | 'default') => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      width: newWidth,
    });
  };

  handleSchemaChange = (field: string, newValue: any) => {
    const {index, layout, onChange} = this.props;
    const {func} = itemLayoutsMetadata[layout.elementLayout.tag];
    onChange(index, {
      ...layout,
      elementLayout: func({
        ...layout.elementLayout.tagOptions,
        [field]: newValue,
      }),
    });
  };

  render() {
    const {canDelete, consumeBudget, isFirst, isLast, layout} = this.props;
    const {
      forceConsumeCount,
      func: renderFunc,
      schema = {},
    } = itemLayoutsMetadata[layout.elementLayout.tag];
    const tagOptions = layout.elementLayout.tagOptions;
    const mergedTagOptions = {
      ...renderFunc().tagOptions,
      ...tagOptions,
    };
    return (
      <StackedSection>
        <LayoutPicker
          oneLine
          onSelect={this.handleChangeLayout}
          selection={layout.elementLayout.tag}
        />
        {typeof forceConsumeCount !== 'number' && (
          <Label text="Number of episodes to show">
            <TextInput
              onChange={this.handleCountChange}
              style={{marginRight: 8, width: 120}}
              suffix={layout.consumeCount === 1 ? 'episode' : 'episodes'}
              value={String(layout.consumeCount)}
            />
            {consumeBudget === 0 && ' (at maximum for one page)'}
          </Label>
        )}
        {layout.type === 'grid' && (
          <Group spacing={16}>
            <Label
              subText="The size of the margin between each episode"
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
              subText="The minimum width of an episode on any screen size"
              text="Minimum item width"
            >
              <TextInput
                onChange={this.handleChangeEpisodesMinWidth}
                style={{display: 'inline-flex', width: 90}}
                suffix="px"
                value={String(layout.minimumItemWidth || 250)}
              />
            </Label>
          </Group>
        )}
        <MenuWrapper>
          <Button
            onClick={this.handleToggleContainer}
            style={{marginRight: 'auto'}}
          >
            {this.state.containerOptionOpen ? 'Hide options' : 'Show options'}
          </Button>
          {(!isFirst || !isLast || canDelete) && (
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
          )}
        </MenuWrapper>
        <Collapser open={this.state.containerOptionOpen} shave={16}>
          <Fieldset label="Container options">
            <Label
              $oneLine
              style={{marginTop: 12}}
              text={
                <React.Fragment>
                  Inner size{' '}
                  <HelpIcon style={{marginLeft: 8}}>
                    Width of the container around the episodes
                  </HelpIcon>
                </React.Fragment>
              }
            >
              <Select
                disabled={!this.state.containerOptionOpen}
                onChange={this.handleWidthChange}
                options={widthOptions}
                value={layout.width || 'default'}
              />
            </Label>
            <Label
              $oneLine
              text={
                <React.Fragment>
                  Alignment{' '}
                  <HelpIcon style={{marginLeft: 8}}>
                    Alignment of the container relative to the page
                  </HelpIcon>
                </React.Fragment>
              }
            >
              <Select
                disabled={!this.state.containerOptionOpen}
                onChange={this.handleAlignmentChange}
                options={alignmentOptions}
                value={layout.alignment || 'center'}
              />
            </Label>
            <ElementColorSelector
              disabled={!this.state.containerOptionOpen}
              onChange={this.handleBGChange}
              type="background"
              value={layout.bgColor || ''}
            />
            <ElementColorSelector
              disabled={!this.state.containerOptionOpen}
              onChange={this.handleFGChange}
              type="foreground"
              value={layout.fgColor || ''}
            />
          </Fieldset>
          {Object.keys(schema).length > 0 && (
            <Fieldset label="Episode options">
              {Object.entries(schema).map(([key, schema]) => (
                <SchemaField
                  field={key}
                  key={key}
                  onUpdate={this.handleSchemaChange}
                  open={this.state.containerOptionOpen}
                  schema={schema as primitives.ComponentLayoutOption}
                  tagOptions={mergedTagOptions}
                />
              ))}
            </Fieldset>
          )}
        </Collapser>
      </StackedSection>
    );
  }
}
