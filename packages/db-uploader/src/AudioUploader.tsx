import * as React from 'react';

import {gettext} from '@pinecast/i18n';
import {nullThrows} from '@pinecast/common/helpers';
import Spinner from '@pinecast/common/Spinner';

import {guardCallback, getInstance} from './legacy/util';

import addMetadata, {MetadataObj} from './mp3/addMetadata';
import Asset from './assets';
import AudioFilePicker from './AudioFilePicker';
import AudioFilePreview from './AudioFilePreview';
import CardAddMetadata from './cards/AddMetadata';
import CardAddArtwork from './cards/AddArtwork';
import CardRemoveArtwork from './cards/RemoveArtwork';
import CardReplaceArtwork from './cards/ReplaceArtwork';
import CardStorage from './cards/Storage';
import {decodeImage, reformatImage} from './images';
import {detectAudioSize, getID3Tags} from './mp3';
import ErrorComponent from './Error';
import ImageFilePreview from './ImageFilePreview';
import RequiredPlaceholder from './RequiredPlaceholder';
import UploadManager from './uploading/ManagementComponent';
import UploadOrder from './uploading/order';

const typeNames: {[type: string]: string} = {
  audio: gettext('Audio'),
  image: gettext('Artwork'),
};
const typeDefaultFilenamesByMIME: {[type: string]: string} = {
  'image/jpeg': 'artwork.jpg',
  'image/jpg': 'artwork.jpg',
  'image/png': 'artwork.png',
};
function getFilenameForImage(asset: Asset) {
  return typeDefaultFilenamesByMIME[asset.type] || 'artwork.jpg';
}

const uploadedPhases: {[phase: string]: boolean} = {
  uploaded: true,
  'confirm remove artwork': true,
};

function unsign(signedURL: string) {
  if (!signedURL) {
    throw new Error('Empty signed url');
  }
  return signedURL
    .split('.')
    .slice(0, -1)
    .join('.');
}

type Phase =
  | 'ready'
  | 'uploading'
  | 'uploaded'
  | 'waiting'
  | 'replace pic'
  | 'missing pic'
  | 'missing id3'
  | 'confirm remove artwork';

export default class AudioUploader extends React.Component {
  static selector = '.audio-uploader-placeholder';

  static propExtraction = {
    podcast: (e: HTMLElement) => e.getAttribute('data-podcast'),
    podcastName: (e: HTMLElement) => e.getAttribute('data-podcast-name'),
    podcastAuthor: (e: HTMLElement) => e.getAttribute('data-podcast-author'),

    duration: (e: HTMLElement) =>
      parseFloat(e.getAttribute('data-duration') || '0'),

    defURL: (e: HTMLElement) => e.getAttribute('data-default-url'),
    defImageURL: (e: HTMLElement) => e.getAttribute('data-image-url'),
    defSize: (e: HTMLElement) =>
      parseFloat(e.getAttribute('data-default-size') || '0'),
    defType: (e: HTMLElement) => e.getAttribute('data-default-type'),

    plan: (e: HTMLElement) => e.getAttribute('data-plan'),
    uploadLimit: (e: HTMLElement) =>
      parseFloat(e.getAttribute('data-upload-limit') || '0'),
    uploadSurge: (e: HTMLElement) =>
      parseFloat(e.getAttribute('data-upload-surge') || '0'),
  };

  props: {
    podcast: string;
    podcastName: string;
    podcastAuthor: string;
    duration: number;
    defURL: string;
    defImageURL: string;
    defSize: number;
    defType: string;

    plan: 'pro' | 'starter' | 'demo' | 'community';
    uploadLimit: number;
    uploadSurge: number;
  };
  state: {
    instance: string;
    error: React.ReactNode | null;
    phase: Phase;

    audioFile: Asset | null;
    audioSourceURL: string | null;
    duration: number | null;
    metadataScratch: MetadataObj | null;

    artworkFile: Asset | null;
    artworkSourceURL: string | null;

    uploadOrders: Array<UploadOrder> | null;
  };

  constructor(props: AudioUploader['props']) {
    super(props);

    const audioFile = props.defURL
      ? Asset.makeDummy(
          props.defURL.split('/').pop()!,
          props.defType,
          props.defSize,
        )
      : null;

    this.state = {
      instance: getInstance(),
      error: null,

      phase: props.defURL ? 'uploaded' : 'ready',
      audioFile,
      audioSourceURL: props.defURL || null,
      duration: props.duration === null ? null : props.duration,
      metadataScratch: null,

      artworkFile: null,
      artworkSourceURL: props.defImageURL || null,

      uploadOrders: null,
    };
  }

