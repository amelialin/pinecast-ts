import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Collapser_ = styled('div', ({$height}: {$height: number}) => ({
  height: $height,
  margin: '0 -4px',
  overflowY: 'hidden',
  padding: '0 4px',
  transition: 'height 0.2s',
}));

export default class Collapser extends React.Component {
  props: {
    children: any;
    open: boolean;
  };
  el: HTMLElement | null = null;

  handleRef = (el: HTMLElement | null) => {
    this.el = el;
  };

  render() {
    return (
      <Collapser_
        $height={this.props.open && this.el ? this.el.clientHeight - 8 : 0}
      >
        <div ref={this.handleRef}>
          <div style={{float: 'left', width: '100%'}}>
            {this.props.children}
          </div>
          <b style={{clear: 'both', display: 'block'}} />
        </div>
      </Collapser_>
    );
  }
}
