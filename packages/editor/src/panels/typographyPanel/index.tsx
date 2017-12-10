import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import Button from '../../common/Button';
import {changeFont} from '../../actions/theme';
import {FontHashType, PartialFontHashType} from '../../reducers/theme';
import {fontKeyNames} from '../../constants';
import FontPreset from './FontPreset';
import FontSelect from './FontSelect';
import HelpText from '../../common/HelpText';
import Label from '../../common/Label';
import pairings from './pairings';
import {
  PanelDescription,
  PanelDivider,
  PanelHeader,
  PanelWrapper,
} from '../common';
import {ReducerType} from '../../reducer';
import Tabs, {Tab} from '../../common/Tabs';

const BottomMenu = styled('div', {
  borderTop: '1px solid #eee',
  marginTop: 30,
  paddingTop: 30,
});

interface RandomizableSelector {
  randomizeCategory(categories: Array<string>): void;
}

class TypographyPanel extends React.Component {
  logoSelector: RandomizableSelector | null;
  headingsSelector: RandomizableSelector | null;
  bodySelector: RandomizableSelector | null;
  props: {
    changeFont: (pair: PartialFontHashType) => void;
    fonts: FontHashType;
    defaultFonts: FontHashType;
  };

  render() {
    const {changeFont, defaultFonts, fonts} = this.props;
    return (
      <PanelWrapper>
        <PanelHeader>Typography</PanelHeader>
        <PanelDescription>
          Choose the typefaces that you wish to use on your site.
        </PanelDescription>
        <Tabs>
          <Tab name="Pairings">
            <FontPreset
              preset={{name: 'Default for preset', ...defaultFonts}}
              onClick={pairing => changeFont(pairing)}
            />
            <PanelDivider />
            <HelpText>
              Choose a combination of pre-made fonts to style your website.
            </HelpText>
            {pairings.map(pairing => (
              <FontPreset
                preset={pairing}
                key={pairing.name}
                onClick={pairing => changeFont(pairing)}
              />
            ))}
          </Tab>
          <Tab name="Custom">
            <Label text={fontKeyNames.logo} style={{marginBottom: 30}}>
              <FontSelect
                onChange={newFontValue => changeFont({logo: newFontValue})}
                ref={el => {
                  this.logoSelector = el;
                }}
                value={fonts.logo}
              />
            </Label>
            <Label text={fontKeyNames.headings} style={{marginBottom: 30}}>
              <FontSelect
                onChange={newFontValue => changeFont({headings: newFontValue})}
                ref={el => {
                  this.headingsSelector = el;
                }}
                value={fonts.headings}
              />
            </Label>
            <Label text={fontKeyNames.body} style={{marginBottom: 30}}>
              <FontSelect
                onChange={newFontValue => changeFont({body: newFontValue})}
                ref={el => {
                  this.bodySelector = el;
                }}
                value={fonts.body}
              />
            </Label>
            <BottomMenu>
              <Button
                onClick={() => {
                  if (this.logoSelector) {
                    this.logoSelector.randomizeCategory([
                      'display',
                      'handwriting',
                      'sans-serif',
                      'serif',
                    ]);
                  }
                  if (this.headingsSelector) {
                    this.headingsSelector.randomizeCategory([
                      'handwriting',
                      'sans-serif',
                      'serif',
                    ]);
                  }
                  if (this.bodySelector) {
                    this.bodySelector.randomizeCategory([
                      'sans-serif',
                      'serif',
                      'monospace',
                    ]);
                  }
                }}
              >
                I'm feeling lucky
              </Button>
            </BottomMenu>
          </Tab>
        </Tabs>
      </PanelWrapper>
    );
  }
}

export default connect(
  (state: ReducerType) => ({
    defaultFonts: presets.themes[state.theme.$type].fonts as FontHashType,
    fonts: {
      ...(presets.themes[state.theme.$type].fonts as FontHashType),
      ...state.theme.fonts,
    },
  }),
  {
    changeFont,
  },
)(TypographyPanel);
