import * as React from 'react';
import * as PropTypes from 'prop-types';

import {ComponentContext} from '@pinecast/sb-components';
import {ItemSourceContext} from '@pinecast/sb-components';

// TODO: have a non-any value for item source type
export interface Props {
  children?: any;
  ctx: ComponentContext;
  itemSource: ItemSourceContext<any> | null;
}

export default class ContextProvider extends React.Component<Props, {}> {
  static childContextTypes = {
    ctx: PropTypes.object.isRequired,
    itemSource: PropTypes.object,
  };

  getChildContext() {
    return {
      ctx: this.props.ctx,
      itemSource: this.props.itemSource,
    };
  }

  render() {
    return this.props.children;
  }
}
