import * as React from 'react';

import {gettext} from '@pinecast/i18n';
import {nullThrows} from '@pinecast/common/helpers';
import Spinner from '@pinecast/common/Spinner';

import {guardCallback, getInstance} from './legacy/util';

import Asset from './assets';
import CardFixImageProblems from './cards/FixImageProblems';
import {decodeImage, reformatImage, detectImageProblems} from './images';
import ErrorComponent from './Error';
import ImageFilePicker from './ImageFilePicker';
import ImageFilePreview from './ImageFilePreview';
import {ImageProblem} from './images';
import RequiredPlaceholder from './RequiredPlaceholder';
import UploadManager from './uploading/ManagementComponent';
import UploadOrder from './uploading/order';

const typeDefaultFilenamesByMIME: {[type: string]: string} = {
  'image/jpeg': 'artwork.jpg',
  'image/jpg': 'artwork.jpg',
  'image/png': 'artwork.png',
};
function getFilenameForImage(blob: Asset) {
  return typeDefaultFilenamesByMIME[blob.type] || 'artwork.jpg';
}

const uploadedPhases: {[phase: string]: boolean} = {
  uploaded: true,
};

function unsign(signedURL: string): string {
  if (!signedURL) {
    throw new Error('Empty signed url');
  }
  return signedURL
    .split('.')
    .slice(0, -1)
    .join('.');
}

type Phase = 'ready' | 'problems' | 'uploading' | 'uploaded' | 'waiting';

export default class ImageUploader extends React.PureComponent {
  static selector = '.image-upload-placeholder';

  static propExtraction = {
    defURL: (e: HTMLElement) => e.getAttribute('data-default-url'),
    label: (e: HTMLElement) => e.getAttribute('data-label') || gettext('Image'),
    name: (e: HTMLElement) => e.getAttribute('data-name'),
    podcast: (e: HTMLElement) => e.getAttribute('data-podcast'),

    noiTunesSizeCheck: (e: HTMLElement) =>
      e.getAttribute('data-no-itunes-size-check') === 'true',
    optional: (e: HTMLElement) => Boolean(e.getAttribute('data-optional')),
  };

  props: {
    defURL: string;
    label: string;
    name: string;
    podcast: string;

    noiTunesSizeCheck: boolean;
    optional: boolean;
  };
  state: {
    instance: string;
    error: string | null;

    phase: Phase;
    imageFile: Asset | null;
    imageSourceURL: string | null;

    problems: Array<ImageProblem> | null;
    uploadOrders: Array<UploadOrder> | null;
  };

  constructor(props: ImageUploader['props']) {
    super(props);
    this.state = {
      instance: getInstance(),
      error: null,

      phase: props.defURL ? 'uploaded' : 'ready',
      imageFile: null,
      imageSourceURL: props.defURL || null,

      problems: null,
      uploadOrders: null,
    };
  }

  clearFile = (extra?: Partial<ImageUploader['state']>, cb?: () => void) => {
    if (this.state.phase === 'uploading' && this.state.uploadOrders) {
      this.state.uploadOrders.forEach(order => order.abort());
    }
    this.setState(
      {
        error: null,

        phase: 'ready',
        imageFile: null,
        imageSourceURL: null,

        problems: null,
        uploadOrders: null,
        ...extra,
      },
      cb,
    );
  };

  promiseSetState(state: Partial<ImageUploader['state']>): Promise<void> {
    return new Promise(resolve => this.setState(state, resolve));
  }

  getUploadOrder(object: Asset, fileName: string = object.name) {
    const order = new UploadOrder(
      this.props.podcast,
      this.props.label,
      fileName,
      'image',
      object,
    );
    return order;
  }

