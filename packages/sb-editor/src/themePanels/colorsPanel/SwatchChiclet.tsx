import * as React from 'react';

import styled from '@pinecast/styles';
import TooltipContainer from '@pinecast/common/TooltipContainer';

import colorKeyNames from '../../shared/colorNames';

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
  <TooltipContainer
    positionerStyle={{width: '100%'}}
    style={{alignItems: 'stretch', flex: '1 1'}}
    tooltipContent={
      <span>
        {(colorKeyNames as {[color: string]: string | undefined})[colorKey]}
      </span>
    }
  >
    <Chiclet $color={color} />
  </TooltipContainer>
);

export default SwatchChiclet;
