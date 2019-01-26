import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

const SVG = styled('svg');

export default ({size, style}: {size: number; style?: CSS}) => (
  <SVG
    width={size}
    height={size}
    viewBox="0 0 68 68"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <g fillRule="nonzero" fill="none">
      <circle fill="#FFF" cx="34.5" cy="34.5" r="32.5" />
      <path
        d="M34 68C15.222 68 0 52.778 0 34S15.222 0 34 0s34 15.222 34 34-15.222 34-34 34zM15.758 33.898c0-10.019 8.121-18.14 18.14-18.14s18.14 8.121 18.14 18.14h6.758C58.796 20.148 47.65 9 33.898 9 20.148 9 9 20.147 9 33.898s11.147 24.898 24.898 24.898v-6.758c-10.019 0-18.14-8.121-18.14-18.14zm8.588.158c0-5.363 4.347-9.71 9.71-9.71a9.71 9.71 0 0 1 9.71 9.71h5.167c0-8.216-6.66-14.876-14.877-14.876-8.216 0-14.876 6.66-14.876 14.876 0 8.217 6.66 14.877 14.876 14.877v-5.166c-5.363 0-9.71-4.348-9.71-9.71v-.001z"
        fill="#F44336"
      />
    </g>
  </SVG>
);
