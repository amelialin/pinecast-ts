import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import styled, {renderPage} from '@pinecast/styles';
import TextInput from '@pinecast/common/TextInput';

const Wrapper = styled('div', {
  fontFamily: 'sans-serif',
  margin: '25vh auto 0',
  maxWidth: 300,
  textAlign: 'center',
});

export const markup = (error?: boolean) =>
  renderPage(
    <Wrapper>
      <p>A password is required to proceed.</p>
      <form method="POST">
        {error && (
          <Callout type="negative">That password was not correct.</Callout>
        )}
        <TextInput
          autoFocus
          name="__auth_password"
          placeholder="••••"
          required
          size="large"
          style={{marginBottom: 20, textAlign: 'center'}}
          type="password"
          value=""
        />
        <Button $isPrimary size="large" type="submit">
          Continue
        </Button>
      </form>
    </Wrapper>,
    {
      headIncludes: `
      <title>Password required</title>
    `.trim(),
    },
  );
