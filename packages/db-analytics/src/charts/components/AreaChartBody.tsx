import * as React from 'react';

import {TimeSeriesData} from '../../types';

const AreaChartBody = ({
  activeSeries,
  data: {datasets, labels},
  height,
  hovering,
  width,
  xRange,
  yRange,
}: {
  activeSeries: Array<string | number>;
  data: TimeSeriesData;
  height: number;
  hovering: string | number | null;
  width: number;
  xRange: (n: number) => number;
  yRange: (n: number) => number;
}) => {
  const totals = labels.map(() => 0);

  const taggedDatasets = datasets.map((d, i) => [d, i] as [typeof d, number]);
  const filteredDatasets = taggedDatasets.filter(x =>
    activeSeries.includes(x[1]),
  );

  const points = filteredDatasets.map(([dataset]) =>
    labels.map((_, i) => {
      const start = totals[i];
      const value =
        dataset.data[i - (labels.length - dataset.data.length)] || 0;
      totals[i] += value;
      return `${Math.round(xRange(i))},${Math.round(yRange(value + start))}`;
    }),
  );
  function getPathRemainder(idx: number): string {
    if (!idx) {
      return `${xRange(labels.length - 1)},${yRange(0)} ${xRange(0)},${yRange(
        0,
      )}`;
    }
    return points[idx - 1].reverse().join(' ');
  }

  return (
    <React.Fragment>
      {filteredDatasets.map(([ds, idx], i) => {
        const active = hovering === idx;
        const renderedPoints = points[i].join(' ');
        return (
          <React.Fragment key={idx}>
            <polyline
              className="chart-line-fill"
              fill={active ? ds.strokeColor : ds.pointColor}
              fillOpacity={active ? 0.8 : 0.4}
              points={renderedPoints + ' ' + getPathRemainder(i)}
            />
            <polyline
              className="chart-line-stroke"
              fill="transparent"
              points={renderedPoints}
              stroke={ds.strokeColor}
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default AreaChartBody;
