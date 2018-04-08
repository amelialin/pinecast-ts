import * as React from 'react';

export default class FormView extends React.PureComponent {
  props: {elements: HTMLCollection};

  ref: HTMLDivElement | null = null;

  handleRef = (el: HTMLDivElement | null) => {
    this.ref = el;
    if (el) {
      for (const child of Array.from(this.props.elements)) {
        el.appendChild(child);
      }
    }
  };

  render() {
    return <div ref={this.handleRef} />;
  }
}
