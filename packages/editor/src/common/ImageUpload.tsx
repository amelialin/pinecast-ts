import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {dropZoneStyle} from './imageUploadHelpers/styles';
import Label from './Label';
import ImageUploadDropzone from './imageUploadHelpers/ImageUploadDropzone';
import ImageUploadPreview from './imageUploadHelpers/ImageUploadPreview';
import ImageUploadProgress from './imageUploadHelpers/ImageUploadProgress';
import xhr from '../data/xhr';

interface Upload {
  url: string;
  method: string;
  fields: {[key: string]: string};
  destinationURL: string;
}

class ImageUpload extends React.PureComponent {
  ongoingUpload: {file: File; abort: () => Promise<void>} | null = null;
  ongoingRequest: number = 0;

  props: {
    imageType: 'site_logo' | 'site_favicon';
    labelText: string;
    onCleared: () => void;
    onNewFile: (signedURL: string) => Promise<void>;
    value: string | null;

    slug: string;
    csrf: string;
  };
  state: {
    error: JSX.Element | string | null;
    uploading: boolean;
    uploadProgress: number;
  } = {
    error: null,
    uploading: false,
    uploadProgress: 0,
  };

  asyncSetState(newState) {
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

    this.ongoingUpload = {
      file,
      abort: () => Promise.resolve(),
    };

    await this.asyncSetState({
      selectedFile: file,
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
        error: 'Unable to contact Pinecast',
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
        error: 'Failed to upload file',
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
    const name = file.name.replace(/[^a-zA-Z0-9\._\-]/g, '_');
    const {imageType, slug} = this.props;
    const response = JSON.parse(
      await xhr({
        method: 'GET',
        url: `/assets/upload_url/${imageType}/${encodeURIComponent(
          slug,
        )}?name=${encodeURIComponent(name)}&type=${encodeURIComponent(
          file.type,
        )}`,
      }),
    );
    return {
      url: response.url,
      method: response.method,
      fields: response.fields,
      destinationURL: response.destination_url,
    };
  }

  upload(file: File, upload: Upload): [(() => Promise<void>), Promise<void>] {
    let resolver;
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
      method: 'POST', // TODO: use upload.method
      url: upload.url,
      body: data,
      abortPromise,
      onProgress: uploadProgress => {
        this.setState({uploadProgress});
      },
    });

    return [async () => resolver(), uploadXHR.then(() => {})];
  }

  renderUploadButton() {
    // TODO: render error
    return (
      <Label text={this.props.labelText}>
        <ImageUploadDropzone onChange={this.handleGotFile} />
      </Label>
    );
  }

  renderPreview() {
    const {value} = this.props;
    if (!value) {
      throw new Error('unreachable');
    }
    return (
      <Label componentType="div" text={this.props.labelText}>
        <ImageUploadPreview
          maxHeight={200}
          maxWidth="100%"
          onClear={this.props.onCleared}
          src={value}
        />
      </Label>
    );
  }

  renderUploadProgress() {
    const abort =
      (this.ongoingUpload && this.ongoingUpload.abort) || (() => {});
    return (
      <Label componentType="div" text={this.props.labelText}>
        <ImageUploadProgress
          onAbort={abort}
          percent={this.state.uploadProgress}
        />
      </Label>
    );
  }

  render() {
    const {props: {value}, state: {uploading}} = this;

    if (uploading) {
      return this.renderUploadProgress();
    }
    if (!uploading && !value) {
      return this.renderUploadButton();
    }

    return this.renderPreview();
  }
}

export default connect(state => ({csrf: state.csrf, slug: state.slug}))(
  ImageUpload,
);
