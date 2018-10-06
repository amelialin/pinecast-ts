import {dataProvider, DataProviderState} from '@pinecast/xhr';

import * as models from '../models';

export type ListEligiblePodcastsState = DataProviderState<
  Array<models.Podcast>
>;
export const listEligiblePodcasts = <
  InboundProps extends Object,
  PropName extends keyof InboundProps
>(
  prop: PropName,
) =>
  dataProvider<InboundProps, PropName, Array<models.Podcast>>(
    prop,
    () => ({
      method: 'GET',
      url: '/advertisements/podcasts/eligible/',
    }),
    (resp: string) => JSON.parse(resp),
  );
