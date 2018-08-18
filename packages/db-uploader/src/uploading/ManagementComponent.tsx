import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {gettext, ngettext} from '@pinecast/i18n';
import Progress from '@pinecast/common/Progress';
import styled from '@pinecast/styles';

import TimeRemainingIndicator from '../legacy/TimeRemainingIndicator';
import UploadIcon from '../icons/upload';
import {UploadManagerEntry} from './manager';
import UploadOrder from './order';

const Column = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});
const Order = styled('div', {
  padding: '0 10px',
});
const OrderTitle = styled('strong', {
  display: 'block',
  fontSize: 13,
  lineHeight: '1.5em',
});
const Options = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '0.5em 10px',
});

export default class ManagementComponent extends React.PureComponent {
  props: {
    onCancel: () => void;
    onComplete: () => void;
    orders: Array<UploadOrder>;
  };
  state: {
    files: Array<UploadManagerEntry>;
    startTime: number;
    totalPercent: number;
  };
  aborted: boolean = false;

  constructor(props: ManagementComponent['props']) {
    super(props);
    this.state = {
      files: props.orders.map(order => order.getManager(this).getEntry()),
      startTime: Date.now(),
      totalPercent: 0,
    };
  }

  refresh() {
    const {
      aborted,
      state: {files},
    } = this;
    if (aborted) {
      return;
    }

    const newFiles = files.map(f => f.inst.getEntry());
    this.setState({
      files: newFiles,
      totalPercent:
        files.reduce((acc, cur) => acc + cur.completed, 0) /
        files.reduce((acc, cur) => acc + cur.inst.getSize(), 0) *
        100,
    });

    if (newFiles.every(x => x.progress === 100 && !x.error)) {
      this.props.onComplete();
    }
  }

  abort = () => {
    this.aborted = true;
    this.props.orders.forEach(f => f.abort());
    this.props.onCancel();
  };

  render() {
    const {
      props: {orders},
      state: {files, startTime, totalPercent},
    } = this;
    return (
      <Card whiteBack>
        <Column>
          <UploadIcon height={46} width={46} />
          <strong>
            {ngettext(
              'Your file is uploading',
              'Your files are uploading',
              orders.length,
            )}
          </strong>
        </Column>
        {files.map((manager, i) => (
          <Order key={i}>
            <OrderTitle>{orders[i].title}</OrderTitle>
            <Progress percent={manager.progress} />
          </Order>
        ))}
        <Options>
          <Button onClick={this.abort} style={{marginRight: 15}}>
            {gettext('Cancel')}
          </Button>
          <TimeRemainingIndicator
            progress={totalPercent}
            renderer={body => <span>{body}</span>}
            startTime={startTime}
          />
        </Options>
      </Card>
    );
  }
}
