import * as PropTypes from 'prop-types';
import * as React from 'react';

export class MountProvider extends React.Component<{
  children?: any;
  mounts: {
    [key: string]: JSX.Element | null | Array<JSX.Element | null | string>;
  };
}> {
  static childContextTypes = {
    mounts: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      mounts: this.props.mounts,
    };
  }

  render() {
    return this.props.children;
  }
}

export function getsMount<T>(
  toAnnotate: React.ComponentType<T> & {
    contextTypes?: PropTypes.ValidationMap<any>;
  },
): React.ComponentType<T> {
  toAnnotate.contextTypes = {
    ...toAnnotate.contextTypes,
    mounts: PropTypes.object.isRequired,
  };
  return toAnnotate;
}
