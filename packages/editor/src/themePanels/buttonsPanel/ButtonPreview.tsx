import {connect} from 'react-redux';
import * as React from 'react';

import {prepareStyle} from '@pinecast/sb-components';
import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import {ReducerType} from '../../reducer';
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

const ButtonPreview = ({
  onClick = () => {},
  preset,
  style = null,
  theme,
}: {
  onClick?: () => void;
  preset: Preset;
  style?: React.CSSProperties;
  theme: Object;
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
