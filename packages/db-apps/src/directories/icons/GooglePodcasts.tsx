import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

const SVG = styled('svg');

export default ({size, style}: {size: number; style?: CSS}) => (
  <SVG
    width={size}
    height={size}
    viewBox="0 0 176 176"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <g>
      <path fill="#0066D9" d="M139 68h27v42h-27z" />
      <path fill="#34A853" d="M108 38h25v102h-25z" />
      <path fill="#FAB908" d="M71 8h30v161H71z" />
      <path fill="#EA4335" d="M40 42h27v100H40z" />
      <path fill="#0066D9" d="M9 66h27v44H9z" />
    </g>
    <path
      d="M88 176c-48.601 0-88-39.399-88-88S39.399 0 88 0s88 39.399 88 88-39.399 88-88 88zm64.5-103a9.5 9.5 0 0 0-9.5 9.5v10a9.5 9.5 0 0 0 19 0v-10a9.5 9.5 0 0 0-9.5-9.5zm-32-30a9.5 9.5 0 0 0-9.5 9.5v10a9.5 9.5 0 0 0 19 0v-10a9.5 9.5 0 0 0-9.5-9.5zm0 38a9.5 9.5 0 0 0-9.5 9.5v32a9.5 9.5 0 0 0 19 0v-32a9.5 9.5 0 0 0-9.5-9.5zm-33-68a9.5 9.5 0 0 0-9.5 9.5v10a9.5 9.5 0 0 0 19 0v-10a9.5 9.5 0 0 0-9.5-9.5zm0 38a9.5 9.5 0 0 0-9.5 9.5v54a9.5 9.5 0 0 0 19 0v-54a9.5 9.5 0 0 0-9.5-9.5zm-33-9a9.5 9.5 0 0 0-9.5 9.5v34a9.5 9.5 0 0 0 19 0v-34a9.5 9.5 0 0 0-9.5-9.5zm0 61a9.5 9.5 0 0 0-9.5 9.5v10a9.5 9.5 0 0 0 19 0v-10a9.5 9.5 0 0 0-9.5-9.5zm-32-30a9.5 9.5 0 0 0-9.5 9.5v10a9.5 9.5 0 0 0 19 0v-10a9.5 9.5 0 0 0-9.5-9.5zm65 60a9.5 9.5 0 0 0-9.5 9.5v10a9.5 9.5 0 0 0 19 0v-10a9.5 9.5 0 0 0-9.5-9.5z"
      fill="#FFF"
    />
  </SVG>
);
