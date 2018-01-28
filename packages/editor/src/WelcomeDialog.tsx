import * as React from 'react';

import Button from './common/Button';
import Dialog from './common/Dialog';
import ModalLayer from './common/ModalLayer';

export default class WelcomeDialog extends React.PureComponent {
  state: {open: boolean} = {open: false};

  componentDidMount() {
    try {
      if (localStorage.getItem('pinecast.sb.0.welcome')) {
        return;
      }
      this.setState({open: true});
    } catch (e) {
      return;
    }
  }

  handleClose = () => {
    this.setState({open: false});
    localStorage.setItem('pinecast.sb.0.welcome', 'true');
  };

  render() {
    return (
      <ModalLayer open={this.state.open} onClose={this.handleClose}>
        <Dialog
          actions={<Button onClick={this.handleClose}>Close</Button>}
          title="Welcome!"
        >
          <p>
            <b>Welcome to alpha release of the Pinecast Site Builder!</b> The
            sites you design here will not be live immediately, but we'll be
            switching them on in the coming weeks. Saving your work will ensure
            the site you build will be the one your users see when the Site
            Builder goes live for your listeners.
          </p>
          <p>
            This is still pre-release software, meaning you'll likely come
            across bugs. We're actively fixing problems and adding new features,
            so expect issues to clear up quickly.
          </p>
          <p>
            If you run into trouble, use the <b>Report a problem</b> button in
            the upper right. It will capture information about your session and
            create a ticket for us to address the problem.
          </p>
        </Dialog>
      </ModalLayer>
    );
  }
}
