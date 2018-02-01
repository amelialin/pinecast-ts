import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {Action} from '../actions';
import Button, {ButtonGroup} from '../common/Button';
import Dialog from '../common/Dialog';
import {doSave} from '../actions/save';
import ErrorState from '../common/ErrorState';
import LoadingState from '../common/LoadingState';
import ModalLayer from '../common/ModalLayer';
import {ReducerType} from '../reducer';
import {ReducerType as SaveReducerType} from '../reducers/save';

class SaveOptions extends React.PureComponent {
  props: {
    doSave: () => Promise<void>;
    needsSave: boolean;
    save: SaveReducerType;
    style?: React.CSSProperties;
  };
  state: {
    open: boolean;
  };

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode !== 83) {
      // S
      return;
    }
    if (!e.metaKey) {
      return;
    }
    if (this.state.open) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    this.handleOpen();
  };
  handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (!this.props.needsSave) {
      return null;
    }
    return (e.returnValue =
      'You have unsaved changes. Are you sure you wish to leave?');
  };

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }
  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleOpen = async () => {
    this.setState({open: true});
    this.props.doSave();
  };
  handleClose = () => {
    this.setState({open: false});
  };

  renderTitle() {
    const {save: {saving, error}} = this.props;
    if (error) {
      return 'Problems while saving';
    }
    if (saving) {
      return 'Saving…';
    }
    return 'Saved';
  }
  renderActions() {
    const {save: {saving, error}} = this.props;
    if (error) {
      return (
        <ButtonGroup>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button autoFocus $isPrimary onClick={this.handleOpen}>
            Retry
          </Button>
        </ButtonGroup>
      );
    }
    if (!saving) {
      return (
        <Button autoFocus onClick={this.handleClose}>
          Close
        </Button>
      );
    }
    return null;
  }
  renderInner() {
    const {save: {saving, error}} = this.props;
    if (error) {
      return <ErrorState title={error} />;
    }
    if (!saving) {
      return <p>Your changes were saved.</p>;
    }
    return <LoadingState title="Uploading your changes to Pinecast…" />;
  }
  render() {
    const {props: {needsSave, save: {saving}}, state: {open}} = this;

    return (
      <React.Fragment>
        <ModalLayer canEscape={!saving} open={open} onClose={this.handleClose}>
          <Dialog actions={this.renderActions()} title={this.renderTitle()}>
            {this.renderInner()}
          </Dialog>
        </ModalLayer>
        <Button
          disabled={!needsSave}
          $isPrimary
          shortcut={{letter: 's', metaKey: true}}
          onClick={this.handleOpen}
          style={this.props.style}
        >
          Save theme
        </Button>
      </React.Fragment>
    );
  }
}

export default connect(
  ({save, needsSave}: ReducerType) => ({needsSave, save}),
  {doSave},
)(SaveOptions);
