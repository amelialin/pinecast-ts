import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import xhr from '@pinecast/xhr';

import Callout from './Callout';
import Label from './Label';
import Dropzone from './Dropzone';
import AudioUploadPreview from './uploadHelpers/AudioUploadPreview';
import UploadProgress from './uploadHelpers/UploadProgress';
import {url} from './helpers';

const messages = defineMessages({
  tooBig: {
    id: 'common.AudioUpload.errors.tooBig',
    description: 'Error when trying to upload a file that is too big',
    defaultMessage: 'That file is too big to upload.',
  },
  unableToContact: {
    id: 'common.AudioUpload.errors.unableToContact',
    description: 'Error when the uploader cannot contact Pinecast',
    defaultMessage: 'Unable to contact Pinecast',
  },
  failedToUpload: {
    id: 'common.AudioUpload.errors.failedToUpload',
    description: 'Error when an upload fails',
    defaultMessage: 'Failed to upload file',
  },
  dropzoneLabel: {
    id: 'common.AudioUpload.dropzoneLabel',
    description: 'Label for the drop zone',
    defaultMessage: 'Drag an MP3 file here.',
  },
});

interface Upload {
  url: string;
  method: 'POST' | 'PUT';
  fields: {[key: string]: string};
  destinationURL: string;
}

export default class AudioUpload extends React.PureComponent {
  ongoingUpload: {file: Blob; abort: () => Promise<void>} | null = null;
  ongoingRequest: number = 0;

  props: {
    audioType: string;
    labelText: JSX.Element | string;
    onCleared: () => void;
    onNewFile: (signedURL: string) => Promise<void>;
    value: string | null;

    slug?: string;
    forceName?: string;
    maxFileSize: number;
  };
  state: {
    error: React.ReactNode | null;
    uploading: boolean;
    uploadProgress: number;
  } = {
    error: null,
    uploading: false,
    uploadProgress: 0,
  };

  componentWillUnmount() {
    this.ongoingRequest += 1;
  }

  asyncSetState(newState: Partial<AudioUpload['state']>) {
    return new Promise(resolve => {
      this.setState(newState, resolve);
    });
  }

  handleGotFile = async (file: File) => {
    this.ongoingRequest += 1;
    const reqId = this.ongoingRequest;

    if (this.ongoingUpload) {
      await this.ongoingUpload.abort();
    }

    if (file.size > this.props.maxFileSize) {
      this.setState({error: <FormattedMessage {...messages.tooBig} />});
      return;
    }

    this.ongoingUpload = {
      file: file,
      abort: () => Promise.resolve(),
    };

    await this.asyncSetState({
      uploading: true,
      uploadProgress: 0,
    });

    let data;
    try {
      data = await this.getUploadData(file);
      if (reqId < this.ongoingRequest) {
        return;
      }
    } catch {
      if (reqId < this.ongoingRequest) {
        return;
      }
      this.setState({
        error: <FormattedMessage {...messages.unableToContact} />,
        uploading: false,
        uploadProgress: 0,
      });
      return;
    }

    const [aborter, completion] = this.upload(file, data);
    this.ongoingUpload.abort = aborter;

    try {
      await completion;
      if (reqId < this.ongoingRequest) {
        return;
      }
    } catch {
      if (reqId < this.ongoingRequest) {
        return;
      }
      this.setState({
        error: <FormattedMessage {...messages.failedToUpload} />,
        uploading: false,
        uploadProgress: 0,
      });
      return;
    }

    await this.props.onNewFile(data.destinationURL);
    if (reqId < this.ongoingRequest) {
      return;
    }

    this.setState({uploading: false, error: null, uploadProgress: 100});
  };

  async getUploadData(file: File): Promise<Upload> {
    const name =
      this.props.forceName || file.name.replace(/[^a-zA-Z0-9\._\-]/g, '_');
    const {audioType, slug} = this.props;

    let baseURL;
    switch (audioType) {
      case 'ads_advertisement':
        baseURL = '/assets/upload_url/ads_advertisement';
        break;
      default:
        baseURL = url`/assets/upload_url/${audioType}/${slug!}`;
    }
    const response = JSON.parse(
      await xhr({
        method: 'GET',
        url: baseURL + url`?name=${name}&type=${file.type}`,
      }),
    );
    return {
      url: response.url,
      method: response.method,
      fields: response.fields,
      destinationURL: response.destination_url,
    };
  }

  upload(file: Blob, upload: Upload): [(() => Promise<void>), Promise<void>] {
    let resolver: () => void = () => {};
    const abortPromise = new Promise<void>(resolve => {
      resolver = resolve;
    });

    const data = new FormData();
    for (let key in upload.fields) {
      if (upload.fields.hasOwnProperty(key)) {
        data.append(key, upload.fields[key]);
      }
    }
    data.append('file', file);

    const uploadXHR = xhr({
      method: upload.method,
      url: upload.url,
      body: data,
      abortPromise,
      onProgress: uploadProgress => {
        this.setState({uploadProgress});
      },
      noCSRFToken: true,
    });

    return [async () => resolver(), uploadXHR.then(() => {})];
  }

  renderUploadButton() {
    return (
      <Label text={this.props.labelText}>
        {this.state.error && (
          <Callout type="negative">{this.state.error}</Callout>
        )}
        <Dropzone
          accept={[
            'audio/mp3',
            'audio/mpeg',
            'audio/mpeg3',
            'audio/mpeg-3',
            'audio/x-mpeg-3',
          ]}
          label={<FormattedMessage {...messages.dropzoneLabel} />}
          onChange={this.handleGotFile}
        />
      </Label>
    );
  }

  renderPreview() {
    const {value} = this.props;
    return (
      <Label componentType="div" text={this.props.labelText}>
        {this.ongoingUpload ? (
          <AudioUploadPreview
            height={96}
            onClear={this.props.onCleared}
            audioBlob={this.ongoingUpload.file}
          />
        ) : (
          <div>Audio file: {value}</div>
        )}
      </Label>
    );
  }

  renderUploadProgress() {
    const abort =
      (this.ongoingUpload && this.ongoingUpload.abort) || (() => {});
    return (
      <Label componentType="div" text={this.props.labelText}>
        <UploadProgress
          onAbort={abort}
          uploads={[{percent: this.state.uploadProgress}]}
        />
      </Label>
    );
  }

  render() {
    const {
      props: {value},
      state: {uploading},
    } = this;

    if (uploading) {
      return this.renderUploadProgress();
    }
    if (!uploading && !value) {
      return this.renderUploadButton();
    }

    return this.renderPreview();
  }
}
