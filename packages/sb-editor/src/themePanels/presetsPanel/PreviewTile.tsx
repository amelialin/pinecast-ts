import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/styles';

import {ReducerType} from '../../reducer';

const Button = styled(
  'button',
  ({$isActive}: {$isActive: boolean}) => ({
    border: 0,
    borderRadius: 3,
    boxShadow: $isActive
      ? '0 0 0 1.5px rgba(255, 255, 255, 0.8), 0 0 0 5px #8d52d1'
      : '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    display: 'block',
    marginBottom: 30,
    minHeight: 150,
    padding: 10,
    textAlign: 'left',
    transition: 'box-shadow 0.3s',
    width: '100%',

    ':hover': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    },
    ':active': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    },
  }),
  {type: 'button'},
);

interface Props {
  onSelect: (val: string) => void;
  type: string;
}
interface StateProps {
  isActive: boolean;
}
const PreviewTile = ({isActive, onSelect, type}: Props & StateProps) => {
  const theme = presets.themes[type];
  return (
    <Button
      $isActive={isActive}
      onClick={() => onSelect(type)}
      style={{background: theme.colors.background}}
    >
      <div style={{background: theme.colors.accent, padding: 15}}>
        <h2 style={{color: theme.colors.foreground, margin: 0}}>
          {presets.metadata[type].name}
        </h2>
      </div>
      <div style={{background: theme.colors.secondaryBackground, padding: 15}}>
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
    </Button>
  );
};

export default connect((state: ReducerType, ownProps: Props) => ({
  isActive: state.theme.$type === ownProps.type,
}))(PreviewTile);
