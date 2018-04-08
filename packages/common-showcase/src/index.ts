import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(React.createElement(App), document.body.querySelector(
  '#root',
) as HTMLElement);
