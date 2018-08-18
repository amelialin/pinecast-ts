import * as React from 'react';

import Card from '@pinecast/common/Card';
import Collapser from '@pinecast/common/Collapser';
import {gettext} from '@pinecast/i18n';
import Progress from '@pinecast/common/Progress';
import styled from '@pinecast/styles';

import prettyBytes from '../formatSize';
import StorageFull from '../icons/storage-full';
import StoragePartial from '../icons/storage-partial';

const ToggleButtonInner = styled(
  'button',
  ({$isToggled}: {$isToggled: boolean}) => ({
    appearance: 'none',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',
    transform: $isToggled ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s',
  }),
  {type: 'button'},
);

const ToggleButton = ({
  isToggled,
  onClick,
}: {
  isToggled: boolean;
  onClick: () => void;
}) => (
  <ToggleButtonInner
    $isToggled={isToggled}
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
  >
    <i className="icon icon-angle-down" />
  </ToggleButtonInner>
);

export default class Storage extends React.PureComponent {
  props: {
    limit: number;
    plan: 'demo' | 'pro' | 'starter' | 'community';
    surge: number;
  };
  state: {open: boolean} = {open: false};

  toggle = () => this.setState({open: !this.state.open});

  render() {
    const {
      props: {limit, plan, surge},
      state: {open},
    } = this;
    const IconComponent = surge < limit ? StoragePartial : StorageFull;
    return (
      <Card
        whiteBack
        style={{
          backgroundColor: open
            ? 'rgba(255, 255, 255, 0.75)'
            : 'rgba(255, 255, 255, 0.3)',
          marginTop: 15,
          transition: 'background-color 0.3s',
        }}
      >
        <div style={{display: 'flex'}}>
          <IconComponent style={{flex: '0 0 23px', marginRight: 10}} />
          <div style={{flex: '1 1', fontSize: 14, fontWeight: 500}}>
            {gettext('You can upload files up to %s.').replace(
              /%s/,
              prettyBytes(limit + surge),
            )}
          </div>
          <ToggleButton onClick={this.toggle} isToggled={open} />
        </div>
        <Collapser open={open} shave={0}>
          <div style={{paddingLeft: 33}}>
            <div>
              {gettext(
                'This podcast may have audio files as big as %s.',
              ).replace(/%s/, prettyBytes(limit))}
            </div>
            {plan === 'demo' ? (
              <div>
                {gettext(
                  'This podcast is on a free plan, so there is no upload surge.',
                )}
              </div>
            ) : (
              <div>
                {gettext(
                  'This podcast has %s of upload surge available.',
                ).replace(/%s/, prettyBytes(surge))}
              </div>
            )}
            {plan !== 'demo' && (
              <div style={{alignItems: 'center', display: 'flex'}}>
                <span
                  style={{flex: '0 0', marginRight: 10, whiteSpace: 'nowrap'}}
                >
                  {gettext('Surge remaining:')}
                </span>
                <Progress percent={surge / limit * 100} style={{flex: '1 1'}} />
              </div>
            )}
          </div>
        </Collapser>
      </Card>
    );
  }
}