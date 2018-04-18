import * as React from 'react';

import Card from '@pinecast/common/Card';
import {DashboardTitle} from '@pinecast/common/Text';
import {DEFAULT_FONT} from '@pinecast/common/constants';
import {MovingTruck, Quill} from '@pinecast/common/icons/medium';
import styled, {CSS} from '@pinecast/styles';

const cardStyles: CSS = {
  margin: '0 auto',
  maxWidth: 400,

  '@media (max-width: 800px)': {
    maxWidth: 'auto',
  },
};

const Row = styled('div', {
  display: 'flex',
  justifyContent: 'stretch',
});

const Option = styled('button', ({$selected}: {$selected: boolean}) => ({
  alignItems: 'center',
  appearance: 'none',
  backgroundColor: $selected ? '#DFEDF3' : '#fff',
  border: 0,
  borderRadius: 4,
  boxShadow: '0 0 0 0 transparent, 0 0 0 0 transparent',
  cursor: 'pointer',
  display: 'flex',
  flex: '1 1',
  flexDirection: 'column',
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  margin: '0 4px',
  padding: 12,
  transition: 'background-color 0.1s, box-shadow 0.2s',

  ':not(:empty) > svg': {
    marginBottom: 12,
  },

  ':first-child': {
    marginLeft: 0,
  },
  ':last-child': {
    marginRight: 0,
  },

  ':hover': {
    backgroundColor: '#DFEDF3',
  },

  ':focus': {
    boxShadow: $selected
      ? '0 1px 2px rgba(0, 0, 0, 0.15), #eee 0 0 0 4px'
      : '0 0 0 0 transparent, #eee 0 0 0 4px',
    outline: 'none',
  },
}));

const SourceSelector = ({
  onChange,
  source,
}: {
  onChange: (newSource: 'form' | 'import') => void;
  source: 'form' | 'import' | null;
}) => (
  <Card style={cardStyles} whiteBack>
    <DashboardTitle style={{textAlign: 'center'}}>
      How would you like to begin?
    </DashboardTitle>
    <Row>
      <Option onClick={() => onChange('form')} $selected={source === 'form'}>
        <Quill color={source === 'form' ? '#4e7287' : '#708d9e'} height={48} />
        Start from scratch
      </Option>
      <Option
        onClick={() => onChange('import')}
        $selected={source === 'import'}
      >
        <MovingTruck
          color={source === 'import' ? '#4e7287' : '#708d9e'}
          height={48}
        />
        Import from elsewhere
      </Option>
    </Row>
  </Card>
);

export default SourceSelector;
