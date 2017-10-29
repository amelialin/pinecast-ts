import * as PropTypes from 'prop-types';

export interface ItemSourceContext<T> {
  getItem: () => {value: T; done: boolean};
  hasNextItem: () => boolean;

  [Symbol.iterator]: () => {value: T; done: boolean};
}

export function getsItemSource(toAnnotate: any) {
  toAnnotate.contextTypes = {
    ...toAnnotate.contextTypes,
    itemSource: PropTypes.object,
  };
  return toAnnotate;
}
