import * as React from 'react';

import styled from '@pinecast/styles';

import Label from '@pinecast/common/Label';
import SwatchChiclet from './SwatchChiclet';

const Button = styled(
  'button',
  {
    alignItems: 'stretch',
    background: '#fff',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025)',
    cursor: 'pointer',
    display: 'flex',
    height: 50,
    marginBottom: 30,
    overflow: 'hidden',
    padding: 0,
    transition: 'box-shadow 0.3s',
    width: '100%',

    ':hover': {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1)',
    },
    ':active': {
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15)',
    },
  },
  {type: 'button'},
);

const Swatch = ({
  colors,
  name,
  onClick,
}: {
  colors: {[key: string]: string};
  name: string;
  onClick: () => void;
}) => (
  <Label text={name}>
    <Button onClick={() => onClick()}>
      <SwatchChiclet colorKey="background" color={colors.background} />
      <SwatchChiclet
        colorKey="secondaryBackground"
        color={colors.secondaryBackground}
      />
      <SwatchChiclet colorKey="foreground" color={colors.foreground} />
      <SwatchChiclet colorKey="accent" color={colors.accent} />
      <SwatchChiclet
        colorKey="secondaryAccent"
        color={colors.secondaryAccent}
      />
      <SwatchChiclet colorKey="buttons" color={colors.buttons} />
      <SwatchChiclet colorKey="buttonsText" color={colors.buttonsText} />
      <SwatchChiclet colorKey="links" color={colors.links} />
      <SwatchChiclet colorKey="text" color={colors.text} />
    </Button>
  </Label>
);

export default Swatch;
