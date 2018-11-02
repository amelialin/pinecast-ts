import * as React from 'react';

import Card from '@pinecast/common/Card';
import {DashboardTitle} from '@pinecast/common/Text';
import {MovingTruck, Quill} from '@pinecast/common/icons/medium';
import OptionButton from '@pinecast/common/OptionButton';
import styled, {CSS} from '@pinecast/styles';

const cardStyles: CSS = {
  margin: '0 auto',
  maxWidth: 450,

  '@media (max-width: 800px)': {
    maxWidth: 'none',
  },
};

const Row = styled('div', {
  display: 'flex',
  justifyContent: 'stretch',
});
const TextWrap = styled('span', {
  display: 'block',
  marginTop: 8,
});

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
      <OptionButton
        onClick={() => onChange('form')}
        selected={source === 'form'}
        style={{
          alignItems: 'center',
          flex: '1 1',
          marginRight: 12,
          textAlign: 'center',
        }}
      >
        <Quill color={source === 'form' ? '#4e7287' : '#708d9e'} height={48} />
        <TextWrap>Start from scratch</TextWrap>
      </OptionButton>
      <OptionButton
        onClick={() => onChange('import')}
        selected={source === 'import'}
        style={{alignItems: 'center', flex: '1 1', textAlign: 'center'}}
      >
        <MovingTruck
          color={source === 'import' ? '#4e7287' : '#708d9e'}
          height={48}
        />
        <TextWrap>Import from elsewhere</TextWrap>
      </OptionButton>
    </Row>
  </Card>
);

export default SourceSelector;
