import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {gettext} from '@pinecast/i18n';

import MusicInfo from '../icons/music-info';

class TitleMonitor extends React.PureComponent {
  props: {};
  state: {isValid: boolean} = {isValid: false};
  targetComponent: HTMLInputElement = document.querySelector(
    'input[name=title]',
  ) as HTMLInputElement;

  componentDidMount() {
    this.targetComponent.addEventListener('input', this.onInput);
    this.setState({isValid: this.targetComponent.validity.valid});
  }

  componentWillUnmount() {
    this.targetComponent.removeEventListener('input', this.onInput);
  }

  onInput = (e: KeyboardEvent) => {
    this.setState({isValid: (e.target as HTMLInputElement).validity.valid});
  };

  render() {
    const style = {
      border: '2px solid #eee',
      borderRadius: 2,
      color: '#999',
      marginBottom: '1em',
      padding: '0 0.5em',
      transition: 'border 0.2s, color 0.2s',
    };
    if (this.state.isValid) {
      return (
        <div style={style}>
          {gettext(
            "The title you've entered above will be written to the file's metadata.",
          )}
        </div>
      );
    } else {
      return (
        <div style={{...style, border: '2px solid #B75B5B', color: '#B75B5B'}}>
          {gettext(
            'Set a title in the field above. It will fill the title in the metadata.',
          )}
        </div>
      );
    }
  }
}

export default ({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) => (
  <Card style={{flexDirection: 'row'}} whiteBack>
    <MusicInfo
      width={46}
      height={46}
      style={{flex: '0 0 46px', marginRight: 15}}
    />
    <div>
      <b style={{display: 'block'}}>
        {gettext("Your file doesn't contain any metadata.")}
      </b>
      <span style={{display: 'block', marginBottom: '0.5em'}}>
        {gettext(
          'Would you like us to automatically add it for you? This will show episode and podcast information in non-podcast apps.',
        )}
      </span>
      <TitleMonitor />
      <ButtonGroup>
        <Button onClick={onAccept} $isPrimary>
          {gettext('Add metadata')}
        </Button>
        <Button onClick={onReject}>{gettext('Skip')}</Button>
      </ButtonGroup>
    </div>
  </Card>
);
