import {Buffer} from 'buffer';

import {ExifImage} from 'exif';

import Asset from '../assets';

type ExifOutput = {
  exif: {
    ColorSpace?: number;
  };
  image: {
    Orientation?: number;
    XResolution?: number;
    YResolution?: number;
  };
};

export async function getExifData(asset: Asset): Promise<ExifOutput> {
  const buff = Buffer.from(await asset.getAsArrayBuffer());
  return new Promise<ExifOutput>((resolve, reject) => {
    new ExifImage({image: buff}, (err: string | null, exifData: ExifOutput) => {
      if (err) {
        if (/no exif segment found/i.exec(err)) {
          resolve({image: {}, exif: {}});
          return;
        }
        if (/The Exif data is not valid/i.exec(err)) {
          resolve({image: {}, exif: {}});
          return;
        }
        reject(err);
      } else {
        resolve(exifData);
      }
    });
  });
}
