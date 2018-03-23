import * as React from 'react';

import Card from '@pinecast/common/Card';

import Headline from './components/Headline';

const ViewCommunity = () => (
  <div>
    <Headline>You're on the community plan.</Headline>
    <Card
      style={{
        fontSize: 16,
        lineHeight: 24,
        margin: '0 auto 100px',
        maxWidth: 500,
      }}
      whiteBack
    >
      Our Community plan members are the very essence of why we started
      Pinecast. We're happy to have you and your show on our service, and would
      love to help if you need anything. If you're running up against the limits
      of the community plan, don't hesitate to get in touch.
    </Card>
  </div>
);

export default ViewCommunity;
