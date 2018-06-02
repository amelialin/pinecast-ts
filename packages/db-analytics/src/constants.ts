import {gettext} from '@pinecast/i18n';

export const TYPE_LISTENS = 'listen';
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
export const TYPE_TOP_CITIES = 'top_cities';
export const TYPE_GROWTH = 'network_growth';

export type AnalyticsType = 'episode' | 'network' | 'podcast';
export type AnalyticsView =
  | typeof TYPE_LISTENS
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
  | typeof TYPE_TOP_CITIES
  | typeof TYPE_GROWTH;

export const TYPES: {[type: string]: Array<AnalyticsView>} = {
  episode: [
    TYPE_LISTENS,
    TYPE_BY_SOURCE,
    TYPE_BY_AGENT,
    TYPE_GROWTH,
    TYPE_GEO_LISTENS,
    TYPE_GEO_GRAN_LISTENS,
    TYPE_TOP_CITIES,
  ],
  network: [
    TYPE_LISTENS,
    TYPE_SUBS,
    TYPE_GROWTH,
    TYPE_BY_SOURCE,
    TYPE_BY_AGENT,
    TYPE_GEO_LISTENS,
    TYPE_GEO_GRAN_LISTENS,
    TYPE_GEO_SUBS,
    TYPE_GEO_GRAN_SUBS,
    TYPE_TOP_CITIES,
  ],
  podcast: [
    TYPE_LISTENS,
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
    TYPE_TOP_CITIES,
  ],
};

export const TYPES_NAMES: {[type: string]: string} = {
  [TYPE_LISTENS]: gettext('Total listens'),
  [TYPE_SUBS]: gettext('Subscribers'),
  [TYPE_GROWTH]: gettext('Listen growth'),
  [TYPE_BY_EPISODE]: gettext('Listens by episode (truncated)'),
  [TYPE_BY_SOURCE]: gettext('Listens by source'),
  [TYPE_BY_AGENT]: gettext('Listens by agent'),
  [TYPE_BY_OS]: gettext('Listens by OS'),
  [TYPE_GEO_SUBS]: gettext('Subscriber locations'),
  [TYPE_GEO_GRAN_SUBS]: gettext('Subscriber locations by city'),
  [TYPE_GEO_LISTENS]: gettext('Listener Locations'),
  [TYPE_GEO_GRAN_LISTENS]: gettext('Listener locations by city'),
  [TYPE_TOP_EPISODES]: gettext('Top episodes'),
  [TYPE_TOP_CITIES]: gettext('Top cities (by listen)'),
};

