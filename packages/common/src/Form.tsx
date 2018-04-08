import * as React from 'react';

import styled from '@pinecast/styles';

import {Children} from './types';

const Form_ = styled(
  'form',
  {
    display: 'block',
    marginBottom: 20,
  },
  {method: 'post'},
);

const Form = ({
  children,
  onSubmit,
  ...rest
}: {
  children: Children;
  onSubmit: () => void;
} & React.HTMLProps<HTMLFormElement>) => {
  return (
    <Form_
      {...rest}
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </Form_>
  );
};

export default Form;
