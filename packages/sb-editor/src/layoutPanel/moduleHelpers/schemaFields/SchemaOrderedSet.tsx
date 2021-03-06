import * as React from 'react';

import Button from '@pinecast/common/Button';
import ContextMenu from '@pinecast/common/ContextMenu';
import IconButton from '@pinecast/common/IconButton';
import DeleteIcon from '@pinecast/common/icons/Delete';
import Label from '@pinecast/common/Label';
import styled from '@pinecast/styles';
import {nullThrows} from '@pinecast/common/helpers';

import {OrderedSetProps} from './types';

const ELEMENT_HEIGHT = 32;
const BUFFER_SIZE = ELEMENT_HEIGHT / 2;

const labelStyle = {
  marginBottom: 16,
};

function getContainerHeight(count: number, isDragging: boolean): number {
  return (
    // Element heights
    Math.max(1, count) * ELEMENT_HEIGHT +
    // Drag buffer heights
    (isDragging ? ELEMENT_HEIGHT / 2 : 0) +
    // One pixel for the border between each item
    (Math.max(1, count) - 1) +
    // 8px padding at the top and bottom; border + padding
    8
  );
}

const ElementWrapper = styled(
  'div',
  ({$count, $dragging}: {$count: number; $dragging: boolean}) => ({
    background: '#eeefea',
    border: '1px solid #dee1df',
    borderRadius: 3,
    height: getContainerHeight($count, $dragging),
    marginBottom: 4,
    overflow: 'hidden',
    padding: 3, // +1 for border width
    position: 'relative',
    transition: 'height 0.2s',
  }),
);

const Element = styled(
  'div',
  ({
    $bufferAdjustment,
    $dragging,
    $isOnly,
    $offset,
  }: {
    $bufferAdjustment: -1 | 0 | 1;
    $dragging: boolean;
    $isOnly: boolean;
    $offset: number;
  }) => ({
    alignItems: 'center',
    background: '#fff',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025)',
    cursor: $isOnly ? 'auto' : 'ns-resize',
    display: 'flex',
    height: ELEMENT_HEIGHT,
    justifyContent: 'space-between',
    marginBottom: $bufferAdjustment === -1 ? -1 * BUFFER_SIZE : 0,
    marginTop: $bufferAdjustment === 1 ? -1 * BUFFER_SIZE : 0,
    padding: $isOnly ? '0 8px' : '0 32px 0 8px',
    position: 'relative',
    top: $offset,
    transition: 'margin-bottom 0.2s, margin-top 0.2s, padding-right 0.2s',
    userSelect: 'none',
    zIndex: $dragging ? 2 : 1,

    ':first-of-type': {
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
    },
    ':nth-of-type(n + 1)': {
      borderTop: !$dragging ? '1px solid #eeefea' : undefined,
      paddingTop: $dragging ? 1 : 0,
    },
    ':last-of-type': {
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
    },

    '::after': {
      borderBottom: '1px solid #c6caca',
      borderTop: '1px solid #c6caca',
      bottom: 0,
      content: '""',
      height: 6,
      margin: 'auto 0',
      opacity: $isOnly ? 0 : 1,
      pointerEvents: 'none',
      position: 'absolute',
      right: 8,
      top: 0,
      transition: 'opacity 0.2s',
      width: 20,
    },
  }),
);

const Placeholder = styled(
  'div',
  {
    alignItems: 'center',
    background: '#fff',
    borderRadius: 2,
    color: '#c6caca',
    display: 'flex',
    height: ELEMENT_HEIGHT,
    justifyContent: 'center',
    textAlign: 'center',
    userSelect: 'none',
  },
  {children: 'None selected'},
);

const Buffer = styled('aside', ({$open}: {$open: boolean}) => ({
  height: $open ? BUFFER_SIZE : 0,
  transition: 'height 0.2s',
}));

export default class SchemaOrderedSet extends React.PureComponent {
  props: OrderedSetProps;
  state: {
    currentY: number;
    dragging: number | null;
    menuOpen: boolean;
    overBuffer: number | null;
  } = {
    currentY: 0,
    dragging: null,
    menuOpen: false,
    overBuffer: null,
  };

  startY: number = 0;

