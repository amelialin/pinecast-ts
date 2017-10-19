import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Wrapper = styled('div', {
  alignItems: 'center',
  background: '#fff',
  borderRadius: 3,
  display: 'flex',
  fontSize: 14,
  height: '1.5em',
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
  padding: '0 15px',
  width: '100%',
});

const Select = ({
  onChange,
  options,
  value,
}: {
  onChange: (string) => void;
  options: {[key: string]: string};
  value: string;
}) => (
  <Wrapper>
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
