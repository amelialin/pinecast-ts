const moment = require('moment');
import * as React from 'react';

import styled from '@pinecast/styles';
import TooltipContainer from '@pinecast/common/TooltipContainer';
import {url} from '@pinecast/common/helpers';

import {Episode, TimeSeriesData} from '../../types';

const EP_HEIGHT = 10;
const EP_WIDTH = 10;
const EP_BUFFER = 4;

const DEFAULT_HEIGHT = 20 + EP_HEIGHT;

const Nodule = styled('a', {
  borderRadius: Math.max(EP_WIDTH, EP_HEIGHT),
  borderBottomLeftRadius: 0,
  boxShadow: '0 0 0 0.5px #7f8486 inset, 0 0 0 1.5px #fff inset',
  display: 'block',
  height: EP_HEIGHT,
  width: EP_WIDTH,
});

function getHeights(episodes: Array<Episode>, width: number): Array<number> {
  const reversed = episodes.slice().sort((a, b) => b.position - a.position);
  const output: Array<number> = [];

  reversed.forEach((ep, i) => {
    if (!output.length) {
      output.push(DEFAULT_HEIGHT);
      return;
    }
    const last = reversed[i - 1];
    if (last.position * width - EP_WIDTH - EP_BUFFER < ep.position * width) {
      const lastHeight = output[output.length - 1];
      output.push(lastHeight + EP_HEIGHT + EP_BUFFER);
      return;
    }
    output.push(DEFAULT_HEIGHT);
  });

  return output.reverse();
}

class EpisodeItem extends React.PureComponent {
  props: {
    baseline: number;
    color: string;
    ep: Episode;
    height: number;
    xOffset: number;
  };

  render() {
    const {baseline, color, ep, height, xOffset} = this.props;
    return (
      <React.Fragment>
        <line
          x1={xOffset + 0.5}
          x2={xOffset + 0.5}
          y1={baseline}
          y2={baseline - height}
        />
        <foreignObject x={xOffset} y={baseline - height - EP_HEIGHT}>
          <TooltipContainer
            preferY="top"
            tooltipContent={
              <React.Fragment>
                <b>{ep.title}</b>
                <span>
                  Published {moment(ep.publish).format('MMM D, YYYY')}
                </span>
              </React.Fragment>
            }
          >
            <Nodule
              href={url`/dashboard/podcast/${ep.podcastSlug}/episode/${ep.id}`}
              style={{backgroundColor: color || '#fff'}}
              target="_blank"
            />
          </TooltipContainer>
        </foreignObject>
      </React.Fragment>
    );
  }
}

export default class EpisodeOverlay extends React.PureComponent {
  props: {
    baseline: number;
    data: TimeSeriesData;
    episodes: Array<Episode>;
    xOffset: number;
    width: number;
  };

  render() {
    const {baseline, data, episodes, xOffset, width} = this.props;
    const colors: {[slug: string]: string} = {};
    data.datasets.forEach(ds => {
      if (ds.slug && ds.pointColor) {
        colors[ds.slug] = ds.pointColor;
      } else if (ds.id && ds.pointColor) {
        colors[ds.id] = ds.pointColor;
      }
    });

    const heights = getHeights(episodes, width);
    return (
      <g
        stroke="#939899"
        strokeWidth={1}
        style={{transform: `translateX(${xOffset}px)`}}
      >
        {episodes.map((ep, i) => (
          <EpisodeItem
            baseline={baseline}
            color={colors[ep.podcastSlug] || colors[ep.id]}
            ep={ep}
            height={heights[i]}
            key={ep.id}
            xOffset={Math.floor(width * ep.position)}
          />
        ))}
      </g>
    );
  }
}
