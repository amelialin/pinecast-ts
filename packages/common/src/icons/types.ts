import * as React from 'react';

export type CommonProps = {
  color?: string;
  height?: number;
  width?: number;
} & React.SVGAttributes<SVGSVGElement>;
