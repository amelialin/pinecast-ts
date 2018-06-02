import * as numeral from 'numeral';
import * as React from 'react';

import Button from '@pinecast/common/Button';
import Collapser from '@pinecast/common/Collapser';
import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled from '@pinecast/styles';

import CSVLink from '../CSVLink';
import {BreakdownData} from '../types';
import {getTickValues} from './components/ticks';
import measureText from './components/measureText';
import SubToolbar from './components/SubToolbar';

const ITEM_HEIGHT = 28;
const MAX_ITEMS_IN_TOP = 8;
const X_AXIS_HEIGHT = 60;

const SVG = styled('svg', {
  display: 'block',
  margin: 'auto',
  width: '100%',
});
const Other = styled('div', {
  fontWeight: 500,
});
const OtherCount = styled('span', {
  fontWeight: 400,
});

export default class SharesChart extends React.Component {
  props: {
    data: BreakdownData;
  };
  state: {
    expanded: boolean;
    width: number;
  } = {expanded: false, width: 0};

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
    this.setState({width: this.svg.getClientRects()[0].width});
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
      this.setState({width: el.getClientRects()[0].width});
    }
  };

  handleToggle = () => {
    this.setState({expanded: !this.state.expanded});
  };

  renderNumber(value: number, percent: number) {
    return `${numeral(value).format('0,0')} (${numeral(percent).format(
      '0.0%',
    )})`;
  }

  render() {
    const {data} = this.props;
    const {width} = this.state;

    const yAxisLabelWidth = data.reduce(
      (acc, cur) =>
        cur.isOther
          ? acc
          : Math.max(
              acc,
              measureText(cur.label, `500 12px ${DEFAULT_FONT}, sans-serif`),
            ),
      0,
    );
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    const yAxisNumbersWidth = data.reduce(
      (acc, cur) =>
        cur.isOther
          ? acc
          : Math.max(
              acc,
              measureText(
                this.renderNumber(cur.value, cur.value / total),
                '12px ${DEFAULT_FONT}, sans-serif',
              ),
            ),
      0,
    );
    const marginLeft = yAxisLabelWidth + 8 + yAxisNumbersWidth + 8;

    const count = data.filter(x => !x.isOther).length;
    const totalHeight = X_AXIS_HEIGHT + count * ITEM_HEIGHT;

    const max = data.reduce(
      (acc, cur) => (cur.isOther ? acc : Math.max(acc, cur.value)),
      0,
    );
    const ticks = getTickValues(0, max);

    const topHeight = Math.min(
      totalHeight,
      X_AXIS_HEIGHT + MAX_ITEMS_IN_TOP * ITEM_HEIGHT,
    );

    const renderTick = (y: number, label: string, value: number) => {
      return (
        <g className="tick" key={y} transform={`translate(0, ${y})`}>
          <line stroke="#616669" strokeWidth={1.5} x2={-3} />
          <text
            dy="0.32em"
            fill="#616669"
            fontFamily={DEFAULT_FONT}
            fontWeight={500}
            x={-8 - yAxisNumbersWidth - 8}
          >
            {label}
          </text>
          <text
            dy="0.32em"
            fill="#616669"
            fontFamily={DEFAULT_FONT}
            fontWeight={400}
            x={-8}
          >
            {this.renderNumber(value, value / total)}
          </text>
        </g>
      );
    };

    return (
      <React.Fragment>
        {this.renderToolbar()}
        <SVG onRef={this.handleRef} style={{height: topHeight}}>
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
          <g
            className="yAxis"
            fill="none"
            fontSize={12}
            textAnchor="end"
            transform={`translate(${marginLeft}, 0)`}
          >
            <line
              stroke="#616669"
              strokeWidth={1.5}
              x1={0}
              x2={0}
              y1={X_AXIS_HEIGHT}
              y2={topHeight}
            />
            {data.map((item, i) =>
              renderTick(
                (i + 0.5) * ITEM_HEIGHT + X_AXIS_HEIGHT,
                item.label,
                item.value,
              ),
            )}
          </g>
          {Boolean(width) &&
            data
              .slice(0, MAX_ITEMS_IN_TOP)
              .map((item, i) => (
                <rect
                  fill="#5395D3"
                  height={ITEM_HEIGHT - 20}
                  key={i}
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
              ))}
        </SVG>
        {totalHeight > topHeight && (
          <React.Fragment>
            <Collapser open={this.state.expanded} shave={0}>
              <SVG style={{height: totalHeight - topHeight, marginBottom: 12}}>
                <g
                  className="yAxis"
                  fill="none"
                  fontSize={12}
                  textAnchor="end"
                  transform={`translate(${marginLeft}, 0)`}
                >
                  <line
                    stroke="#616669"
                    strokeWidth={1.5}
                    x1={0}
                    x2={0}
                    y1={0}
                    y2={totalHeight - topHeight}
                  />
                  {data
                    .slice(MAX_ITEMS_IN_TOP)
                    .map((item, i) =>
                      renderTick(
                        (i + 0.5) * ITEM_HEIGHT,
                        item.label,
                        item.value,
                      ),
                    )}
                </g>
                {Boolean(this.state.width) &&
                  data
                    .slice(MAX_ITEMS_IN_TOP)
                    .map((item, i) => (
                      <rect
                        fill="#5395D3"
                        height={ITEM_HEIGHT - 20}
                        key={i}
                        rx={3}
                        ry={3}
                        width={item.value / max * (width - marginLeft)}
                        x={marginLeft}
                        y={(i + 0.5) * ITEM_HEIGHT - (ITEM_HEIGHT - 20) / 2}
                      />
                    ))}
              </SVG>
              <div>
                {data.filter(x => x.isOther).map((d, i) => (
                  <Other key={i}>
                    {d.label} <OtherCount>{d.value}</OtherCount>
                  </Other>
                ))}
              </div>
            </Collapser>
            <Button
              onClick={this.handleToggle}
              size="small"
              style={{alignSelf: 'flex-start', marginTop: 12}}
            >
              {this.state.expanded
                ? 'Collapse'
                : `Show more (${data.length - MAX_ITEMS_IN_TOP})`}
            </Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
