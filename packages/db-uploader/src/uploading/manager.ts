import {gettext} from '@pinecast/i18n';
import {url as urlTag} from '@pinecast/common/helpers';
import xhr from '@pinecast/xhr';

import ManagementComponent from './ManagementComponent';
import UploadOrder from './order';

export type UploadManagerEntry = {
  inst: UploadManager;
  completed: number;
  error: string | null;
  progress: number;
};

export abstract class UploadManager {
  component: ManagementComponent;
  order: UploadOrder;

  error: string | null = null;
  progress: number = 0;
  completed: number = 0;

  finalContentURL: string | null = null;

  aborter: (() => void) | null = null;

  constructor(component: ManagementComponent, order: UploadOrder) {
    this.component = component;
    this.order = order;

    this.startUpload();
  }

  abstract get defaultMIME(): string;

  unloadHandler = (e: BeforeUnloadEvent) => {
    e.returnValue = gettext(
      'A file is currently uploading. Are you sure you wish to leave this page?',
    );
  };
  setUnloadHandler() {
    window.addEventListener('beforeunload', this.unloadHandler);
  }
  clearUnloadHandler() {
    window.removeEventListener('beforeunload', this.unloadHandler);
  }

  getEntry(): UploadManagerEntry {
    return {
      inst: this,

      completed: this.completed,
      error: this.error,
      progress: this.progress,
    };
  }

  update() {
    this.component.refresh();
  }

  getType() {
    if (this.order.asset.type === 'application/octet-stream') {
      return this.defaultMIME;
    }
    // This is cleanup stuff because shit gets hairy IRL
    switch (this.order.asset.type.toLowerCase()) {
      case '':
        return this.defaultMIME;
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return this.order.asset.type.toLowerCase();
    }
  }

  getSize() {
    return this.order.getSize();
  }

  async startUpload() {
    const safeName = this.order.fileName.replace(/[^a-zA-Z0-9\._\-]/g, '_');
    const abortPromise = new Promise<void>(resolve => {
      this.aborter = resolve;
    });

    let response: {
      fields: {[field: string]: string};
      destination_url: string;
      headers: {[field: string]: string};
      method: 'POST' | 'PUT';
      url: string;
    };
    try {
      response = JSON.parse(
        await xhr({
          method: 'GET',
          url:
            this.order.assetEndpoint +
            urlTag`?type=${this.getType()}&name=${safeName}`,
          abortPromise,
        }),
      );
    } catch {
      this.error = gettext('Could not contact Pinecast');
      this.update();
      return;
    }

    const {
      fields,
      destination_url: finalContentURL,
      headers,
      method,
      url,
    } = response;
    this.finalContentURL = finalContentURL;

    const body = new FormData();
    for (let key in fields) {
      if (!fields.hasOwnProperty(key)) continue;
      body.append(key, fields[key]);
    }
    body.append('file', await this.getSendable());

    this.setUnloadHandler();

    try {
      await xhr({
        body,
        headers,
        method,
        url,

        noCSRFToken: true,
        abortPromise,
        onProgress: (progress, bytesLoaded) => {
          this.completed = bytesLoaded;
          this.progress = progress;
          this.update();
        },
      });
      this.progress = 100;
    } catch {
      this.error = gettext('There was a problem while uploading the file');
    } finally {
      this.clearUnloadHandler();
      this.update();
    }
  }

  async getSendable() {
    return this.order.asset.getAsBlob();
  }

  abort() {
    if (!this.aborter || this.progress === 100 || this.error) {
      return;
    }
    this.clearUnloadHandler();
    this.aborter();
    this.error = gettext('Aborted');
    this.update();
  }
}

export class AudioUploadManager extends UploadManager {
  get type() {
    return 'audio';
  }
  get defaultMIME() {
    return 'audio/mp3';
  }
}
export class ImageUploadManager extends UploadManager {
  get type() {
    return 'image';
  }
  get defaultMIME() {
    return 'image/jpeg';
  }
}
