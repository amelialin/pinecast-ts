import {init as initToBlob} from 'canvas-to-blob';
initToBlob();

import Asset from '../assets';
import {getExifData} from './exif';

export async function decodeImage(asset: Asset) {
  const blob = await asset.getAsBlob();
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const u = URL.createObjectURL(blob);
    const img = new Image();
    img.src = u;
    img.onload = () => {
      URL.revokeObjectURL(u);
      resolve(img);
    };
    img.onerror = err => {
      reject(err);
      URL.revokeObjectURL(u);
    };
  });
}

export function reformatImage(
  img: HTMLImageElement,
  quality: number = 0.6,
  minWidth: number = 0,
  maxWidth: number = Infinity,
): Promise<Asset> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const sourceSize = Math.min(img.height, img.width);
    const size = Math.max(Math.min(sourceSize, maxWidth), minWidth);
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
      img,
      img.width / 2 - sourceSize / 2,
      img.height / 2 - sourceSize / 2,
      sourceSize,
      sourceSize,
      0,
      0,
      size,
      size,
    );
    canvas.toBlob(
      (resizedBlob: Blob) => {
        const fr = new FileReader();
        fr.onload = e => {
          const result = fr.result as ArrayBuffer;
          resolve(Asset.fromArrayBuffer(result, 'asset.jpg', 'image/jpeg'));
        };
        fr.onerror = reject;
        fr.readAsArrayBuffer(resizedBlob);
      },
      'image/jpeg',
      quality,
    );
  });
}

export type ImageProblem =
  | 'dpi'
  | 'color_space'
  | 'orientation'
  | 'min_size'
  | 'max_size'
  | 'not_square';

export async function detectImageProblems(
  asset: Asset,
): Promise<Array<ImageProblem>> {
  const i = await decodeImage(asset);

  const problems: Array<ImageProblem> = [];
  if (i.width < 1400 || i.height < 1400) {
    problems.push('min_size');
  } else if (i.width > 3000 || i.height > 3000) {
    problems.push('max_size');
  } else if (i.width !== i.height) {
    problems.push('not_square');
  }

  if (asset.type !== 'image/jpeg') {
    return problems;
  }

  const exifData = await getExifData(asset);
  if (
    (exifData.image.XResolution && exifData.image.XResolution !== 72) ||
    (exifData.image.YResolution && exifData.image.YResolution !== 72)
  ) {
    problems.push('dpi');
  }

  if (exifData.exif.ColorSpace && exifData.exif.ColorSpace !== 1) {
    problems.push('color_space');
  }

  if (exifData.image.Orientation && exifData.image.Orientation !== 1) {
    problems.push('orientation');
  }

  return problems;
}
