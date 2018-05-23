import * as numeral from 'numeral';
import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled from '@pinecast/styles';

import CSVLink from '../CSVLink';
import {BreakdownData} from '../types';
import {getTickValues} from './components/ticks';
import measureText from './components/measureText';
import SubToolbar from './components/SubToolbar';

const X_AXIS_HEIGHT = 60;
const ITEM_HEIGHT = 28;

const SVG = styled('svg', {
  display: 'block',
  margin: 'auto',
  width: '100%',
});

export default class SharesChart extends React.Component {
  props: {
    data: BreakdownData;
  };
  state: {
    width: number;
  } = {width: 0};

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (!this.svg) {
      return;
    }
    this.setState({width: this.svg.clientWidth});
  };

  getCSVData = () => {
    const {data} = this.props;
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    return [
      ['Type', 'Count', 'Percentage'],
      ...data.map(d => [d.label, d.value, d.value / total]),
    ];
  };

  renderToolbar() {
    return (
      <SubToolbar>
        <CSVLink data={this.getCSVData} />
      </SubToolbar>
    );
  }

  svg: SVGElement | null = null;
  handleRef = (el: SVGElement | null) => {
    this.svg = el;
    if (el) {
      this.setState({width: el.clientWidth});
    }
  };

  render() {
    const {data} = this.props;
    const {width} = this.state;

    const marginLeft =
      20 + data.reduce((acc, cur) => Math.max(acc, measureText(cur.label)), 0);

    const height = X_AXIS_HEIGHT + data.length * ITEM_HEIGHT;

    const max = data.reduce((acc, cur) => Math.max(acc, cur.value), 0);
    const ticks = getTickValues(0, max);

    return (
      <React.Fragment>
        {this.renderToolbar()}
        <SVG onRef={this.handleRef} style={{height}}>
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
              y1={X_AXIS_HEIGHT}
              y2={height}
            />
            {data.map((item, i) => {
              return (
                <g
                  className="tick"
                  key={i}
                  transform={`translate(0, ${(i + 0.5) * ITEM_HEIGHT +
                    X_AXIS_HEIGHT})`}
                >
                  <line stroke="#616669" strokeWidth={1.5} x2={-3} />
                  <text
                    dy="0.32em"
                    fill="#616669"
                    fontFamily={DEFAULT_FONT}
                    fontWeight={500}
                    x={-8}
                  >
                    {item.label}
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
          >
            <line
              className="domain"
              stroke="#616669"
              strokeWidth={1.5}
              x1={marginLeft}
              x2="100%"
              y1={X_AXIS_HEIGHT}
              y2={X_AXIS_HEIGHT}
            />
            {ticks.map((tickValue, i) => {
              return (
                <text
                  dy="0.71em"
                  fill="#616669"
                  fontFamily={DEFAULT_FONT}
                  fontWeight={500}
                  key={i}
                  style={{
                    transformOrigin: `${i /
                      ticks.length *
                      (width - marginLeft) +
                      marginLeft}px ${X_AXIS_HEIGHT - 8}px`,
                    transform: `rotate(-60deg) translate(${i /
                      ticks.length *
                      (width - marginLeft) +
                      marginLeft}px, ${X_AXIS_HEIGHT - 8}px)`,
                  }}
                  textAnchor="start"
                >
                  {numeral(tickValue).format('0,0')}
                </text>
              );
            })}
          </g>
          {data.map((item, i) => (
            <g key={i}>
              <rect
                fill="red"
                height={ITEM_HEIGHT - 20}
                rx={3}
                ry={3}
                width={item.value / max * (width - marginLeft)}
                x={marginLeft}
                y={
                  X_AXIS_HEIGHT +
                  (i + 0.5) * ITEM_HEIGHT -
                  (ITEM_HEIGHT - 20) / 2
                }
              />
            </g>
          ))}
        </SVG>
      </React.Fragment>
    );
  }
}