  componentDidMount() {
    document.body.addEventListener('mouseup', this.handleMouseUp);
  }
  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.handleMouseUp);
    if (this.state.dragging !== null) {
      document.body.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseMove = (e: MouseEvent) => {
    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    const {dragging} = this.state;
    if (dragging === null) {
      return;
    }
    let overBuffer: number | null = null;
    const tempOverBuffer = Math.min(
      this.props.value.length,
      Math.max(
        0,
        Math.round(
          (e.pageY - this.startY + dragging * ELEMENT_HEIGHT + BUFFER_SIZE) /
            ELEMENT_HEIGHT,
        ),
      ),
    );
    if (tempOverBuffer !== dragging && tempOverBuffer !== dragging + 1) {
      overBuffer = tempOverBuffer;
    }
    this.setState({currentY: e.pageY, overBuffer});
  };
  handleMouseUp = () => {
    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    document.body.removeEventListener('mousemove', this.handleMouseMove);

    const {field, onChange, value} = this.props;
    const {dragging, overBuffer} = this.state;
    if (overBuffer !== null) {
      if (dragging === null) {
        throw new Error('unreachable');
      }
      const newValue = value.slice(0);
      newValue.splice(dragging, 1);
      newValue.splice(
        overBuffer < dragging ? overBuffer : overBuffer - 1,
        0,
        value[dragging],
      );
      onChange(field, newValue);
    }

    this.setState({currentY: null, dragging: null, overBuffer: null});
  };

  mouseDown(startY: number, index: number) {
    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    if (this.props.value.length === 1) {
      return;
    }
    this.startY = startY;
    this.setState({currentY: startY, dragging: index});
    document.body.addEventListener('mousemove', this.handleMouseMove);
  }
  deleteItem(index: number) {
    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    const {field, onChange, value} = this.props;
    const newValue = value.slice(0);
    newValue.splice(index, 1);
    onChange(field, newValue);
  }

  getYOffset(): number {
    const {currentY, dragging} = this.state;
    if (dragging === null) {
      throw new Error('unreachable');
    }

    const rawOffset = currentY - this.startY;
    const elemPositionStart = dragging * ELEMENT_HEIGHT;
    if (dragging === 0) {
      if (rawOffset < 0) {
        return 0;
      }
    } else {
      if (elemPositionStart + rawOffset < BUFFER_SIZE * -1) {
        return -1 * elemPositionStart - BUFFER_SIZE;
      }
    }

    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    if (dragging === this.props.value.length - 1) {
      if (rawOffset > 0) {
        return 0;
      }
    } else {
      const containerHeight = getContainerHeight(
        this.props.value.length,
        this.state.dragging !== null,
      );
      if (elemPositionStart + rawOffset + ELEMENT_HEIGHT > containerHeight) {
        return containerHeight - elemPositionStart - ELEMENT_HEIGHT;
      }
    }

    return rawOffset;
  }

  renderElement = (element: string, index: number) => {
    const {dragging, overBuffer} = this.state;
    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    return (
      <React.Fragment key={element}>
        <Buffer $open={overBuffer === index} />
        <Element
          $bufferAdjustment={
            (dragging === index &&
              overBuffer !== null &&
              (overBuffer < dragging ? 1 : -1)) ||
            0
          }
          $dragging={dragging === index}
          $isOnly={this.props.value.length === 1}
          $offset={dragging === index ? this.getYOffset() : 0}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            this.mouseDown(e.pageY, index);
          }}
        >
          <span>
            {nullThrows(this.props.options.find(o => o.key === element)).label}
          </span>
          <IconButton
            Component={DeleteIcon}
            disabled={!this.props.open}
            onClick={() => {
              this.deleteItem(index);
            }}
            style={{marginRight: 8}}
          />
        </Element>
      </React.Fragment>
    );
  };

  handleCloseMenu = () => this.setState({menuOpen: false});
  handleOpenMenu = () => this.setState({menuOpen: true});
  handleMenuSelect = (selectedOption: string) => {
    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    this.props.onChange(
      this.props.field,
      this.props.value.concat([selectedOption]),
    );
  };

  renderFooter() {
    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    const {value} = this.props;
    const remaining = this.props.options.filter(x => !value.includes(x.key));
    if (!remaining.length) {
      return null;
    }
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <ContextMenu
          onClose={this.handleCloseMenu}
          onSelect={this.handleMenuSelect}
          open={this.state.menuOpen}
          options={remaining.map(o => ({
            slug: o.key,
            name: o.label,
          }))}
        >
          <Button
            disabled={!this.props.open}
            size="small"
            onClick={this.handleOpenMenu}
          >
            Add an item
          </Button>
        </ContextMenu>
      </div>
    );
  }

  render() {
    if (this.props.type !== 'orderedSet') {
      throw new Error('unreachable');
    }
    const value = this.props.value;
    const {overBuffer} = this.state;
    return (
      <Label
        componentType="div"
        style={labelStyle}
        subText={this.props.description}
        text={this.props.name}
      >
        <ElementWrapper $count={value.length} $dragging={overBuffer !== null}>
          {value.length ? (
            <React.Fragment>
              {value.map(this.renderElement)}
              <Buffer $open={overBuffer === value.length} />
            </React.Fragment>
          ) : (
            <Placeholder />
          )}
        </ElementWrapper>
        {this.renderFooter()}
      </Label>
    );
  }
}