  clearFile = (extra?: Partial<AudioUploader['state']>, cb?: () => void) => {
    if (this.state.phase === 'uploading' && this.state.uploadOrders) {
      this.state.uploadOrders.forEach(order => order.abort());
    }
    this.setState(
      {
        instance: getInstance(),
        error: null,

        phase: 'ready',
        audioFile: null,
        duration: null,
        metadataScratch: null,

        artworkFile: null,
        artworkSourceURL: null,

        uploadOrders: null,
        ...extra,
      },
      cb,
    );
  };

  promiseSetState(state: Partial<AudioUploader['state']>) {
    return new Promise<void>(resolve => this.setState(state, resolve));
  }

  getUploadOrder(
    type: 'audio' | 'image',
    object: Asset,
    fileName: string = 'name' in object ? object.name : '',
  ) {
    return new UploadOrder(
      this.props.podcast,
      typeNames[type],
      fileName,
      type,
      object,
    );
  }

  async decodeImageFromID3(asset: Asset, type: string): Promise<Asset | null> {
    if (asset.size < 1024 * 1024) {
      return asset;
    }

    // Resize the image to save space
    const decodedImage = await guardCallback(this, decodeImage(asset));
    asset = await guardCallback(this, reformatImage(decodedImage));
    if (asset.size > 2 * 1024 * 1024) {
      return null;
    }
    return asset;
  }

  async gotFileToUpload() {
    const {
      props: {defImageURL, podcastAuthor, uploadLimit, uploadSurge},
      state: {audioFile},
    } = this;

    if (!audioFile) {
      throw new Error('unreachable');
    }

    if (audioFile.size > uploadLimit + uploadSurge) {
      this.clearFile({
        error: gettext(
          'The file you chose is too large to upload with your plan.',
        ),
      });
      return;
    }
    if (audioFile.size === 0) {
      this.clearFile({
        error: gettext(
          'When we tried to read the file you chose, we got back no data.',
        ),
      });
      return;
    }

    try {
      const duration = await guardCallback(this, detectAudioSize(audioFile));
      await this.promiseSetState({duration});
    } catch (e) {
      console.error(e);
      await this.promiseSetState({duration: 0});
    }

    switch (audioFile.type) {
      case 'audio/m4a':
      case 'audio/x-m4a':
      case 'audio/aac':
        this.startUploading();
        return;
    }

    try {
      const id3Tags = await guardCallback(this, getID3Tags(audioFile));
      const getBaseMetadata = (
        tags = (id3Tags && id3Tags.tags) || {},
      ): MetadataObj => ({
        title: tags.title,
        artist: tags.artist,
        album: tags.album,
        chapters: tags.CHAP,
        tableOfContents: tags.CTOC,
      });

      if (
        !id3Tags ||
        !id3Tags.tags.title ||
        (!id3Tags.tags.artist && podcastAuthor) ||
        !id3Tags.tags.album
      ) {
        // -> missing id3
        this.setState({
          phase: 'missing id3',
          metadataScratch: getBaseMetadata(),
        });
        return;
      } else if (!id3Tags.tags.picture) {
        // -> has id3, missing artwork
        this.setState({
          phase: 'missing pic',
          metadataScratch: getBaseMetadata(),
        });
        return;
      }

      const imgBuffer = await this.decodeImageFromID3(
        audioFile,
        id3Tags.tags.picture.format,
      );
      if (!imgBuffer) {
        this.setState({
          phase: 'missing pic',
          metadataScratch: getBaseMetadata(),
        });
        return;
      }

      if (defImageURL) {
        await this.promiseSetState({
          metadataScratch: getBaseMetadata(),
          phase: 'replace pic',
        });
        return;
      }
      this.startUploading([
        this.getUploadOrder('audio', audioFile),
        this.getUploadOrder('image', imgBuffer, getFilenameForImage(imgBuffer)),
      ]);
    } catch (e) {
      console.error(e);
      // -> start uploading
      this.startUploading([this.getUploadOrder('audio', audioFile)]);
    }
  }

