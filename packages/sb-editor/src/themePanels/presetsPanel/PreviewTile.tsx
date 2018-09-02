import {connect} from 'react-redux';
import * as React from 'react';

import OptionButton from '@pinecast/common/OptionButton';
import * as presets from '@pinecast/sb-presets';
import {CSS} from '@pinecast/styles';

import {ReducerType} from '../../reducer';

const styleOverride: CSS = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 30,
  minHeight: 150,
  padding: 10,
  width: '100%',
};

type Props = {
  onSelect: (val: string) => void;
  type: string;
};
type StateProps = {
  isActive: boolean;
};
const PreviewTile = ({isActive, onSelect, type}: Props & StateProps) => {
  const theme = presets.themes[type];
  return (
    <OptionButton
      bright
      onClick={() => onSelect(type)}
      selected={isActive}
      style={{...styleOverride, background: theme.colors.background}}
    >
      <div
        style={{
          background: theme.colors.accent,
          margin: 0,
          padding: 15,
          width: '100%',
        }}
      >
        <h2 style={{color: theme.colors.foreground, margin: 0}}>
          {presets.metadata[type].name}
        </h2>
      </div>
      <div
        style={{
          background: theme.colors.secondaryBackground,
          padding: 15,
          width: '100%',
        }}
      >
        <p
          style={{
            color: theme.colors.text,
            fontSize: theme.styling.page.fontSize,
            margin: 0,
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </OptionButton>
  );
};

export default connect((state: ReducerType, ownProps: Props) => ({
  isActive: state.theme.$type === ownProps.type,
}))(PreviewTile);
