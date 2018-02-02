import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';

import {changeEmbedWidget} from '../actions/theme';
import Label from '../common/Label';
import {PanelDescription, PanelDivider, PanelWrapper} from '../panelComponents';
import RadioList from '../common/RadioList';
import {ReducerType} from '../reducer';

const EmbedWidgetPanel = ({
  changeEmbedWidget,
  embedTheme,
}: {
  changeEmbedWidget: ((theme: string) => void);
  embedTheme: string;
}) => {
  return (
    <PanelWrapper>
      <PanelDescription>
        This is the theme that will be used for the player widgets on your site.
      </PanelDescription>
      <RadioList
        options={{
          minimal: () => (
            <Label componentType="div" text="Minimal">
              Simple, clean, and to the point
            </Label>
          ),
          thick: () => (
            <Label componentType="div" text="Thick">
              Big and colorful, full of metadata and a seek bar
            </Label>
          ),
          slim: () => (
            <Label componentType="div" text="Slim">
              Compact and efficient, only the absolute necessities
            </Label>
          ),
        }}
        onChange={changeEmbedWidget}
        value={embedTheme || 'minimal'}
      />
    </PanelWrapper>
  );
};

export default connect(
  (state: ReducerType) => {
    const theme = state.theme;
    const presetTheme = presets.themes[state.theme.$type];

    return {
      embedTheme:
        (theme.options && theme.options.embedTheme) ||
        (presetTheme.options && presetTheme.embedTheme),
    };
  },
  {
    changeEmbedWidget,
  },
)(EmbedWidgetPanel);