export const TYPES_ENDPOINTS: {[type: string]: {[view: string]: string}} = {
  episode: {
    [TYPE_LISTENS]: 'episode/listens',
    [TYPE_BY_SOURCE]: 'episode/listens/breakdown',
    [TYPE_BY_AGENT]: 'episode/listens/agent',
    [TYPE_GROWTH]: 'episode/growth',
    [TYPE_GEO_LISTENS]: 'episode/listens/location',
    [TYPE_GEO_GRAN_LISTENS]: 'episode/listens/location/options',
    [TYPE_TOP_CITIES]: 'episode/listens/location/options',
  },
  network: {
    [TYPE_LISTENS]: 'network/listens',
    [TYPE_BY_SOURCE]: 'network/listens/breakdown',
    [TYPE_BY_AGENT]: 'network/listens/agent',
    [TYPE_GROWTH]: 'network/growth',
    [TYPE_GEO_LISTENS]: 'network/listens/location',
    [TYPE_GEO_GRAN_LISTENS]: 'network/listens/location/options',
    [TYPE_SUBS]: 'network/subscribers',
    [TYPE_GEO_SUBS]: 'network/subscribers/location',
    [TYPE_GEO_GRAN_SUBS]: 'network/subscribers/location/options',
    [TYPE_TOP_CITIES]: 'network/listens/location/options',
  },
  podcast: {
    [TYPE_LISTENS]: 'podcast/listens',
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
    [TYPE_TOP_CITIES]: 'podcast/listens/location/options',
  },
};
export const TYPES_ENDPOINTS_MENU: {
  [type: string]: {[view: string]: (choice: string) => string};
} = {
  episode: {
    [TYPE_GEO_GRAN_LISTENS]: (choice: string) =>
      `episode/listens/location/${encodeURIComponent(choice)}`,
    [TYPE_TOP_CITIES]: (choice: string) =>
      `episode/listens/location/${encodeURIComponent(choice)}/top`,
  },
  network: {
    [TYPE_GEO_GRAN_LISTENS]: (choice: string) =>
      `network/listens/location/${encodeURIComponent(choice)}`,
    [TYPE_GEO_GRAN_SUBS]: (choice: string) =>
      `network/subscribers/location/${encodeURIComponent(choice)}`,
    [TYPE_TOP_CITIES]: (choice: string) =>
      `network/listens/location/${encodeURIComponent(choice)}/top`,
  },
  podcast: {
    [TYPE_GEO_GRAN_LISTENS]: (choice: string) =>
      `podcast/listens/location/${encodeURIComponent(choice)}`,
    [TYPE_GEO_GRAN_SUBS]: (choice: string) =>
      `podcast/subscribers/location/${encodeURIComponent(choice)}`,
    [TYPE_TOP_CITIES]: (choice: string) =>
      `podcast/listens/location/${encodeURIComponent(choice)}/top`,
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
  [TYPE_TOP_CITIES]: 'menu',
  [TYPE_GROWTH]: 'growth',
};
export const TYPES_CHART_MENU_TYPES: {[view: string]: ChartType} = {
  [TYPE_GEO_GRAN_SUBS]: 'geo_gran',
  [TYPE_GEO_GRAN_LISTENS]: 'geo_gran',
  [TYPE_TOP_CITIES]: 'table',
};

export const TYPES_CHART_REQUIRES: {
  [view: string]: null | 'starter' | 'pro';
} = {
  [TYPE_LISTENS]: null,
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
  [TYPE_TOP_CITIES]: 'pro',
  [TYPE_GROWTH]: 'pro',
};

export const TYPES_SHOW_TOTAL: {[view: string]: true} = {
  [TYPE_LISTENS]: true,
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

export const GRANULARITY_LABELS = {
  monthly: gettext('By month'),
  weekly: gettext('By week'),
  daily: gettext('By day'),
  hourly: gettext('By hour'),
};
export const TIMEFRAME_LABELS = {
  all: gettext('All time'),
  year: gettext('Previous year'),
  sixmonth: gettext('Previous 6 months'),
  month: gettext('Previous month'),
  week: gettext('Previous week'),
  day: gettext('Previous day'),

  custom: gettext('Custom'),
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
  [TYPE_SUBS]: ['year', 'sixmonth', 'month'] as Array<Timeframe>,
  [TYPE_LISTENS]: ALL_TIMEFRAMES,
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
  [TYPE_BY_EPISODE]: DEFAULT_GRANULARITIES,
  [TYPE_BY_SOURCE]: DEFAULT_GRANULARITIES,
  [TYPE_GROWTH]: ['monthly', 'weekly', 'daily'],
};

export const MENU_LABELS: {[view: string]: string} = {
  [TYPE_GEO_GRAN_LISTENS]: gettext('Listener country'),
  [TYPE_GEO_GRAN_SUBS]: gettext('Subscriber country'),
  [TYPE_TOP_CITIES]: gettext('Cities in country'),
};

export const LINE_CHART_DEFAULT_DISPLAY_OVERRIDE: {
  [view: string]: 'line' | 'area';
} = {
  [TYPE_BY_EPISODE]: 'area',
  [TYPE_BY_SOURCE]: 'area',
};
