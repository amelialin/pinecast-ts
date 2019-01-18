import * as React from 'react';

import UploadProgress from '@pinecast/common/uploadHelpers/UploadProgress';

import {UploadManagerEntry} from './manager';
import UploadOrder from './order';

export default class ManagementComponent extends React.PureComponent {
  props: {
    onCancel: () => void;
    onComplete: () => void;
    orders: Array<UploadOrder>;
  };
  state: {
    files: Array<UploadManagerEntry>;
  };
  aborted: boolean = false;

  constructor(props: ManagementComponent['props']) {
    super(props);
    this.state = {
      files: props.orders.map(order => order.getManager(this).getEntry()),
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
    this.setState({files: newFiles});

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
      state: {files},
    } = this;
    return (
      <UploadProgress
        onAbort={this.abort}
        uploads={files.map((manager, i) => ({
          name: orders[i].title,
          percent: manager.progress,
          error: manager.error,
        }))}
      />
    );
  }
}
