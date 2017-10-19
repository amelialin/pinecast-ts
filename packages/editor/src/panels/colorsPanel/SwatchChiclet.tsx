import * as React from 'react';

import Tooltip from 'rc-tooltip';

import styled from '@pinecast/sb-styles';

import './rc-tooltip.css';

const Chiclet = styled('div', ({color}) => ({
  background: color,
  flex: '1 1 100px',
  height: 50,
}));

const colorKeyNames = {
  background: 'Background',
  secondaryBackground: 'Secondary Background',
  foreground: 'Foreground',
  accent: 'Accent',
  secondaryAccent: 'Secondary Accent',
  buttons: 'Button Background',
  buttonsText: 'Button Text',
  links: 'Links',
  text: 'Text',
};

const SwatchChiclet = ({
  color,
  colorKey,
}: {
  color: string;
  colorKey: string;
}) => (
  <Tooltip placement="bottom" overlay={<span>{colorKeyNames[colorKey]}</span>}>
    <Chiclet color={color} />
  </Tooltip>
);

export default SwatchChiclet;
