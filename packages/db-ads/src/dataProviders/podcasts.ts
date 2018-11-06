import {dataProvider, DataProviderState} from '@pinecast/xhr';
// import {Omit} from '@pinecast/common/types';
import {url} from '@pinecast/common/helpers';

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
  dataProvider<Array<models.Podcast>>(
    prop,
    () => ({
      method: 'GET',
      url: '/advertisements/podcasts/eligible/',
    }),
    (resp: string) => JSON.parse(resp),
  );

export interface EpisodePlanResult {
  unpaired: Array<models.BreakPlaceholder>;
  paired: Array<{
    break: models.BreakPlaceholder;
    ad: models.Advertisement;
  }>;
}
export type PlanResult = {
  [episodeId: string]: EpisodePlanResult;
};

export type GetPodcastPlanState = DataProviderState<PlanResult>;

interface PropsWithSlug extends Object {
  slug: string;
}

export const getPodcastPlan = <
  InboundProps extends PropsWithSlug,
  PropName extends keyof InboundProps
>(
  prop: PropName,
) =>
  dataProvider<PlanResult>(
    prop,
    ({slug}) => ({
      method: 'GET',
      url: url`/advertisements/podcasts/plan/${slug}`,
    }),
    (resp: string) => JSON.parse(resp),
  );
