import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import Dropzone from '@pinecast/common/Dropzone';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';

import Asset from '../assets';
import ErrorComponent from '../Error';
import {decodeImage, reformatImage} from '../images';
import ImageViewer from '../ImageViewer';
import MusicInfo from '../icons/music-info';

const messages = defineMessages({
  errorTooBig: {
    id: 'db-uploader.AddArtwork.errorTooBig',
    description: 'When the audio file is too big, this is the error.',
    defaultMessage:
      'That file works, but it will make your MP3 file too big to upload.',
  },
  errorTooBigArtwork: {
    id: 'db-uploader.AddArtwork.errorTooBigArtwork',
    description: 'When the artwork file is too big, this is the error.',
    defaultMessage: 'That file is too big. Images may be up to 2MB.',
  },

  titleAddArtwork: {
    id: 'db-uploader.AddArtwork.titleAddArtwork',
    description: 'Title when adding artwork',
    defaultMessage: 'Add artwork',
  },
  titleAddArtworkNew: {
    id: 'db-uploader.AddArtwork.titleAddArtworkNew',
    description: 'Title when adding artwork to a new audio file',
    defaultMessage: 'Would you like to add artwork to your episode?',
  },
  copyAddArtworkNew: {
    id: 'db-uploader.AddArtwork.copyAddArtworkNew',
    description: 'Copy when adding artwork to a new audio file',
    defaultMessage:
      'Artwork will appear on your podcast website and in podcast apps instead of your cover art. Images should be square and between 1400x1400 and 3000x3000 pixels, up to 2MB.',
  },

  dropzone: {
    id: 'db-uploader.AddArtwork.dropzone',
    description: 'Text shown in the area where artwork can be dropped',
    defaultMessage: 'Drop a PNG or JPG file here',
  },

  subtitleUseExisting: {
    id: 'db-uploader.AddArtwork.subtitleUseExisting',
    description: 'Option to use existing artwork for a new audio file',
    defaultMessage: '…or use the artwork we have on file.',
  },
  ctaUseExisting: {
    id: 'db-uploader.AddArtwork.ctaUseExisting',
    description: 'Button to use existing artwork for a new audio file.',
    defaultMessage: 'Use existing',
  },

  ctaCancel: {
    id: 'db-uploader.AddArtwork.ctaCancel',
    description: 'Button to cancel adding new audio file',
    defaultMessage: 'Cancel',
  },
  ctaSkip: {
    id: 'db-uploader.AddArtwork.ctaSkip',
    description: 'Button to skip adding artwork',
    defaultMessage: 'Skip artwork',
  },
});

export default class AddArtwork extends React.PureComponent {
  props: {
    existingSource: string;
    notUpdatingAudio: boolean;
    onGotFile: (asset: Asset, isExisting?: boolean) => void;
    onReject: () => void;
    onRequestWaiting: () => Promise<void>;
    sizeLimit: number;
  };
  state: {error: React.ReactNode | null} = {error: null};

  async useExisting() {
    const {
      existingSource,
      notUpdatingAudio,
      onGotFile,
      onReject,
      onRequestWaiting,
    } = this.props;

    if (notUpdatingAudio) {
      onGotFile(Asset.makeDummy('image.jpg', 'image/jpg', 0), true);
      return;
    }

    await onRequestWaiting();
    // TODO: add guards and stuff and show progress
    let content;
    try {
      content = await Asset.downloadFromURL(existingSource);
    } catch (e) {
      console.error(e);
      onReject();
      return;
    }
    onGotFile(content, true);
  }
  handleClickUseExisting = () => {
    this.useExisting();
  };

  async onFileDropped(fileObj: File) {
    const {
      props: {onGotFile, sizeLimit},
    } = this;

    const asset = Asset.fromFile(fileObj);

    // TODO: this could probably use guards
    const decoded = await decodeImage(asset);
    let reformatted = await reformatImage(decoded);
    if (asset.size < reformatted.size) {
      reformatted = asset;
    }

    if (reformatted.size > sizeLimit) {
      this.setState({
        error: <FormattedMessage {...messages.errorTooBig} />,
      });
      return;
    }

    if (!reformatted.type) {
      reformatted.type = 'image/jpeg';
    }
    if (fileObj.name) {
      if (!fileObj.name.toLowerCase().endsWith('.jpg')) {
        reformatted.name = fileObj.name + '.jpg';
      } else {
        reformatted.name = fileObj.name;
      }
    }
    this.setState({error: null}, () => onGotFile(reformatted));
  }
  handleFileDropped = (fileObj: File) => {
    if (fileObj.size > 1024 * 1024 * 2) {
      this.setState({
        error: <FormattedMessage {...messages.errorTooBigArtwork} />,
      });
      return;
    }

    this.onFileDropped(fileObj);
  };

  render() {
    const {
      props: {existingSource, notUpdatingAudio, onReject},
      state: {error},
    } = this;

    return (
      <Card whiteBack style={{flexDirection: 'row'}}>
        <MusicInfo
          width={46}
          height={46}
          style={{flex: '0 0 46px', marginRight: 15}}
        />
        <div style={{flex: '1 1'}}>
          {notUpdatingAudio ? (
            <b style={{display: 'block'}}>
              <FormattedMessage {...messages.titleAddArtwork} />
            </b>
          ) : (
            <React.Fragment>
              <b style={{display: 'block'}}>
                <FormattedMessage {...messages.titleAddArtworkNew} />
              </b>
              <span style={{display: 'block', marginBottom: '0.5em'}}>
                <FormattedMessage {...messages.copyAddArtworkNew} />
              </span>
            </React.Fragment>
          )}
          {error && <ErrorComponent>{error}</ErrorComponent>}
          <label style={{display: 'block'}}>
            <Dropzone
              accept="image/jpg, image/jpeg, image/png"
              label={<FormattedMessage {...messages.dropzone} />}
              onChange={this.handleFileDropped}
              style={{marginBottom: 10}}
            />
          </label>
          {existingSource && (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                padding: '10px 0 20px',
              }}
            >
              <ImageViewer
                height={50}
                source={existingSource}
                style={{marginRight: 15}}
                width={50}
              />
              <div>
                <b
                  style={{
                    display: 'block',
                    lineHeight: '1em',
                    marginBottom: '0.25em',
                  }}
                >
                  <FormattedMessage {...messages.subtitleUseExisting} />
                </b>
                <Button
                  onClick={this.handleClickUseExisting}
                  $isPrimary
                  size="small"
                >
                  <FormattedMessage {...messages.ctaUseExisting} />
                </Button>
              </div>
            </div>
          )}
          <div>
            <Button onClick={onReject}>
              {notUpdatingAudio ? (
                <FormattedMessage {...messages.ctaCancel} />
              ) : (
                <FormattedMessage {...messages.ctaSkip} />
              )}
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}
