import {primitives} from '@pinecast/sb-components';

export type MetadataType = {
  name: string;
  type: 'header' | 'links' | 'pagination' | 'subscribeLinks' | 'unknown';
  func: (params: Object) => primitives.ComponentLayout;

  obsolete?: true;

  schema?: {[fieldName: string]: primitives.ComponentLayoutOption};
};
