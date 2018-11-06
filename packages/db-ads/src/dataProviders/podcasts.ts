import {dataProvider, DataProviderState} from '@pinecast/xhr';
// import {url} from '@pinecast/common/helpers';

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

// export type GetPodcastPlanState = DataProviderState<PlanResult>;

// export const getPodcastPlan = <
//   InboundProps extends {slug: string},
//   PropName extends string
// >(
//   prop: PropName,
// ) =>
//   dataProvider<InboundProps, PropName, PlanResult>(
//     prop,
//     ({slug}) => ({
//       method: 'GET',
//       url: url`/advertisements/podcasts/plan/${slug}`,
//     }),
//     (resp: string) => JSON.parse(resp),
//   );
