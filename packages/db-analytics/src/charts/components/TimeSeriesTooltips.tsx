import * as numeral from 'numeral';
import * as React from 'react';

import Layer from '@pinecast/common/Layer';
import styled from '@pinecast/styles';

import {TimeSeriesData} from '../../types';

const Tooltip = styled('div', {
  background: 'rgba(255, 255, 255, 0.85)',
  borderRadius: 3,
  boxShadow: '0 2px 1px rgba(0, 0, 0, 0.1)',
  maxWidth: 250,
  padding: '5px 10px',
});
const TooltipGroup = styled('g', {
  ':hover .TooltipMarker': {
    stroke: 'rgba(0, 0, 0, 0.5)',
  },
});
const TooltipMarker = styled(
  'line',
  {pointerEvents: 'none'},
  {className: 'TooltipMarker'},
);

const cache = new WeakMap<TimeSeriesData['labels'], Array<JSX.Element>>();

export default class TimeSeriesTooltips extends React.PureComponent {
  props: {
    data: TimeSeriesData;
    height: number;
    xRange: (n: number) => number;
  };
  state: {
    selected: number | null;
    x: number | null;
    y: number | null;
  } = {selected: null, x: null, y: null};

  tooltip: HTMLElement | null = null;

  handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (this.state.selected !== null) {
      this.setState({x: e.pageX, y: e.pageY});
    }
  };
  handleMouseEnter = (e: React.MouseEvent<SVGElement>) => {
    this.setState({
      selected: Number((e.target as SVGElement).getAttribute('data-idx')),
    });
  };
  handleMouseLeave = (e: React.MouseEvent<SVGElement>) => {
    const rawIdx = (e.target as SVGElement).getAttribute('data-idx');
    if (!rawIdx) {
      return;
    }
    const idx = Number(rawIdx);
    if (this.state.selected !== idx) {
      return;
    }
    this.setState({selected: null});
  };
  handleRef = (el: HTMLElement | null) => {
    this.tooltip = el;
  };

  getTooltipOffset(): number {
    const {x} = this.state;
    const out = (x || 0) + 16;
    if (
      this.tooltip &&
      out + this.tooltip.clientWidth > document.body.clientWidth
    ) {
      return (x || 0) - 16 - this.tooltip.clientWidth;
    }
    return out;
  }

  renderTooltip(idx: number) {
    const {
      data: {datasets, labels},
    } = this.props;

    const label = labels[idx];
    const total = datasets.reduce((acc, cur) => acc + (cur.data[idx] || 0), 0);

    return (
      <React.Fragment>
        <b>{label}</b>
        {datasets.length > 1 && ` ${numeral(total).format('0,0')}`}
        {datasets
          .filter(x => x.data[idx])
          .sort((a, b) => b.data[idx] - a.data[idx])
          .map((x, i) => (
            <React.Fragment key={i}>
              <br />
              {`${x.label}: ${numeral(x.data[idx]).format('0,0')}`}
            </React.Fragment>
          ))}
      </React.Fragment>
    );
  }

  renderBars() {
    const {
      data: {labels},
      height,
      xRange,
    } = this.props;

    const cached = cache.get(labels);
    if (cached) {
      return cached;
    }

    const segmentWidth = Math.ceil(innerWidth / labels.length);
    const out = labels.map((label, idx) => {
      const x = idx
        ? Math.floor((xRange(idx) + xRange(idx - 1)) / 2 + 1)
        : xRange(idx);
      const width =
        idx && idx < labels.length - 1 ? segmentWidth : segmentWidth / 2;
      return (
        <TooltipGroup key={idx}>
          <TooltipMarker
            x1={xRange(idx)}
            x2={xRange(idx)}
            y1={8}
            y2={8 + height}
          />
          <rect
            className="has-tooltip"
            data-idx={idx}
            fill="transparent"
            height={height}
            key={idx}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onMouseMove={this.handleMouseMove}
            width={width}
            x={x}
            y={8}
          />
        </TooltipGroup>
      );
    });
    cache.set(labels, out);
    return out;
  }

  render() {
    const {selected, y} = this.state;

    return (
      <React.Fragment>
        {this.renderBars()}
        {selected !== null && (
          <Layer pointerEvents={false} x={this.getTooltipOffset()} y={y || 0}>
            <Tooltip onRef={this.handleRef}>
              {this.renderTooltip(selected)}
            </Tooltip>
          </Layer>
        )}
      </React.Fragment>
    );
  }
}
