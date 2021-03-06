import * as React from 'react';

import {prepareStyle} from '@pinecast/sb-components';
import styled from '@pinecast/styles';

import {Preset} from './buttonPresets';

const Button = styled(
  'button',
  {
    border: 0,
    display: 'inline-flex',
    fontSize: '1em',
    lineHeight: '1em',
    marginRight: 30,
    marginBottom: 30,
    textDecoration: 'none',
  },
  {type: 'button'},
);

const noop = () => {};

const ButtonPreview = ({
  onClick = noop,
  preset,
  style,
  theme,
}: {
  onClick?: () => void;
  preset: Preset;
  style?: React.CSSProperties;
  theme: any;
}) => (
  <Button
    onClick={onClick}
    style={{
      ...prepareStyle(
        {
          backgroundColor: 'buttons',
          borderRadius: 0,
          color: 'buttonsText',
          ...preset.style,
        },
        theme,
      ),
      ...style,
    }}
  >
    {preset.name}
  </Button>
);

export default ButtonPreview;
