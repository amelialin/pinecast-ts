import {defineMessages, Message} from '@pinecast/i18n';

import {
  TYPE_LISTENS,
  TYPE_LISTENS_SPOTIFY,
  TYPE_SUBS,
  TYPE_BY_EPISODE,
  TYPE_BY_SOURCE,
  TYPE_BY_AGENT,
  TYPE_BY_OS,
  TYPE_GEO_SUBS,
  TYPE_GEO_LISTENS,
  TYPE_GEO_GRAN_SUBS,
  TYPE_GEO_GRAN_LISTENS,
  TYPE_TOP_EPISODES,
  TYPE_GROWTH,
} from './constants';

const messages = defineMessages({
  spotifyUnavailable: {
    id: 'db-analytics.notes.spotifyUnavailable',
    description:
      'Message shown when an analytics view have no corresponding data from Spotify.',
    defaultMessage:
      'Spotify has not made data available that would contribute to this view.',
  },
  spotifySeparate: {
    id: 'db-analytics.notes.spotifySeparate',
    description:
      'Message shown when an analytics view has Spotify data broken out separately.',
    defaultMessage: 'Data from Spotify is excluded from this view.',
  },
  noSpotify: {
    id: 'db-analytics.notes.noSpotify',
    description:
      'Message shown when an analytics view does not incorporate data from Spotify.',
    defaultMessage: 'This view does not include data from Spotify.',
  },
  noSpotifyYet: {
    id: 'db-analytics.notes.noSpotifyYet',
    description:
      'Message shown when an analytics view does not incorporate data from Spotify yet.',
    defaultMessage:
      'This view does not include data from Spotify yet, but it will soon.',
  },
  noTZ: {
    id: 'db-analytics.notes.notTZAligned',
    description:
      'Message shown when an analytics view does not account for timezone.',
    defaultMessage: 'This view is not time zone-adjusted.',
  },
});

export default {
  [TYPE_LISTENS]: [messages.spotifySeparate],
  [TYPE_LISTENS_SPOTIFY]: [messages.noTZ],
  [TYPE_SUBS]: [messages.spotifyUnavailable, messages.noTZ],
  [TYPE_BY_EPISODE]: [messages.noSpotify],
  [TYPE_BY_SOURCE]: [],
  [TYPE_BY_AGENT]: [],
  [TYPE_BY_OS]: [messages.noSpotify],
  [TYPE_GEO_SUBS]: [messages.spotifyUnavailable, messages.noTZ],
  [TYPE_GEO_LISTENS]: [],
  [TYPE_GEO_GRAN_SUBS]: [messages.spotifyUnavailable, messages.noTZ],
  [TYPE_GEO_GRAN_LISTENS]: [messages.spotifyUnavailable],
  [TYPE_TOP_EPISODES]: [],
  [TYPE_GROWTH]: [messages.noTZ],
} as {[view: string]: Array<Message>};
