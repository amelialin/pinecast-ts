import * as React from 'react';

import * as constants from './constants';

type Blob = {
  customTimeframe: [Date, Date] | null;
  queryString: string;
  type: constants.AnalyticsType;
  view: constants.AnalyticsView;
};

const context = React.createContext<Blob>({
  customTimeframe: null,
  queryString: '',
  type: 'podcast',
  view: 'listen',
});

export const Consumer = context.Consumer;
export const Provider = context.Provider;
