import * as React from 'react';

// import styled from '@pinecast/styles';

import {Children, Omit} from './types';

interface Props extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> {
  children: Children;
  onSubmit: (isValid: boolean) => void;
}

// const Form_ = styled('form', {display: 'block'}, {action: '', method: 'post'});

const Form = ({children, onSubmit, ...rest}: Props) => {
  return (
    <form
      {...rest}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit((e.target as HTMLFormElement).checkValidity());
      }}
    >
      {children}
    </form>
  );
};

export default Form;
