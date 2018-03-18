import * as React from 'react';
import Tooltip from 'rc-tooltip';

import styled from '@pinecast/styles';

import colorKeyNames from '../../shared/colorNames';

import './rc-tooltip.css';

const Chiclet = styled('div', ({$color}: {$color: string}) => ({
  background: $color,
  flex: '1 1 100px',
  height: 50,
}));

const SwatchChiclet = ({
  color,
  colorKey,
}: {
  color: string;
  colorKey: string;
}) => (
  <Tooltip placement="bottom" overlay={<span>{colorKeyNames[colorKey]}</span>}>
    <Chiclet $color={color} />
  </Tooltip>
);

export default SwatchChiclet;
