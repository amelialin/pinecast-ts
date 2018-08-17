import Asset from '../assets';
import {AudioUploadManager, ImageUploadManager} from './manager';
import ManagementComponent from './ManagementComponent';

export default class UploadOrder {
  podcast: string;
  title: string;
  fileName: string;
  type: string;
  asset: Asset;

  manager: AudioUploadManager | ImageUploadManager | null;

  constructor(
    podcast: string,
    title: string,
    fileName: string,
    type: string,
    asset: Asset,
  ) {
    this.podcast = podcast;
    this.title = title;
    this.fileName = fileName;
    this.type = type;
    this.asset = asset;

    this.manager = null;
  }

  getManager(component: ManagementComponent) {
    if (this.type === 'audio') {
      return (this.manager = new AudioUploadManager(component, this));
    } else {
      return (this.manager = new ImageUploadManager(component, this));
    }
  }

  getSize() {
    return this.asset.size;
  }

  getURL(): string {
    if (!this.manager) {
      throw new Error('Manager not created yet');
    }
    if (!this.manager.finalContentURL) {
      throw new Error('Manager not yet gotten final URL');
    }
    return this.manager.finalContentURL;
  }

  abort() {
    if (!this.manager) {
      return;
    }
    this.manager.abort();
  }
}
