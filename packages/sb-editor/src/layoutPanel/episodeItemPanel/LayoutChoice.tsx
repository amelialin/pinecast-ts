import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Collapser from '@pinecast/common/Collapser';
import {Delete, Down, Up} from '@pinecast/common/icons';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import {itemLayoutsMetadata} from '@pinecast/sb-presets';
import {primitives} from '@pinecast/sb-components';
import Select from '@pinecast/common/Select';
import StackedSection from '@pinecast/common/StackedSection';
import styled, {CSS} from '@pinecast/styles';
import TextInput from '@pinecast/common/TextInput';

import ElementColorSelector from '../ElementColorSelector';
import SchemaField from '../moduleHelpers/schemaFields';

const layoutTypeOptions = [
  {key: 'stacked', label: 'Stacked'},
  {key: 'grid', label: 'Grid'},
];
const widthOptions = [
  {key: 'full', label: 'Full width'},
  {key: 'default', label: 'Use default page body width'},
];
const alignmentOptions = [
  {key: 'left', label: 'Left'},
  {key: 'center', label: 'Center'},
  {key: 'right', label: 'Right'},
];
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
  state: {containerOptionOpen: boolean; episodeOptionOpen: boolean} = {
    containerOptionOpen: false,
    episodeOptionOpen: false,
  };

  handleChangeLayoutType = (newType: string) => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      type: newType,
      elementLayout: Object.values(itemLayoutsMetadata)
        .find(val => val.type === newType)
        .func(),
    });
  };
  handleChangeLayoutPreset = (preset: string) => {
    this.props.onChange(this.props.index, {
      ...this.props.layout,
      elementLayout: itemLayoutsMetadata[preset].func(),
    });
  };

  handleDelete = () => {
    this.props.onDelete(this.props.index);
  };
  handleMoveDown = () => {
    this.props.onSwap(this.props.index, this.props.index - 1);
  };
  handleMoveUp = () => {
    this.props.onSwap(this.props.index, this.props.index + 1);
  };

  handleToggleContainer = () => {
    this.setState({
      containerOptionOpen: !this.state.containerOptionOpen,
      episodeOptionOpen: false,
    });
  };
  handleToggleEpisode = () => {
    this.setState({
      episodeOptionOpen: !this.state.episodeOptionOpen,
      containerOptionOpen: false,
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
    const {schema = {}} = itemLayoutsMetadata[layout.elementLayout.tag];
    return (
      <StackedSection>
        <Label text="Layout type">
          <Group spacing={16}>
            <Select
              onChange={this.handleChangeLayoutType}
              options={layoutTypeOptions}
              style={{display: 'inline-flex'}}
              value={layout.type}
            />
            <Select
              onChange={this.handleChangeLayoutPreset}
              options={Object.entries(itemLayoutsMetadata)
                .filter(([key]) => key.startsWith(`${layout.type}.`))
                .map(([key, {name}]) => ({label: name, key}))}
              style={{display: 'inline-flex'}}
              value={layout.elementLayout.tag}
            />
          </Group>
        </Label>
        <Label text="Number of episodes to show">
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
          <ButtonGroup wrapperStyle={{marginRight: 'auto'}}>
            <Button onClick={this.handleToggleContainer}>
              {this.state.containerOptionOpen
                ? 'Hide container options'
                : 'Show container options'}
            </Button>
            {Object.keys(schema).length > 0 && (
              <Button onClick={this.handleToggleEpisode}>
                {this.state.episodeOptionOpen
                  ? 'Hide episode options'
                  : 'Show episode options'}
              </Button>
            )}
          </ButtonGroup>
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
        <Collapser open={this.state.containerOptionOpen}>
          <Label $oneLine style={{marginTop: 12}} text="Container inner size">
            <Select
              disabled={!this.state.containerOptionOpen}
              onChange={this.handleWidthChange}
              options={widthOptions}
              value={layout.width || 'default'}
            />
          </Label>
          <Label $oneLine text="Container alignment">
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
        </Collapser>
        <Collapser
          open={this.state.episodeOptionOpen}
          paddingTop={12}
          shave={4}
        >
          {Object.entries(schema).map(([key, schema]) => (
            <SchemaField
              field={key}
              key={key}
              onUpdate={this.handleSchemaChange}
              open={this.state.episodeOptionOpen}
              schema={schema as primitives.ComponentLayoutOption}
              tagOptions={layout.elementLayout.tagOptions}
            />
          ))}
        </Collapser>
      </StackedSection>
    );
  }
}
