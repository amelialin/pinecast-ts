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
