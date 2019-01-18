import {defineMessages, Message} from '@pinecast/i18n';

export const TYPE_LISTENS = 'listen';
export const TYPE_LISTENS_SPOTIFY = 'listen_spotify';
export const TYPE_SUBS = 'subscribers';
export const TYPE_BY_EPISODE = 'listen_by_episode';
export const TYPE_BY_SOURCE = 'listen_by_source';
export const TYPE_BY_AGENT = 'listen_by_agent';
export const TYPE_BY_OS = 'listen_by_os';
export const TYPE_GEO_SUBS = 'subscribers_geo';
export const TYPE_GEO_LISTENS = 'listen_geo';
export const TYPE_GEO_GRAN_SUBS = 'subscribers_geo_gran';
export const TYPE_GEO_GRAN_LISTENS = 'listen_geo_gran';
export const TYPE_TOP_EPISODES = 'top_episodes';
export const TYPE_GROWTH = 'network_growth';

export type AnalyticsType = 'episode' | 'network' | 'podcast';
export type AnalyticsView =
  | typeof TYPE_LISTENS
  | typeof TYPE_LISTENS_SPOTIFY
  | typeof TYPE_SUBS
  | typeof TYPE_BY_EPISODE
  | typeof TYPE_BY_SOURCE
  | typeof TYPE_BY_AGENT
  | typeof TYPE_BY_OS
  | typeof TYPE_GEO_SUBS
  | typeof TYPE_GEO_LISTENS
  | typeof TYPE_GEO_GRAN_SUBS
  | typeof TYPE_GEO_GRAN_LISTENS
  | typeof TYPE_TOP_EPISODES
  | typeof TYPE_GROWTH;

export const TYPES: {[type: string]: Array<AnalyticsView>} = {
  episode: [
    TYPE_LISTENS,
    TYPE_BY_SOURCE,
    TYPE_BY_AGENT,
    TYPE_GROWTH,
    TYPE_GEO_LISTENS,
    TYPE_GEO_GRAN_LISTENS,
  ],
  network: [
    TYPE_LISTENS,
    TYPE_SUBS,
    TYPE_TOP_EPISODES,
    TYPE_GROWTH,
    TYPE_BY_SOURCE,
    TYPE_BY_AGENT,
    TYPE_GEO_LISTENS,
    TYPE_GEO_GRAN_LISTENS,
    TYPE_GEO_SUBS,
    TYPE_GEO_GRAN_SUBS,
  ],
  podcast: [
    TYPE_LISTENS,
    TYPE_LISTENS_SPOTIFY,
    TYPE_SUBS,
    TYPE_BY_EPISODE,
    TYPE_BY_SOURCE,
    TYPE_BY_AGENT,
    TYPE_BY_OS,
    TYPE_GROWTH,
    TYPE_GEO_LISTENS,
    TYPE_GEO_GRAN_LISTENS,
    TYPE_GEO_SUBS,
    TYPE_GEO_GRAN_SUBS,
    TYPE_TOP_EPISODES,
  ],
};

