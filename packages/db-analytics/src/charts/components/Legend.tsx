import * as numeral from 'numeral';
import * as React from 'react';

import {nullThrows} from '@pinecast/common/helpers';
import styled, {CSS} from '@pinecast/styles';

import * as constants from '../../constants';

const Wrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridAutoRows: 'auto',
});

export type Series = {
  color: string;
  key: string | number;
  label: string;
  total?: number;
};

const itemWrapperBase: CSS = {
  alignItems: 'center',
  border: 0,
  borderRadius: 3,
  color: '#44484d',
  display: 'inline-block',
  fontSize: 14,
  fontWeight: 500,
  height: 28,
  lineHeight: 28,
  overflow: 'hidden',
  padding: '0 8px',
  textAlign: 'left',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
const ItemWrapperDecoy = styled('span', itemWrapperBase);
const ItemWrapper = styled(
  'button',
  ({$enabled}: {$enabled: boolean}) => ({
    ...itemWrapperBase,
    boxShadow: 'rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
    cursor: 'pointer',
    opacity: $enabled ? 1 : 0.5,
    transition: 'box-shadow 0.1s, opacity 0.075s',
    ':hover': {
      backgroundColor: $enabled ? '#dee1df' : '#eeefea',
      textDecoration: 'none',
    },
    ':hover .Chip': {
      boxShadow: $enabled ? '0 0 0 1.5px rgba(255, 255, 255, 1) inset' : 'none',
    },
    ':focus': {
      boxShadow: 'rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
      outline: 'none',
    },
    ':active': {
      backgroundColor: $enabled ? '#c6caca' : undefined,
      opacity: !$enabled ? 0.75 : undefined,
    },
  }),
  {
    tabIndex: 1,
    type: 'button',
  },
);
const Chip = styled(
  'b',
  ({$color}: {$color: string}) => ({
    backgroundColor: $color,
    borderRadius: 4,
    boxShadow: '0 0 0 rgba(255, 255, 255, 0) inset',
    display: 'inline-block',
    height: 16,
    marginRight: 8,
    marginTop: -2,
    transition: 'box-shadow 0.15s',
    verticalAlign: 'middle',
    width: 16,
  }),
  {className: 'Chip'},
);
const ItemTotal = styled('span', {
  fontWeight: 400,
  marginLeft: 8,
});

const OverallTotal = styled('span', {
  alignItems: 'center',
  display: 'flex',
  fontWeight: 500,
  padding: '0 8px',
});

class LegendItem extends React.PureComponent {
  props: {
    active: boolean;
    alone: boolean;
    color: string;
    hovering: boolean;
    label: string;
    item: Series['key'];
    onActivate: (key: Series['key']) => void;
    onDeactivate: (key: Series['key']) => void;
    onHover: (key: Series['key']) => void;
    onUnhover: (key: Series['key']) => void;
    total?: number;
  };

  handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.active) {
      this.props.onDeactivate(this.props.item);
    } else {
      this.props.onActivate(this.props.item);
    }
  };
  handleMouseEnter = () => {
    if (this.props.hovering) {
      return;
    }
    this.props.onHover(this.props.item);
  };
  handleMouseLeave = () => {
    if (!this.props.hovering) {
      return;
    }
    this.props.onUnhover(this.props.item);
  };
  render() {
    const inner = (
      <React.Fragment>
        <Chip $color={this.props.active ? this.props.color : '#fff'} />
        {this.props.label}
        {this.props.total != null && (
          <ItemTotal>{numeral(this.props.total).format('0,0')}</ItemTotal>
        )}
      </React.Fragment>
    );
    if (this.props.alone) {
      return <ItemWrapperDecoy>{inner}</ItemWrapperDecoy>;
    }
    return (
      <ItemWrapper
        $enabled={this.props.active}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        title={`Total: ${this.props.total}`}
      >
        {inner}
      </ItemWrapper>
    );
  }
}

export default class Legend extends React.PureComponent {
  props: {
    activeSeries: Array<Series['key']>;
    hoveringSeries: Series['key'] | null;
    series: Array<Series>;
    showTotal: boolean;
    view: constants.AnalyticsView;

    onHover: (key: Series['key']) => void;
    onActivate: (key: Series['key']) => void;
    onDeactivate: (key: Series['key']) => void;
    onUnhover: (key: Series['key']) => void;
  };
  render() {
    const {
      activeSeries,
      hoveringSeries,
      onActivate,
      onDeactivate,
      onHover,
      onUnhover,
      series,
      showTotal,
      view,
    } = this.props;
    return (
      <Wrapper>
        {series.map(s => (
          <LegendItem
            active={activeSeries.includes(s.key)}
            alone={series.length === 1}
            color={s.color}
            hovering={hoveringSeries === s.key}
            item={s.key}
            key={s.key}
            label={s.label}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            onHover={onHover}
            onUnhover={onUnhover}
            total={showTotal ? s.total : undefined}
          />
        ))}
        {series.length > 1 &&
          constants.TYPES_SHOW_TOTAL[view] && (
            <OverallTotal>
              Total{' '}
              <ItemTotal>
                {numeral(
                  series.reduce((acc, cur) => acc + nullThrows(cur.total), 0),
                ).format('0,0')}
              </ItemTotal>
            </OverallTotal>
          )}
      </Wrapper>
    );
  }
}
