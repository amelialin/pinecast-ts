import * as React from 'react';

import {TimeSeriesData} from '../../types';

const LineChartBody = ({
  activeSeries,
  data: {datasets, labels},
  hovering,
  xRange,
  yRange,
}: {
  activeSeries: Array<string | number>;
  data: TimeSeriesData;
  hovering: string | number | null;
  xRange: (n: number) => number;
  yRange: (n: number) => number;
}) => (
  <React.Fragment>
    {datasets.map(
      (ds, i) =>
        activeSeries.includes(i) && (
          <polyline
            className="chart-line"
            fill="none"
            key={i}
            points={labels
              .map(
                (_, i) =>
                  `${xRange(i)},${yRange(
                    ds.data[i - (labels.length - ds.data.length)] || 0,
                  )}`,
              )
              .join(' ')}
            stroke={ds.strokeColor}
            strokeLinejoin="round"
            strokeWidth={hovering === i ? 3.5 : 2}
          />
        ),
    )}
  </React.Fragment>
);

export default LineChartBody;