export const TYPES_NAMES: {[type: string]: Message} = defineMessages({
  [TYPE_LISTENS]: {
    id: 'db-analytics.labels.types.listens.total',
    description: 'Label for an analytics view showing total listens',
    defaultMessage: 'Total listens',
  },
  [TYPE_LISTENS_SPOTIFY]: {
    id: 'db-analytics.labels.types.listens.total.spotify',
    description: 'Label for an analytics view showing total listens on Spotify',
    defaultMessage: 'Total listens on Spotify',
  },
  [TYPE_SUBS]: {
    id: 'db-analytics.labels.types.subscribers.total',
    description: 'Label for an analytics view showing total subscribers',
    defaultMessage: 'Subscribers',
  },
  [TYPE_GROWTH]: {
    id: 'db-analytics.labels.types.listens.growth',
    description: 'Label for an analytics view showing growth over time',
    defaultMessage: 'Listen growth',
  },
  [TYPE_BY_EPISODE]: {
    id: 'db-analytics.labels.types.listens.by-episode',
    description:
      'Label for an analytics view showing listens broken down by episode',
    defaultMessage: 'Listens by episode (truncated)',
  },
  [TYPE_BY_SOURCE]: {
    id: 'db-analytics.labels.types.listens.source',
    description:
      'Label for an analytics view showing listens by where they came from',
    defaultMessage: 'Listens by source',
  },
  [TYPE_BY_AGENT]: {
    id: 'db-analytics.labels.types.listens.agent',
    description:
      'Label for an analytics view showing listens by the agent used to make them',
    defaultMessage: 'Listens by agent',
  },
  [TYPE_BY_OS]: {
    id: 'db-analytics.labels.types.listens.os',
    description:
      'Label for an analytics view showing listens by the OS used to make them',
    defaultMessage: 'Listens by OS',
  },
  [TYPE_GEO_SUBS]: {
    id: 'db-analytics.labels.types.subscribers.location',
    description:
      'Label for an analytics view showing the location of subscribers',
    defaultMessage: 'Subscriber locations',
  },
  [TYPE_GEO_GRAN_SUBS]: {
    id: 'db-analytics.labels.types.subscribers.location.city',
    description:
      'Label for an analytics view showing the location of subscribers by city',
    defaultMessage: 'Subscriber locations by city',
  },
  [TYPE_GEO_LISTENS]: {
    id: 'db-analytics.labels.types.listeners.location',
    description:
      'Label for an analytics view showing the location of listeners',
    defaultMessage: 'Listener Locations',
  },
  [TYPE_GEO_GRAN_LISTENS]: {
    id: 'db-analytics.labels.types.listeners.location.city',
    description:
      'Label for an analytics view showing the location of listeners by city',
    defaultMessage: 'Listener locations by city',
  },
  [TYPE_TOP_EPISODES]: {
    id: 'db-analytics.labels.types.top-episodes',
    description: 'Label for an analytics view showing the top episodes',
    defaultMessage: 'Top episodes',
  },
});

export const TYPES_ENDPOINTS: {[type: string]: {[view: string]: string}} = {
  episode: {
    [TYPE_LISTENS]: 'episode/listens',
    [TYPE_LISTENS_SPOTIFY]: 'episode/listens/spotify',
    [TYPE_BY_SOURCE]: 'episode/listens/breakdown',
    [TYPE_BY_AGENT]: 'episode/listens/agent',
    [TYPE_GROWTH]: 'episode/growth',
    [TYPE_GEO_LISTENS]: 'episode/listens/location',
    [TYPE_GEO_GRAN_LISTENS]: 'episode/listens/location/options',
  },
  network: {
    [TYPE_LISTENS]: 'network/listens',
    [TYPE_LISTENS_SPOTIFY]: 'network/listens/spotify',
    [TYPE_BY_SOURCE]: 'network/listens/breakdown',
    [TYPE_BY_AGENT]: 'network/listens/agent',
    [TYPE_GROWTH]: 'network/growth',
    [TYPE_GEO_LISTENS]: 'network/listens/location',
    [TYPE_GEO_GRAN_LISTENS]: 'network/listens/location/options',
    [TYPE_TOP_EPISODES]: 'network/listens/top-episodes',
    [TYPE_SUBS]: 'network/subscribers',
    [TYPE_GEO_SUBS]: 'network/subscribers/location',
    [TYPE_GEO_GRAN_SUBS]: 'network/subscribers/location/options',
  },
  podcast: {
    [TYPE_LISTENS]: 'podcast/listens',
    [TYPE_LISTENS_SPOTIFY]: 'podcast/listens/spotify',
    [TYPE_GROWTH]: 'podcast/growth',
    [TYPE_BY_EPISODE]: 'podcast/listens/episode',
    [TYPE_BY_SOURCE]: 'podcast/listens/breakdown',
    [TYPE_BY_AGENT]: 'podcast/listens/agent',
    [TYPE_BY_OS]: 'podcast/listens/os',
    [TYPE_GEO_LISTENS]: 'podcast/listens/location',
    [TYPE_GEO_GRAN_LISTENS]: 'podcast/listens/location/options',
    [TYPE_TOP_EPISODES]: 'podcast/listens/top-episodes',
    [TYPE_SUBS]: 'podcast/subscribers',
    [TYPE_GEO_SUBS]: 'podcast/subscribers/location',
    [TYPE_GEO_GRAN_SUBS]: 'podcast/subscribers/location/options',
  },
};
export const TYPES_ENDPOINTS_MENU: {
  [type: string]: {[view: string]: (choice: string) => string};
} = {
  episode: {
    [TYPE_GEO_GRAN_LISTENS]: (choice: string) =>
      `episode/listens/location/${encodeURIComponent(choice)}`,
  },
  network: {
    [TYPE_GEO_GRAN_LISTENS]: (choice: string) =>
      `network/listens/location/${encodeURIComponent(choice)}`,
    [TYPE_GEO_GRAN_SUBS]: (choice: string) =>
      `network/subscribers/location/${encodeURIComponent(choice)}`,
  },
  podcast: {
    [TYPE_GEO_GRAN_LISTENS]: (choice: string) =>
      `podcast/listens/location/${encodeURIComponent(choice)}`,
    [TYPE_GEO_GRAN_SUBS]: (choice: string) =>
      `podcast/subscribers/location/${encodeURIComponent(choice)}`,
  },
};

