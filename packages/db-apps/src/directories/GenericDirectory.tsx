import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {DashboardTitle} from '@pinecast/common/Text';
import {CSS} from '@pinecast/styles';

type Props = {
  cta: React.ReactNode;
  directoryName: string;
  href: string;
  icon: React.ReactElement<{size: number; style: CSS}>;
};

const GenericDirectory = ({cta, directoryName, href, icon}: Props) => (
  <Card style={{alignItems: 'center', flexDirection: 'row'}} whiteBack>
    {React.cloneElement(icon, {
      size: 20,
      style: {marginRight: 12},
    })}
    <DashboardTitle style={{flex: '1 1', marginBottom: 0}}>
      {directoryName}
    </DashboardTitle>
    <Button onClick={() => window.open(href)} size="small">
      {cta}
    </Button>
  </Card>
);

export default GenericDirectory;
