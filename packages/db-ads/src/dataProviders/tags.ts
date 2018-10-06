import {dataProvider, DataProviderState} from '@pinecast/xhr';

import * as models from '../models';

export type ListTagsState = DataProviderState<Array<models.Tag>>;
export const listTags = <
  InboundProps extends Object,
  PropName extends keyof InboundProps
>(
  prop: PropName,
) =>
  dataProvider<InboundProps, PropName, Array<models.Tag>>(
    prop,
    () => ({
      method: 'GET',
      url: '/advertisements/tags/',
    }),
    (resp: string) => JSON.parse(resp),
  );