export type ChartType =
  | 'timeseries'
  | 'pie'
  | 'geo'
  | 'menu'
  | 'table'
  | 'growth'
  | 'geo_gran';

export const TYPES_CHART_TYPES: {[view: string]: ChartType} = {
  [TYPE_LISTENS]: 'timeseries',
  [TYPE_LISTENS_SPOTIFY]: 'timeseries',
  [TYPE_SUBS]: 'timeseries',
  [TYPE_BY_EPISODE]: 'timeseries',
  [TYPE_BY_SOURCE]: 'timeseries',
  [TYPE_BY_AGENT]: 'pie',
  [TYPE_BY_OS]: 'pie',
  [TYPE_GEO_SUBS]: 'geo',
  [TYPE_GEO_LISTENS]: 'geo',
  [TYPE_GEO_GRAN_SUBS]: 'menu',
  [TYPE_GEO_GRAN_LISTENS]: 'menu',
  [TYPE_TOP_EPISODES]: 'table',
  [TYPE_GROWTH]: 'growth',
};
export const TYPES_CHART_MENU_TYPES: {[view: string]: ChartType} = {
  [TYPE_GEO_GRAN_SUBS]: 'geo_gran',
  [TYPE_GEO_GRAN_LISTENS]: 'geo_gran',
};

export const TYPES_CHART_REQUIRES: {
  [view: string]: null | 'starter' | 'pro';
} = {
  [TYPE_LISTENS]: null,
  [TYPE_LISTENS_SPOTIFY]: null,
  [TYPE_SUBS]: null,
  [TYPE_BY_EPISODE]: 'starter',
  [TYPE_BY_SOURCE]: null,
  [TYPE_BY_AGENT]: 'starter',
  [TYPE_BY_OS]: 'starter',
  [TYPE_GEO_SUBS]: 'pro',
  [TYPE_GEO_LISTENS]: 'pro',
  [TYPE_GEO_GRAN_SUBS]: 'pro',
  [TYPE_GEO_GRAN_LISTENS]: 'pro',
  [TYPE_TOP_EPISODES]: 'pro',
  [TYPE_GROWTH]: 'pro',
};

export const TYPES_SHOW_TOTAL: {[view: string]: true} = {
  [TYPE_LISTENS]: true,
  [TYPE_LISTENS_SPOTIFY]: true,
  [TYPE_BY_EPISODE]: true,
  [TYPE_BY_SOURCE]: true,
};

export type Timeframe =
  | 'all'
  | 'year'
  | 'sixmonth'
  | 'month'
  | 'week'
  | 'day'
  | 'custom';
export type Granularity = 'monthly' | 'weekly' | 'daily' | 'hourly';

