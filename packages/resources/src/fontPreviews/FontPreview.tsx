import * as React from 'react';

const paths = require('./familyPaths.json');

export default (family: string) => () => (
  <svg height={28} width={250}>
    <g style={{transform: 'translate(0, 22px)'}}>
      <path d={paths[family]} fill="currentColor" />
    </g>
  </svg>
);
