import * as React from 'react';

import {Omit} from './types';

interface Props extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode;
  onSubmit: (isValid: boolean) => void;
}

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
