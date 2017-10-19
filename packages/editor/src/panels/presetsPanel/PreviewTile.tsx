import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';

import {ReducerType} from '../../reducer';

interface Props {
  onSelect: (string) => void;
  type: string;
}
interface StateProps {
  isActive: boolean;
}
const PreviewTile = ({isActive, onSelect, type}: Props & StateProps) => {
  const theme = presets.themes[type];
  return (
    <button
      onClick={() => onSelect(type)}
      style={{
        background: theme.colors.background,
        border: !isActive ? '1px solid #aaa' : 'none',
        borderRadius: 3,
        boxShadow: isActive
          ? '0 0 7px 3px #8d52d1'
          : '0 3px 5px rgba(0, 0, 0, 0.2)',
        display: 'block',
        flex: '1 0 300px',
        marginBottom: 30,
        marginRight: 30,
        maxWidth: 350,
        minHeight: 250,
        padding: 10,
        textAlign: 'left',
        transition: 'box-shadow 0.3s',
      }}
      type="button"
    >
      <div style={{background: theme.colors.accent, padding: 15}}>
        <h2 style={{color: theme.colors.foreground, margin: 0}}>
          {presets.metadata[type].name}
        </h2>
      </div>
      <div style={{background: theme.colors.secondaryBackground, padding: 15}}>
        <p style={{fontSize: theme.styling.page.fontSize, margin: 0}}>
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </button>
  );
};

export default connect((state: ReducerType, ownProps: Props) => ({
  isActive: state.theme.$type === ownProps.type,
}))(PreviewTile);
