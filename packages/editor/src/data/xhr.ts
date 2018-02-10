export interface Options {
  body?: string | FormData | null;
  headers?: {[name: string]: string};
  method?: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE';
  url: string;

  abortPromise?: Promise<void> | null;
  onProgress?: (percent: number) => void;
}
export default function(args: Options | string): Promise<string> {
  let url;
  let headers: Options['headers'] = {};
  let method = 'GET';
  let body: Options['body'] = null;
  let abortPromise: Options['abortPromise'] = null;
  let onProgress: Options['onProgress'] | null = null;

  if (typeof args === 'string') {
    url = args;
    method = 'GET';
  } else {
    body = args.body || null;
    if (args.headers) {
      headers = args.headers;
    }
    if (args.method) {
      method = args.method;
    }
    url = args.url;
    if (args.onProgress) {
      onProgress = args.onProgress || null;
    }
  }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      xhr.withCredentials = true;
    }
    if (headers) {
      Object.entries(headers).forEach(([name, value]) => {
        xhr.setRequestHeader(name, value);
      });
    }
    xhr.send(body);

    if (abortPromise) {
      abortPromise.then(() => xhr.abort());
    }

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(`Status code ${xhr.status}`);
        return;
      }
      resolve(xhr.responseText);
    });
    xhr.addEventListener('error', () => {
      console.warn(xhr);
      reject();
    });

    if (onProgress) {
      xhr.upload.addEventListener('progress', e => {
        if (!e.lengthComputable) {
          return;
        }
        if (!onProgress) {
          return;
        }
        onProgress(Math.min(e.loaded / e.total * 100, 99.9));
      });
    }
  });
}
