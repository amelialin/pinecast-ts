import * as React from 'react';

import Card from '@pinecast/common/Card';
import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled, {CSS} from '@pinecast/styles';

const cardStyles: CSS = {
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  padding: 0,
};

const ColorPanel = styled('label', ({$color}: {$color: string}) => ({
  alignItems: 'flex-end',
  appearance: 'none',
  backgroundColor: $color,
  border: 0,
  display: 'flex',
  flex: '1 1',
  fontSize: 16,
  margin: 0,
  padding: '80px 12px 12px',
  textAlign: 'left',
}));
const ColorInput = styled(
  'input',
  ({$invert}: {$invert: boolean}) => ({
    background: 'transparent',
    border: 0,
    borderRadius: 4,
    color: $invert ? '#fff' : '#000',
    fontFamily: DEFAULT_FONT,
    fontSize: 16,
    padding: 0,
    transition: 'background-color 0.2s, color 0.2s',
    width: '100%',

    ':focus': {
      background: '#fff',
      color: '#000',
      outline: 'none',
    },
  }),
  {
    type: 'text',
    onFocus: (e: React.FormEvent<HTMLInputElement>) => {
      (e.target as HTMLInputElement).select();
      document.execCommand('copy');
    },
    readOnly: true,
  },
);

const Color = ({color, invert}: {color: string; invert?: boolean}) => (
  <ColorPanel $color={color} onClick={() => {}}>
    <ColorInput $invert={invert || false} value={color.toLowerCase()} />
  </ColorPanel>
);

export default {
  name: 'Colors',
  examples: [
    {
      title: 'Grays',
      render: () => (
        <Card style={cardStyles}>
          <Color color="#44484d" invert />
          <Color color="#616669" invert />
          <Color color="#7f8486" />
          <Color color="#939899" />
          <Color color="#b0b5b5" />
          <Color color="#c6caca" />
          <Color color="#dee1df" />
          <Color color="#eeefea" />
        </Card>
      ),
    },
    {
      title: 'Blues',
      render: () => (
        <Card style={cardStyles}>
          <Color color="#32586e" invert />
          <Color color="#4e7287" invert />
          <Color color="#708d9e" />
          <Color color="#8aa3b1" />
          <Color color="#9eb4c0" />
          <Color color="#b7c9d1" />
          <Color color="#c9d9e0" />
          <Color color="#d8e9f1" />
        </Card>
      ),
    },
    {
      title: 'Greens',
      render: () => (
        <Card style={cardStyles}>
          <Color color="#146640" invert />
          <Color color="#259461" />
          <Color color="#51D197" />
          <Color color="#8aeabf" />
        </Card>
      ),
    },
    {
      title: 'Reds',
      render: () => (
        <Card style={cardStyles}>
          <Color color="#BF1D1D" invert />
          <Color color="#d24242" invert />
          <Color color="#EF6B6B" />
          <Color color="#FCB4B4" />
          <Color color="#FEDEDE" />
        </Card>
      ),
    },
  ],
};
