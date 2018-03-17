import * as React from 'react';

import styled from '@pinecast/styles';

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
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  onSubmit: () => void;
  style?: React.CSSProperties;
  [key: string]: any;
}) => {
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
