import * as React from 'react';

import {IconProps} from './types';

const ErrorIcon = ({color = 'rgba(0, 0, 0, 0.2)', size, style}: IconProps) => (
  <svg height={size} width={size} style={style}>
    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
    <text
      alignmentBaseline="central"
      fill="#fff"
      fontSize={`${size / 2}px`}
      textAnchor="middle"
      x={size / 2}
      y={size / 2}
    >
      !
    </text>
  </svg>
);

export default ErrorIcon;
