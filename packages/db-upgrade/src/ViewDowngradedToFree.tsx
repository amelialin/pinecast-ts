import * as React from 'react';

import styled from '@pinecast/styles';

import Headline from './components/Headline';

const Copy = styled('p', {
  fontSize: 16,
  lineHeight: 32,
  margin: '0 auto 20px',
  maxWidth: 500,
  textAlign: 'left',
});

const ViewDowngradedToFree = () => (
  <div style={{paddingBottom: 150}}>
    <Headline>We're sad to see you go!</Headline>
    <Copy>
      Goodbyes are always bittersweet. We have finished processing your request
      to cancel your Pinecast subscription. We'll miss you! If you need help
      setting up an RSS feed redirect or have feedback about Pinecast, please
      reach out to us via the chat icon in the bottom right corner of the
      screen.
    </Copy>
    <Copy>
      Of course, if you ever decide to return, we'll be here. Don't hesitate to
      drop us a line.
    </Copy>
  </div>
);

export default ViewDowngradedToFree;
