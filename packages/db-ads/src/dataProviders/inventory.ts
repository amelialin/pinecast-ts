import {dataProvider, DataProviderState} from '@pinecast/xhr';

import * as models from '../models';

export type ListAdsState = DataProviderState<Array<models.Advertisement>>;
export const listAds = <
  InboundProps extends Object,
  PropName extends keyof InboundProps
>(
  prop: PropName,
) =>
  dataProvider<InboundProps, PropName, Array<models.Advertisement>>(
    prop,
    () => ({
      method: 'GET',
      url: '/advertisements/inventory/',
    }),
    (resp: string) => JSON.parse(resp),
  );
