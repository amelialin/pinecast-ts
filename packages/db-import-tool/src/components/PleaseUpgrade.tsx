import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {DashboardTitle, P} from '@pinecast/common/Text';
import {MovingTruck} from '@pinecast/common/icons/medium';
import {CSS} from '@pinecast/styles';

const cardStyles: CSS = {
  margin: '40px auto',
  maxWidth: 600,
};

const PleaseUpgrade = () => (
  <Card style={cardStyles} whiteBack>
    <MovingTruck color="#708d9e" style={{marginBottom: 20}} width={80} />
    <DashboardTitle>Use our import tool with our Starter plan</DashboardTitle>
    <P>
      Import a podcast from another hosting company to Pinecast in just minutes.
      We'll copy all of your audio and artwork to our servers.
    </P>
    <Button href="/payments/upgrade" style={{alignSelf: 'flex-start'}}>
      Upgrade now
    </Button>
  </Card>
);

export default PleaseUpgrade;