export const GRANULARITY_LABELS = defineMessages({
  monthly: {
    id: 'db-analytics.labels.granularity.month',
    description: 'Label for analytics granularity',
    defaultMessage: 'By month',
  },
  weekly: {
    id: 'db-analytics.labels.granularity.week',
    description: 'Label for analytics granularity',
    defaultMessage: 'By week',
  },
  daily: {
    id: 'db-analytics.labels.granularity.day',
    description: 'Label for analytics granularity',
    defaultMessage: 'By day',
  },
  hourly: {
    id: 'db-analytics.labels.granularity.hour',
    description: 'Label for analytics granularity',
    defaultMessage: 'By hour',
  },
});
export const TIMEFRAME_LABELS = {
  all: {
    id: 'db-analytics.labels.timeframe.time',
    description: 'Label for analytics timeframe',
    defaultMessage: 'All time',
  },
  year: {
    id: 'db-analytics.labels.timeframe.year',
    description: 'Label for analytics timeframe',
    defaultMessage: 'Previous year',
  },
  sixmonth: {
    id: 'db-analytics.labels.timeframe.6',
    description: 'Label for analytics timeframe',
    defaultMessage: 'Previous 6 months',
  },
  month: {
    id: 'db-analytics.labels.timeframe.month',
    description: 'Label for analytics timeframe',
    defaultMessage: 'Previous month',
  },
  week: {
    id: 'db-analytics.labels.timeframe.week',
    description: 'Label for analytics timeframe',
    defaultMessage: 'Previous week',
  },
  day: {
    id: 'db-analytics.labels.timeframe.day',
    description: 'Label for analytics timeframe',
    defaultMessage: 'Previous day',
  },

  custom: {
    id: 'db-analytics.labels.timeframe.custom',
    description: 'Label for custom analytics timeframe option',
    defaultMessage: 'Custom',
  },
};

export const DEFAULT_TIMEFRAMES: Array<Timeframe> = [
  'year',
  'sixmonth',
  'month',
  'week',
  'day',
];
export const DEFAULT_TIMEFRAME = 'month';

export const DEFAULT_GRANULARITIES: Array<Granularity> = [
  'monthly',
  'weekly',
  'daily',
  'hourly',
];
export const DEFAULT_GRANULARITY = 'daily';

const ALL_TIMEFRAMES = Object.keys(TIMEFRAME_LABELS) as Array<Timeframe>;
const ALL_TIMEFRAMES_WITHOUT_CUSTOM: Array<Timeframe> = ALL_TIMEFRAMES.filter(
  x => x !== 'custom',
);
export const TYPE_TIMEFRAMES: {[view: string]: Array<Timeframe>} = {
  [TYPE_SUBS]: [/*'sixmonth', */ 'month'] as Array<Timeframe>,
  [TYPE_LISTENS]: ALL_TIMEFRAMES,
  [TYPE_LISTENS_SPOTIFY]: ALL_TIMEFRAMES,
  [TYPE_BY_EPISODE]: ALL_TIMEFRAMES,
  [TYPE_BY_SOURCE]: ALL_TIMEFRAMES,
  [TYPE_GEO_LISTENS]: ALL_TIMEFRAMES,
  [TYPE_GEO_SUBS]: ['day'] as Array<Timeframe>,
  [TYPE_GEO_GRAN_SUBS]: ['day'] as Array<Timeframe>,
  [TYPE_TOP_EPISODES]: ALL_TIMEFRAMES_WITHOUT_CUSTOM,
};
export const TYPE_GRANULARITIES: {
  [view: string]: Array<Granularity>;
} = {
  [TYPE_LISTENS]: DEFAULT_GRANULARITIES,
  [TYPE_LISTENS_SPOTIFY]: DEFAULT_GRANULARITIES,
  [TYPE_SUBS]: ['daily'],
  [TYPE_BY_EPISODE]: DEFAULT_GRANULARITIES,
  [TYPE_BY_SOURCE]: DEFAULT_GRANULARITIES,
  [TYPE_GROWTH]: ['monthly', 'weekly', 'daily'],
};

export const MENU_LABELS: {[view: string]: Message} = defineMessages({
  [TYPE_GEO_GRAN_LISTENS]: {
    id: 'db-analaytics.labels.menu.geogran.listens',
    description: 'Menu label for the breakdown of listens by city',
    defaultMessage: 'Listener country',
  },
  [TYPE_GEO_GRAN_SUBS]: {
    id: 'db-analaytics.labels.menu.geogran.subscribers',
    description: 'Menu label for the breakdown of subscribers by city',
    defaultMessage: 'Subscriber country',
  },
});

export const LINE_CHART_DEFAULT_DISPLAY_OVERRIDE: {
  [view: string]: 'line' | 'area';
} = {
  [TYPE_BY_EPISODE]: 'area',
  [TYPE_BY_SOURCE]: 'area',
};
