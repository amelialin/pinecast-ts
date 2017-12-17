import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Editor from './Editor';

Array.from(document.querySelectorAll('.sb-editor-placeholder')).forEach(el =>
  ReactDOM.render(
    <Editor
      csrf={el.getAttribute('data-csrf') || ''}
      slug={el.getAttribute('data-slug') || ''}
      theme={JSON.parse(el.getAttribute('data-theme') || '{}')}
    />,
    el,
  ),
);
