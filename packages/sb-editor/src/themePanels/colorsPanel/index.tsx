import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';

import {changeColor} from '../../actions/theme';
import ColorPicker from '../ColorPicker';
import {HelpText} from '@pinecast/common/Text';
import {
  PanelDescription,
  PanelDivider,
  PanelWrapper,
} from '../../panelComponents';
import {ReducerType} from '../../reducer';
import Swatch from './Swatch';
import swatches from './swatches';
import Tabs, {Tab} from '@pinecast/common/Tabs';

function renderSwatch(
  slug: string,
  {name, swatch}: {name: string; swatch: {[colorName: string]: string}},
  changeColor: (pair: {[colorName: string]: string}) => void,
): JSX.Element {
  return (
    <Swatch
      colors={swatch}
      key={slug}
      name={name}
      onClick={() => changeColor(swatch)}
    />
  );
}

const ColorsPanel = ({
  colors,
  changeColor,
  presetSwatch,
}: {
  colors: {[key: string]: string};
  changeColor: (colorPair: {[colorName: string]: string}) => void;
  presetSwatch: {[key: string]: string};
}) => (
  <PanelWrapper>
    <PanelDescription>
      Changing colors here will adjust the color palette for your site.
    </PanelDescription>
    <Tabs>
      <Tab name="Swatches">
        <HelpText>
          Below are pre-made color palettes that you can use for your site.
        </HelpText>
        {renderSwatch(
          '__preset__',
          {name: 'Preset default', swatch: presetSwatch},
          changeColor,
        )}
        <PanelDivider style={{marginBottom: 20}} />
        {Object.entries(swatches).map(([slug, swatch]) =>
          renderSwatch(slug, swatch, changeColor),
        )}
      </Tab>
      <Tab name="Custom">
        <HelpText>
          Adjust the colors below to tweak your site's color scheme.
        </HelpText>
        {Object.entries(colors).map(([colorKey, colorValue]) => (
          <ColorPicker
            colorKey={colorKey}
            colorValue={colorValue}
            key={colorKey}
            onChange={color => changeColor({...colors, [colorKey]: color})}
          />
        ))}
      </Tab>
    </Tabs>
  </PanelWrapper>
);

export default connect(
  (state: ReducerType) => ({
    presetSwatch: presets.themes[state.theme.$type].colors,
    colors: {
      ...presets.themes[state.theme.$type].colors,
      ...state.theme.colors,
    },
  }),
  {changeColor},
)(ColorsPanel);
