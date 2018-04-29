import * as PropTypes from 'prop-types';

export interface ItemSourceContext<T> {
  getItem: () => {value: T; done: boolean};
  hasNextItem: () => boolean;

  [Symbol.iterator]: () => {value: T; done: boolean};
}

export function getsItemSource<T>(
  toAnnotate: React.ComponentType<T> & {
    contextTypes?: PropTypes.ValidationMap<any>;
  },
): React.ComponentType<T> {
  toAnnotate.contextTypes = {
    ...toAnnotate.contextTypes,
    itemSource: PropTypes.object,
  };
  return toAnnotate;
}