  async replacePicWithExisting() {
    await this.promiseSetState({phase: 'waiting'});

    const {
      props: {defImageURL},
      state: {audioFile, artworkFile, metadataScratch},
    } = this;

    let imgContent: Asset;
    try {
      // TODO: Move this into the card and show progress.
      // I didn't do that now because it means a few things:
      //  1. Much more complicated error handling
      //  2. Extra work is needed because the audio can be cleared while this downloads
      imgContent = await Asset.downloadFromURL(unsign(defImageURL));
    } catch (e) {
      console.error(e);
      // Just give up and use the new one
      this.startUploading([
        this.getUploadOrder('audio', audioFile!),
        this.getUploadOrder(
          'image',
          artworkFile!,
          getFilenameForImage(artworkFile!),
        ),
      ]);
      return;
    }

    await this.promiseSetState({
      artworkSourceURL: defImageURL,
      metadataScratch: {
        ...metadataScratch,
        artwork: await imgContent.getAsArrayBuffer(),
      },
    });

    return this.addMetadata(true);
  }

  async addMetadata(noImageUpload = false) {
    const {
      state: {audioFile, metadataScratch},
    } = this;
    if (!audioFile) {
      throw new Error('unreachable');
    }
    let newAudioFile: Asset;
    try {
      const blob = addMetadata(
        await audioFile.getAsArrayBuffer(),
        metadataScratch!,
      );
      newAudioFile = Asset.fromBlob(blob, audioFile.name);
      await this.promiseSetState({audioFile: newAudioFile});
    } catch (e) {
      console.error(e);
      newAudioFile = audioFile;
    }

    this.startUploading([
      this.getUploadOrder('audio', newAudioFile),
      metadataScratch!.artwork &&
        !noImageUpload &&
        this.getUploadOrder(
          'image',
          Asset.fromArrayBuffer(
            metadataScratch!.artwork!,
            'artwork.jpg',
            'image/jpeg',
          ),
        ),
    ]);
  }

  startUploading = (orders?: Array<UploadOrder | null | undefined | false>) => {
    this.setState({
      phase: 'uploading',
      uploadOrders: orders
        ? orders.filter(x => x)
        : [this.getUploadOrder('audio', this.state.audioFile!)],
    });
  };

  renderAudioPreview() {
    const {
      state: {audioFile, duration, audioSourceURL, phase, uploadOrders},
    } = this;

    let url: string | null;
    if (uploadOrders) {
      url = uploadOrders.find(x => x.type === 'audio')!.getURL();
    } else {
      url = audioSourceURL;
    }

    return (
      <AudioFilePreview
        duration={duration!}
        isUploaded={Boolean(uploadedPhases[phase])}
        name="Episode Audio"
        onCancel={this.clearFile}
        size={audioFile!.size}
        url={url ? unsign(url) : null}
      />
    );
  }

  renderImagePreview() {
    const {
      state: {audioFile, artworkFile, artworkSourceURL},
    } = this;
    if (!(artworkFile || artworkSourceURL)) {
      return null;
    }
    const source = nullThrows(
      artworkFile || (artworkSourceURL && unsign(artworkSourceURL)),
    );
    return (
      <ImageFilePreview
        name="Episode Artwork"
        onRemove={() => this.setState({phase: 'confirm remove artwork'})}
        size={
          artworkSourceURL
            ? null
            : artworkFile
              ? artworkFile.size
              : audioFile!.size
        }
        source={source}
      />
    );
  }

  handleGotFileToUpload = () => {
    this.gotFileToUpload();
  };

  handleSetMetadata = () => {
    this.setState({
      phase: 'missing pic',
      metadataScratch: {
        ...this.state.metadataScratch,
        title: (document.querySelector('input[name=title]') as HTMLInputElement)
          .value,
        artist: this.props.podcastAuthor,
        album: this.props.podcastName,
      },
    });
  };
  handleSkipMetadata = () => {
    this.startUploading();
  };

  handleUseExistingPic = () => {
    this.replacePicWithExisting();
  };
  handleAddMetadata = () => {
    this.addMetadata();
  };

