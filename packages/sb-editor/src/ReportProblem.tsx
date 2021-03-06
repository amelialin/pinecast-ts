import {connect} from 'react-redux';
import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Dialog from '@pinecast/common/Dialog';
import Label from '@pinecast/common/Label';
import ModalLayer from '@pinecast/common/ModalLayer';
import {ReducerType} from './reducer';
import TextArea from '@pinecast/common/TextArea';

declare var Rollbar: {info(msg: string, data: Object): void};

class ReportProblem extends React.PureComponent {
  props: {
    reducer: ReducerType;
  };
  state: {
    message: string;
    open: boolean;
  };

  constructor(props: ReportProblem['props']) {
    super(props);
    this.state = {message: '', open: false};
  }

  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };
  handleReport = () => {
    Rollbar.info('User reported problem with site builder', {
      message: this.state.message,
      redux: this.props.reducer,
    });
    this.handleClose();
  };

  renderActions() {
    return (
      <ButtonGroup>
        <Button onClick={this.handleClose}>Cancel</Button>
        <Button autoFocus $isPrimary onClick={this.handleReport}>
          Report
        </Button>
      </ButtonGroup>
    );
  }

  handleChange = (message: string) => {
    this.setState({message});
  };
  render() {
    const {message, open} = this.state;
    return (
      <React.Fragment>
        <ModalLayer canEscape open={open} onClose={this.handleClose}>
          <Dialog actions={this.renderActions()} title="Report a problem">
            <Label text="Please briefly describe the problem.">
              <TextArea onChange={this.handleChange} value={message} />
            </Label>
          </Dialog>
        </ModalLayer>
        <Button onClick={this.handleOpen}>Report a problem</Button>
      </React.Fragment>
    );
  }
}

export default connect((reducer: ReducerType) => ({reducer}))(ReportProblem);
