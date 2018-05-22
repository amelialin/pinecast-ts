import * as React from 'react';

import * as constants from './constants';

type Blob = {
  queryString: string;
  type: constants.AnalyticsType;
  view: constants.AnalyticsView;
};

const context = React.createContext<Blob>({
  queryString: '',
  type: 'podcast',
  view: 'listen',
});

export const Consumer = context.Consumer;
export const Provider = context.Provider;