  renderBody() {
    const {
      props,
      state: {audioFile, artworkFile, metadataScratch, phase, uploadOrders},
    } = this;
    switch (phase) {
      case 'ready':
        return (
          <div>
            <AudioFilePicker
              onGetFile={file =>
                this.setState(
                  {audioFile: Asset.fromFile(file), phase: 'waiting'},
                  this.handleGotFileToUpload,
                )
              }
            />
            <CardStorage
              limit={props.uploadLimit}
              plan={props.plan}
              surge={props.uploadSurge}
            />
          </div>
        );

      case 'waiting':
        return <Spinner />;

      case 'missing id3':
        return (
          <div>
            {this.renderAudioPreview()}
            <CardAddMetadata
              onAccept={this.handleSetMetadata}
              onReject={this.handleSkipMetadata}
            />
          </div>
        );

      case 'missing pic':
        return (
          <div>
            {this.renderAudioPreview()}
            <CardAddArtwork
              existingSource={props.defImageURL && unsign(props.defImageURL)}
              onGotFile={async (asset, isExisting) => {
                await guardCallback(
                  this,
                  this.promiseSetState({
                    artworkSourceURL: isExisting ? props.defImageURL : null,
                    artworkFile: !isExisting ? asset : null,
                    metadataScratch: {
                      ...metadataScratch,
                      artwork: await asset.getAsArrayBuffer(),
                    },
                    phase: 'waiting',
                  }),
                );
                this.addMetadata(isExisting);
              }}
              onReject={() => {
                if (metadataScratch) {
                  this.setState({phase: 'waiting'}, this.handleAddMetadata);
                  return;
                }
                this.startUploading();
              }}
              onRequestWaiting={() => this.promiseSetState({phase: 'waiting'})}
              sizeLimit={
                props.uploadLimit + props.uploadSurge - audioFile!.size
              }
            />
          </div>
        );

      case 'replace pic':
        return (
          <div>
            {this.renderAudioPreview()}
            <CardReplaceArtwork
              existingSource={unsign(props.defImageURL)}
              newSource={audioFile!}
              onChooseExisting={this.handleUseExistingPic}
              onChooseNew={() => {
                this.setState({metadataScratch: null}, () => {
                  this.startUploading([
                    this.getUploadOrder('audio', audioFile!),
                    this.getUploadOrder(
                      'image',
                      artworkFile!,
                      getFilenameForImage(artworkFile!),
                    ),
                  ]);
                });
              }}
            />
          </div>
        );

      case 'uploading':
        return (
          <UploadManager
            onCancel={() => this.clearFile()}
            onComplete={() => this.setState({phase: 'uploaded'})}
            orders={uploadOrders!}
          />
        );

      case 'uploaded':
        return (
          <div>
            {this.renderAudioPreview()}
            {this.renderImagePreview()}
          </div>
        );
      case 'confirm remove artwork':
        return (
          <div>
            {this.renderAudioPreview()}
            <CardRemoveArtwork
              onAccept={() => {
                this.setState({
                  artworkFile: null,
                  artworkSourceURL: null,

                  phase: 'uploaded',
                });
              }}
              onCancel={() => this.setState({phase: 'uploaded'})}
            />
          </div>
        );
    }
  }

  renderFields() {
    const {
      state: {
        duration,
        audioFile,
        audioSourceURL,
        artworkSourceURL,
        phase,
        uploadOrders,
      },
    } = this;

    if (!uploadedPhases[phase]) {
      return null;
    }
    const field = (key: string, value: string | number | null) =>
      (value || value === 0) && (
        <input key={key} name={key} type="hidden" value={value} />
      );
    const getOrderURL = (type: string, def: string) => {
      if (!uploadOrders) {
        if (!def) {
          return null;
        }
        return field(`${type}-url`, def);
      }
      const order = uploadOrders.find(x => x.type === type);
      if (!order && !def) {
        return null;
      }
      return field(`${type}-url`, order ? order.getURL() : def);
    };
    return [
      getOrderURL('audio', audioSourceURL!),
      getOrderURL('image', artworkSourceURL!),
      field('audio-url-size', audioFile!.size),
      field('audio-url-type', audioFile!.type),
      field('duration', duration),
    ].filter(x => x);
  }

  render() {
    const {
      state: {error, phase},
    } = this;
    return (
      <div>
        {error && <ErrorComponent>{error}</ErrorComponent>}
        {this.renderBody()}
        {this.renderFields()}
        {!uploadedPhases[phase] && <RequiredPlaceholder />}
      </div>
    );
  }
}
