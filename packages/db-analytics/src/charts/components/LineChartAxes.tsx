import * as numeral from 'numeral';
import * as React from 'react';

import {Children} from '@pinecast/common/types';
import {DEFAULT_FONT} from '@pinecast/common/constants';
import {nullThrows} from '@pinecast/common/helpers';
import styled from '@pinecast/styles';

import measureText from './measureText';

const HEIGHT = 300;
const X_AXIS_HEIGHT = 60;

const gridlineStyle = {stroke: '#eeefea', strokeWidth: 1};

const SVG = styled('svg', {
  display: 'block',
  height: HEIGHT,
  margin: 'auto',
  width: '100%',
});

function scaleLinearLight(
  rangeMin: number,
  rangeMax: number,
  domainMin: number,
  domainMax: number,
) {
  return (domainValue: number) => {
    const domainPercent = (domainValue - domainMin) / (domainMax - domainMin);
    return Math.ceil((rangeMax - rangeMin) * domainPercent + rangeMin);
  };
}

const E10 = Math.sqrt(50);
const E5 = Math.sqrt(10);
const E2 = Math.sqrt(2);

function getTickIncrement(min: number, max: number): number {
  if (min === max) {
    return 0;
  }
  const step = (max - min) / 5;
  const power = Math.floor(Math.log(step) / Math.LN10);
  const error = step / Math.pow(10, power);
  return power >= 0
    ? (error >= E10 ? 10 : error >= E5 ? 5 : error >= E2 ? 2 : 1) *
        Math.pow(10, power)
    : -Math.pow(10, -power) /
        (error >= E10 ? 10 : error >= E5 ? 5 : error >= E2 ? 2 : 1);
}
function getTickValues(min: number, max: number): Array<number> {
  const step = getTickIncrement(min, max);
  if (step > 0) {
    const start = Math.ceil(min / step);
    const stop = Math.floor(max / step);
    return [...new Array(Math.ceil(stop - start + 1))].map(
      (_, i) => (start + i) * step,
    );
  } else {
    const start = Math.floor(min * step);
    const stop = Math.ceil(max * step);
    return [...new Array(Math.ceil(start - stop + 1))].map(
      (_, i) => (start - i) * step,
    );
  }
}

function renderYAxisLabel(tickValue: number): string {
  return Math.ceil(tickValue) === Math.floor(tickValue)
    ? numeral(tickValue).format('0,0')
    : '';
}

export default class LineChartAxes extends React.Component {
  props: {
    children: (
      p: {
        height: number;
        marginLeft: number;
        width: number;
        xRange: (n: number) => number;
        yRange: (n: number) => number;
      },
    ) => Children;
    labels: Array<string>;
    range: [number, number];
  };
  el: SVGElement | null = null;
  state: {width: number | null} = {width: null};

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (this.el) {
      this.setState({width: this.el.clientWidth});
    }
  };

  handleRef = (el: SVGElement | null) => {
    this.el = el;
    if (el) {
      this.setState({width: el.clientWidth});
    }
  };

  renderInner() {
    const {labels, range: [yMin, yMax]} = this.props;

    const yTicks = getTickValues(yMin, yMax);
    const xTicks = getTickValues(0, labels.length - 1);

    const marginLeft =
      Math.max(
        0,
        ...yTicks.map(value =>
          measureText(renderYAxisLabel(value), `500 12px ${DEFAULT_FONT}`),
        ),
      ) +
      16 +
      8;
    const marginRight = 8;
    const marginTop = 8;

    const yRangeBottom = marginTop;
    const yRangeTop = HEIGHT - X_AXIS_HEIGHT;

    const width = nullThrows(this.state.width) - marginRight;

    const xRange = scaleLinearLight(marginLeft, width, 0, labels.length - 1);
    const yRange = scaleLinearLight(yRangeTop, yRangeBottom, yMin, yMax);

    return (
      <React.Fragment>
        <g className="grid">
          <g className="gridlines-x">
            <line
              style={gridlineStyle}
              x1={marginLeft}
              x2={width}
              y1={marginTop}
              y2={marginTop}
            />
            {yTicks.map(tickVal => {
              const y = yRange(tickVal);
              return (
                <line
                  key={y}
                  style={gridlineStyle}
                  x1={marginLeft}
                  x2={width}
                  y1={y}
                  y2={y}
                />
              );
            })}
          </g>
          <g className="gridlines-y">
            <line
              style={gridlineStyle}
              x1={width}
              x2={width}
              y1={yRangeBottom}
              y2={yRangeTop}
            />
            {xTicks.map(tickVal => {
              const x = xRange(tickVal);
              return (
                <line
                  key={x}
                  style={gridlineStyle}
                  x1={x}
                  x2={x}
                  y1={yRangeBottom}
                  y2={yRangeTop}
                />
              );
            })}
          </g>
        </g>
        <g
          className="yAxis"
          fill="none"
          fontSize={12}
          textAnchor="end"
          transform={`translate(${marginLeft}, 0)`}
        >
          <line
            className="domain"
            stroke="#616669"
            strokeWidth={1.5}
            x1={0}
            x2={0}
            y1={yRangeTop}
            y2={yRangeBottom}
          />
          {yTicks.map((tickValue, i) => {
            return (
              <g
                className="tick"
                key={i}
                transform={`translate(0, ${yRange(tickValue)})`}
              >
                <line stroke="#616669" strokeWidth={1.5} x2={-3} />
                <text
                  dy="0.32em"
                  fill="#616669"
                  fontFamily={DEFAULT_FONT}
                  fontWeight={500}
                  x={-8}
                >
                  {renderYAxisLabel(tickValue)}
                </text>
              </g>
            );
          })}
        </g>
        <g
          className="xAxis"
          fill="none"
          fontSize={12}
          fontFamily="sans-serif"
          textAnchor="end"
          transform={`translate(0, ${yRangeTop})`}
        >
          <line
            className="domain"
            stroke="#616669"
            strokeWidth={1.5}
            x1={marginLeft}
            x2={width}
            y1={0}
            y2={0}
          />
          {xTicks.map((tickValue, i) => {
            return (
              <g
                className="tick"
                key={i}
                transform={`translate(${xRange(tickValue)}, 0)`}
              >
                <text
                  dy="0.71em"
                  fill="#616669"
                  fontFamily={DEFAULT_FONT}
                  fontWeight={500}
                  transform="translate(-2, 4) rotate(-60)"
                >
                  {labels[tickValue]}
                </text>
              </g>
            );
          })}
        </g>
        <g style={{transform: 'translateY(-1px)'}}>
          {this.props.children({
            height: HEIGHT - X_AXIS_HEIGHT - marginTop,
            marginLeft,
            width: width - marginLeft,
            xRange,
            yRange,
          })}
        </g>
      </React.Fragment>
    );
  }

  render() {
    return (
      <SVG onRef={this.handleRef}>
        {this.state.width !== null && this.renderInner()}
      </SVG>
    );
  }
}
