import * as React from 'react';

import Headline from './components/Headline';
import {Plan} from './types';
import State from './State';

const ViewDemo = () => (
  <State>
    {({}) => (
      <div>
        <Headline>Is your podcast ready for the good stuff?</Headline>
      </div>
    )}
  </State>
);

export default ViewDemo;
