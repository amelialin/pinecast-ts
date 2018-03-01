import * as React from 'react';

import {primitives} from '@pinecast/sb-components';
import ModuleCard from './ModuleCard';

export default class ComponentLayoutGroup extends React.PureComponent {
  props: {
    layouts: Array<primitives.ComponentLayout>;
    onUpdated: (newLayout: Array<primitives.ComponentLayout>) => void;
  };

  handleMove = (oldIndex: number, newIndex: number) => {
    const out = [...this.props.layouts];
    const toMove = out[oldIndex];
    out[oldIndex] = out[newIndex];
    out[newIndex] = toMove;
    this.props.onUpdated(out);
  };
  handleRemove = (index: number) => {
    const out = [...this.props.layouts];
    out.splice(index, 1);
    this.props.onUpdated(out);
  };
  handleReplace = (index: number, newLayout: primitives.ComponentLayout) => {
    const out = [...this.props.layouts];
    out[index] = newLayout;
    this.props.onUpdated(out);
  };

  render() {
    const {layouts} = this.props;
    return layouts.map((layout, i) => (
      <ModuleCard
        canDelete
        key={i}
        index={i}
        isFirst={i === 0}
        isLast={i === layouts.length - 1}
        layout={layout}
        onMove={this.handleMove}
        onRemove={this.handleRemove}
        onUpdate={this.handleReplace}
      />
    ));
  }
}
