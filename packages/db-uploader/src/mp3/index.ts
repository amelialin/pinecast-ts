import {Buffer} from 'buffer';

import * as jsmediatags from '@mattbasta/jsmediatags';

import Asset from '../assets';

export async function getID3Tags(asset: Asset) {
  const arrayBuffer = await asset.getAsArrayBuffer();
  return new Promise<jsmediatags.MediaTags | null>((resolve, reject) => {
    jsmediatags.read(Buffer.from(arrayBuffer), {
      onSuccess: resolve,
      onError: (e: {type: string}) => {
        if (e && e.type && e.type === 'tagFormat') {
          resolve(null);
        } else {
          reject(e);
        }
      },
    });
  });
}

export function detectAudioSize(asset: Asset) {
  const asBlob = asset.getAsBlob();
  const u = URL.createObjectURL(asBlob);
  const audio = new Audio(u);
  let handled = false;
  return new Promise<number>((resolve, reject) => {
    try {
      const handler = () => {
        if (handled) {
          return;
        }
        if (audio.duration === Infinity || isNaN(audio.duration)) {
          return;
        }
        handled = true;
        URL.revokeObjectURL(u);
        resolve(audio.duration);
      };
      audio.addEventListener('loadedmetadata', handler);
      audio.addEventListener('durationchanged', handler);
      setTimeout(() => {
        handler();
        if (!handled) {
          reject();
        }
      }, 3000);
    } catch (e) {
      reject();
    }
  });
}
