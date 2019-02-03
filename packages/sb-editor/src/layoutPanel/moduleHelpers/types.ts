import {primitives} from '@pinecast/sb-components';

export type MetadataType = {
  name: string;
  description: string;
  type:
    | 'header'
    | 'footer'
    | 'links'
    | 'pagination'
    | 'subscribeLinks'
    | 'generic'
    | 'unknown';
  func: (params: Object) => primitives.ComponentLayout;

  obsolete?: true;

  schema?: {[fieldName: string]: primitives.ComponentLayoutOption};
};
