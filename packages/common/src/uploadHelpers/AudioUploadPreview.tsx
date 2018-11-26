import * as React from 'react';
import * as WaveSurfer from 'wavesurfer.js';

import AudioControls from '../audio/AudioControls';
import Card from '../Card';
import DeleteButton from '../DeleteButton';
import TimeCodeInput from './TimeCodeInput';

const previewCardStyles = {
  padding: 4,
  position: 'relative',

  ':not(:empty) .AudioControls': {
    opacity: 0.4,
  },
  ':hover .AudioControls': {
    opacity: 1,
  },
};
const innerStyle = {
  backgroundColor: '#f6f7f5',
  borderRadius: 3,
};
const deleteStyle = {
  position: 'absolute',
  right: 8,
  top: 8,
};

export default class AudioUploadPreview extends React.Component {
  props: {
    audioBlob: Blob;
    collectTimeCodes?: boolean;
    height: number;
    onClear: () => void;
  };
  state: {
    cursorAt: number;
    loaded: boolean;
    playing: boolean;
  } = {
    cursorAt: 0,
    loaded: false,
    playing: false,
  };

  ws: WaveSurfer | null = null;

  ref = (el: HTMLElement | null) => {
    if (el) {
      this.ws = WaveSurfer.create({
        container: el,
        cursorColor: '#616669',
        height: this.props.height,
        progressColor: '#32586e',
        responsive: true,
        waveColor: '#708d9e',
      });
      this.ws.loadBlob(this.props.audioBlob);
      this.ws.on('ready', () => {
        this.setState({loaded: true});
      });
      this.ws.on('play', () => {
        this.setState({playing: true});
      });
      this.ws.on('pause', () => {
        this.setState({playing: false});
      });
      if (this.props.collectTimeCodes) {
        this.ws.on('audioprocess', () => {
          this.setState({cursorAt: this.ws!.getCurrentTime() * 1000});
        });
      }
    } else {
      this.ws!.destroy();
    }
  };

  renderTimecodePicker() {
    if (!this.props.collectTimeCodes || !this.state.loaded) {
      return null;
    }
    return (
      <Card style={{marginTop: -4}} whiteBack>
        <TimeCodeInput timecode={this.state.cursorAt / 1000} />
      </Card>
    );
  }

  handlePause = () => {
    this.ws!.pause();
  };
  handlePlay = () => {
    this.ws!.play();
  };
  handleReset = () => {
    this.ws!.pause();
    this.ws!.seekTo(0);
  };

  render() {
    return (
      <React.Fragment>
        <Card style={previewCardStyles} whiteBack>
          <div ref={this.ref} style={innerStyle} />
          {this.state.loaded && (
            <AudioControls
              playing={this.state.playing}
              onPause={this.handlePause}
              onPlay={this.handlePlay}
              onReset={this.handleReset}
              style={{
                bottom: 8,
                left: 8,
                position: 'absolute',
              }}
            />
          )}
          <DeleteButton onClick={this.props.onClear} style={deleteStyle} />
        </Card>
        {this.renderTimecodePicker()}
      </React.Fragment>
    );
  }
}
