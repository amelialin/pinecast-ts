import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';

import {changeColor} from '../../actions/theme';
import HelpText from '../../common/HelpText';
import {PanelDescription, PanelHeader, PanelWrapper} from '../common';
import {ReducerType} from '../../reducer';
import Swatch from './Swatch';
import swatches from './swatches';
import Tabs, {Tab} from '../../common/Tabs';

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
}: {
  colors: ReducerType['theme']['colors'];
  changeColor: (colorPair: {[colorName: string]: string}) => void;
}) => (
  <PanelWrapper>
    <PanelHeader>Colors</PanelHeader>
    <PanelDescription>
      Changing colors here will adjust the color palette for your site.
    </PanelDescription>
    <Tabs>
      <Tab name="Swatches">
        <HelpText>
          Below are pre-made color palettes that you can use for your site.
        </HelpText>
        {Object.entries(swatches).map(([slug, swatch]) =>
          renderSwatch(slug, swatch, changeColor),
        )}
      </Tab>
      <Tab name="Custom" />
    </Tabs>
  </PanelWrapper>
);

export default connect(
  (state: ReducerType) => ({
    colors:
      state.theme.colors || presets.themes[state.theme.$type].colors || {},
  }),
  {changeColor},
)(ColorsPanel);
