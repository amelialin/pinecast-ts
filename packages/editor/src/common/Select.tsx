import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Wrapper = styled('div', {
  alignItems: 'center',
  background: '#fff',
  borderRadius: 3,
  display: 'flex',
  fontSize: 14,
  height: '1.5em',
  position: 'relative',

  ':before': {
    border: '2px solid #222',
    borderLeft: 0,
    borderTop: 0,
    content: '""',
    display: 'block',
    height: 6,
    position: 'absolute',
    right: 10,
    transform: 'translateY(-2px) rotate(45deg)',
    width: 6,
  },
});
const Select_ = styled('select', {
  appearance: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',
  background: 'transparent',
  border: 0,
  boxShadow: 'none',
  fontFamily: 'Fira Mono',
  fontSize: 14,
  height: 'calc(1.5em - 2px)',
  lineHeight: 'calc(1.5em - 2px)',
  margin: 0,
  padding: '0 25px 0 15px',
  width: '100%',
});

const Select = ({
  onChange,
  options,
  style,
  value,
}: {
  onChange: (string) => void;
  options: {[key: string]: string};
  style?: React.CSSProperties;
  value: string;
}) => (
  <Wrapper style={style}>
    <Select_ onChange={e => onChange(e.target.value)} value={value}>
      {Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))}
    </Select_>
  </Wrapper>
);

export default Select;
