import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export default class Collapser extends React.Component {
  props: {
    children: any;
    open: boolean;
  };
  outerEl: HTMLElement | null = null;
  innerEl: HTMLElement | null = null;
  ro: ResizeObserver | null = null;

  componentWillUnmount() {
    if (this.ro) {
      this.ro.disconnect();
    }
  }

  handleOuterRef = (el: HTMLElement | null) => {
    this.outerEl = el;
  };

  getSize() {
    return this.props.open && this.innerEl ? this.innerEl.clientHeight - 8 : 0;
  }

  handleInnerRef = (el: HTMLElement | null) => {
    this.innerEl = el;
    if (el) {
      if (this.ro) {
        this.ro.disconnect();
      }
      this.ro = new ResizeObserver(() => {
        if (this.outerEl) {
          this.outerEl.style.height = `${this.getSize()}px`;
        }
      });
      this.ro.observe(el);
    }
  };

  render() {
    return (
      <div
        ref={this.handleOuterRef}
        style={{
          height:
            this.props.open && this.innerEl ? this.innerEl.clientHeight - 8 : 0,
          margin: '0 -4px',
          overflowY: 'hidden',
          padding: '0 4px',
          transition: 'height 0.2s',
        }}
      >
        <div ref={this.handleInnerRef}>
          <div style={{float: 'left', width: '100%'}}>
            {this.props.children}
          </div>
          <b style={{clear: 'both', display: 'block'}} />
        </div>
      </div>
    );
  }
}
