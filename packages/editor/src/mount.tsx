import React from 'react';
import ReactDOM from 'react-dom';

import Editor from './Editor';

Array.from(document.querySelectorAll('.sb-editor-placeholder')).forEach(el => ReactDOM.render(<Editor />, el));
