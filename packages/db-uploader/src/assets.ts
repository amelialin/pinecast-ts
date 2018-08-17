import xhr from '@pinecast/xhr';

export function decodeFileObject(fileObj: Blob): Promise<ArrayBuffer> {
  if (typeof FileReader === 'undefined') {
    return Promise.reject(new Error('No FileReader available'));
  }
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result as ArrayBuffer);
    };
    fr.onerror = err => reject(err);
    fr.readAsArrayBuffer(fileObj);
  });
}

export default class Asset {
  private arrayBuffer: ArrayBuffer | null = null;
  private blob: Blob | null = null;
  private isDummy: boolean;
  private dummySize: number | null = null;

  static fromFile(file: File): Asset {
    return new Asset(file.name, file.type, null, file);
  }
  static fromBlob(blob: Blob, name: string): Asset {
    return new Asset(name, blob.type, null, blob);
  }
  static fromArrayBuffer(
    buffer: ArrayBuffer,
    name: string,
    type: string,
  ): Asset {
    return new Asset(name, type, buffer, null);
  }
  static async downloadFromURL(url: string): Promise<Asset> {
    const req = xhr(url, 'arraybuffer');
    const response = await req;
    return Asset.fromArrayBuffer(
      response,
      url.split('/').pop()!,
      req.xhr.getResponseHeader('content-type') || 'application/octet-string',
    );
  }

  static makeDummy(name: string, type: string, size: number) {
    return new Asset(name, type, null, null, size);
  }

  private constructor(
    naem: string,
    type: string,
    arrayBuffer: ArrayBuffer | null,
    blob: Blob | null,
    size?: number,
  ) {
    this.isDummy = !arrayBuffer && !blob;
    if (this.isDummy) {
      if (size == null) {
        throw new Error('Missing dummy asset size');
      }
      this.dummySize = size;
    }

    this.name = name;
    this.type = type;
    this.arrayBuffer = arrayBuffer;
    this.blob = blob;
  }

  async getAsArrayBuffer(): Promise<ArrayBuffer> {
    if (this.isDummy) {
      throw new Error('Cannot convert dummy asset');
    }
    if (this.arrayBuffer) {
      return this.arrayBuffer;
    }
    if (!this.blob) {
      throw new Error('unreachable');
    }
    this.arrayBuffer = await decodeFileObject(this.blob);
    return this.arrayBuffer;
  }
  getAsBlob(): Blob {
    if (this.isDummy) {
      throw new Error('Cannot convert dummy asset');
    }
    if (this.blob) {
      return this.blob;
    }
    if (!this.arrayBuffer) {
      throw new Error('unreachable');
    }
    this.blob = new Blob([this.arrayBuffer], {type: this.type});
    return this.blob;
  }

  type: string;
  name: string;

  get size(): number {
    if (this.isDummy) {
      return this.dummySize!;
    }
    if (this.arrayBuffer) {
      return this.arrayBuffer.byteLength;
    }
    if (this.blob) {
      return this.blob.size;
    }
    throw new Error('Missing asset source');
  }
}
