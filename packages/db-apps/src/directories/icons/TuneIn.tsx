import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

const SVG = styled('svg');

export default ({size, style}: {size: number; style?: CSS}) => (
  <SVG
    width={size}
    height={size}
    viewBox="0 0 200 88"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <g fillRule="nonzero" fill="none">
      <path
        d="M122 26H6.5a.5.5 0 0 0-.5.5v55a.5.5 0 0 0 .5.5h115a.5.5 0 0 0 .5-.5V26zM134 16h55v37h-55z"
        fill="#FFF"
      />
      <path
        d="M200 3v62a3 3 0 0 1-3 3h-69v17a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V23a3 3 0 0 1 3-3h119V3a3 3 0 0 1 3-3h72a3 3 0 0 1 3 3zm-78 23H6.5a.5.5 0 0 0-.5.5v55a.5.5 0 0 0 .5.5h115a.5.5 0 0 0 .5-.5V26zm58.24-5.2a.8.8 0 0 0-.8-.8h-4a.8.8 0 0 0-.8.8v15c0 .24-.28.32-.36.08l-5.48-15.2a1 1 0 0 0-1-.72H163a.8.8 0 0 0-.8.8v26.43a.8.8 0 0 0 .8.81h4a.8.8 0 0 0 .8-.81V33.36c0-.24.28-.32.36-.08l5.44 14a1 1 0 0 0 1.08.68h4.72a.8.8 0 0 0 .8-.81V20.8h.04zM157.8 43.4a.8.8 0 0 0-.8-.8h-3.4a.38.38 0 0 1-.4-.4V25.8a.38.38 0 0 1 .4-.4h3a.8.8 0 0 0 .8-.8v-3.8a.8.8 0 0 0-.8-.8h-12.4a.8.8 0 0 0-.8.8v3.8a.8.8 0 0 0 .8.8h3a.38.38 0 0 1 .4.4v16.4a.38.38 0 0 1-.4.4h-3.4a.8.8 0 0 0-.8.8v3.79a.8.8 0 0 0 .8.81H157a.8.8 0 0 0 .8-.81V43.4z"
        fill="#1B1F3B"
      />
      <path
        d="M104.27 62.4H94.8a.38.38 0 0 1-.4-.4v-4.8a.38.38 0 0 1 .4-.4h9a.8.8 0 0 0 .8-.8v-4a.8.8 0 0 0-.8-.8h-9a.38.38 0 0 1-.4-.4V46a.38.38 0 0 1 .4-.4h9.31a.8.8 0 0 0 .8-.8v-4a.8.8 0 0 0-.8-.8H89.6a.8.8 0 0 0-.8.8v26.4a.81.81 0 0 0 .8.8h14.67a.81.81 0 0 0 .8-.8v-4a.8.8 0 0 0-.8-.8zM83.56 40h-4a.8.8 0 0 0-.8.8v15c0 .24-.28.32-.36.08l-5.48-15.2a1 1 0 0 0-1-.72h-4.76a.8.8 0 0 0-.8.8V67.2a.81.81 0 0 0 .8.8h4a.81.81 0 0 0 .8-.8V53.36c0-.24.28-.32.36-.08l5.44 14a1 1 0 0 0 1.08.68h4.72a.81.81 0 0 0 .79-.8V40.8a.8.8 0 0 0-.79-.8zM61 40h-4a.8.8 0 0 0-.8.8v18.8c0 1.76-1.44 3.2-3.88 3.2s-3.8-1.44-3.8-3.2V40.8a.8.8 0 0 0-.8-.8h-4a.8.8 0 0 0-.8.8v18.8c0 4.84 4 8.83 9.44 8.83 5.44 0 9.52-4 9.52-8.83V40.8A.8.8 0 0 0 61 40zm-22 .8v4a.8.8 0 0 1-.8.8h-5a.38.38 0 0 0-.4.4v21.2a.81.81 0 0 1-.8.8h-4a.81.81 0 0 1-.8-.8V46a.38.38 0 0 0-.4-.4h-5a.8.8 0 0 1-.8-.8v-4a.8.8 0 0 1 .8-.8h16.4a.8.8 0 0 1 .8.8z"
        fill="#1B1F3B"
      />
    </g>
  </SVG>
);
