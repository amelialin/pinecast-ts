import * as React from 'react';

import Card from '@pinecast/common/Card';
import Layer from '@pinecast/common/Layer';
import Positioner from '@pinecast/common/Positioner';

export default {
  name: 'Positioner',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Positioner maxHeight={30} maxWidth={200}>
          {({x, y}) => (
            <Layer x={x} y={y}>
              <Card style={{height: 30, padding: 4, width: 200}} whiteBack>
                Positioned content
              </Card>
            </Layer>
          )}
        </Positioner>
      ),
    },
    {
      title: 'Prefer',
      render: () => (
        <Positioner maxHeight={30} maxWidth={200} preferX="right" preferY="top">
          {({x, y}) => (
            <Layer x={x} y={y}>
              <Card style={{height: 30, padding: 4, width: 200}} whiteBack>
                Positioned content
              </Card>
            </Layer>
          )}
        </Positioner>
      ),
    },
  ],
};
