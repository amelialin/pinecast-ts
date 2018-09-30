import * as React from 'react';

import {gettext} from '@pinecast/i18n';

export default class TimeRemainingIndicator extends React.PureComponent {
  props: {
    progress: number;
    renderer?: (value: React.ReactNode) => React.ReactNode;
    startTime: number;
  };
  state: {timeRemaining: number | null; startedTime: number | null} = {
    timeRemaining: null,
    startedTime: null,
  };
  timer: ReturnType<typeof setTimeout> | null = null;

  static getDerivedStateFromProps(
    nextProps: TimeRemainingIndicator['props'],
    state: TimeRemainingIndicator['state'],
  ): TimeRemainingIndicator['state'] {
    return {
      timeRemaining:
        nextProps.startTime !== state.startedTime ? null : state.timeRemaining,
      startedTime: nextProps.startTime,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 250);
  }
  componentWillUnmount() {
    clearInterval(this.timer!);
  }

  tick = () => {
    let percent = this.props.progress;
    if (!percent) {
      return;
    }
    percent /= 100;

    const duration = Date.now() - this.props.startTime;
    const fullTime = Math.ceil(duration / percent / 1000);
    const remaining = fullTime - Math.floor(duration / 1000);

    const seconds = Math.ceil(remaining % 60);
    const minutes = (remaining - seconds) / 60;

    this.setState({timeRemaining: `${minutes}:${('00' + seconds).slice(-2)}`});
  };

  render() {
    const body =
      this.state.timeRemaining || gettext('Calculating time remaining…');
    if (this.props.renderer) {
      return this.props.renderer(body);
    }
    return <div>{body}</div>;
  }
}