  async gotFileToUpload() {
    const {
      props: {noiTunesSizeCheck},
      state: {imageFile},
    } = this;

    if (!imageFile) {
      throw new Error('unreachable');
    }

    if (imageFile.size > 1024 * 1024 * 2) {
      this.clearFile({
        error: gettext('That image is too large. Images may be up to 2MB.'),
      });
      return;
    }
    if (imageFile.size === 0) {
      this.clearFile({
        error: gettext(
          'When we tried to read the file you chose, we got back no data.',
        ),
      });
      return;
    }

    if (noiTunesSizeCheck) {
      this.startUploading();
      return;
    }

    const problems = await guardCallback(this, detectImageProblems(imageFile));
    if (!problems || !problems.length) {
      this.startUploading();
      return;
    }

    this.setState({
      phase: 'problems',
      problems,
    });
  }
  handleGotFileToUpload = () => {
    this.gotFileToUpload();
  };

  startUploading = (orders?: Array<UploadOrder>) => {
    this.setState({
      phase: 'uploading',
      uploadOrders: orders
        ? orders.filter(x => x)
        : [this.getUploadOrder(this.state.imageFile!)],
    });
  };

  renderImagePreview() {
    const {
      props: {label},
      state: {imageFile, imageSourceURL, phase},
    } = this;
    if (!(imageFile || imageSourceURL)) {
      return null;
    }
    return (
      <ImageFilePreview
        isUploaded={Boolean(uploadedPhases[phase])}
        name={label}
        onRemove={() => this.clearFile()}
        source={nullThrows(
          imageFile || (imageSourceURL && unsign(imageSourceURL)),
        )}
      />
    );
  }

  async fixImageProblems() {
    const {
      state: {imageFile},
    } = this;

    if (!imageFile) {
      throw new Error('unreachable');
    }

    await this.promiseSetState({phase: 'waiting'});

    const decoded = await guardCallback(this, decodeImage(imageFile));
    let reformatted: Asset;
    try {
      reformatted = await guardCallback(
        this,
        reformatImage(decoded, 0.8, 1400, 3000),
      );
      reformatted.name = imageFile.name;
    } catch (e) {
      console.error(e);
      this.startUploading();
      return;
    }

    await this.promiseSetState({imageFile: reformatted});
    this.startUploading([
      this.getUploadOrder(
        reformatted,
        reformatted.name || getFilenameForImage(reformatted),
      ),
    ]);
  }
  handleFixImageProblems = () => {
    this.fixImageProblems();
  };
  handleIgnoreImageProblems = () => {
    this.startUploading();
  };

  handleCancelUpload = () => {
    this.clearFile();
  };
  handleUploadComplete = () => {
    this.setState({phase: 'uploaded'});
  };

  renderBody() {
    const {
      state: {phase, problems, uploadOrders},
    } = this;
    switch (phase) {
      case 'ready':
        return (
          <ImageFilePicker
            onGetFile={file =>
              this.setState(
                {imageFile: file, phase: 'waiting'},
                this.handleGotFileToUpload,
              )
            }
          />
        );

      case 'waiting':
        return <Spinner />;

      case 'problems':
        return (
          <div>
            {this.renderImagePreview()}
            <CardFixImageProblems
              onAccept={this.handleFixImageProblems}
              onIgnore={this.handleIgnoreImageProblems}
              problems={problems!}
            />
          </div>
        );

      case 'uploading':
        return (
          <UploadManager
            onCancel={this.handleCancelUpload}
            onComplete={this.handleUploadComplete}
            orders={uploadOrders!}
          />
        );

      case 'uploaded':
        return this.renderImagePreview();
    }
  }

  renderFields() {
    const {
      props: {name},
      state: {imageSourceURL, phase, uploadOrders},
    } = this;

    if (!uploadedPhases[phase]) {
      return null;
    }

    const order = uploadOrders && uploadOrders.find(x => x.type === 'image');
    if (order) {
      return <input name={name} type="hidden" value={order.getURL()} />;
    }

    if (!imageSourceURL) {
      return null;
    }

    return <input name={name} type="hidden" value={imageSourceURL} />;
  }

  render() {
    const {
      props: {optional},
      state: {error, phase},
    } = this;
    return (
      <div>
        {error && <ErrorComponent>{error}</ErrorComponent>}
        {this.renderBody()}
        {this.renderFields()}
        {!uploadedPhases[phase] && !optional && <RequiredPlaceholder />}
      </div>
    );
  }
}
