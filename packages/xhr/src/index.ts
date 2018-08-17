let CSRF_TOKEN = '';
if (typeof document !== 'undefined') {
  const csrfMeta = document.querySelector('meta[name=csrf]');
  if (csrfMeta) {
    const csrfToken = csrfMeta.getAttribute('content');
    if (csrfToken) {
      CSRF_TOKEN = csrfToken;
    }
  }
}

export interface Options {
  body?: string | FormData | null;
  headers?: {[name: string]: string};
  method?: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE';
  url: string;

  noCSRFToken?: boolean;
  abortPromise?: Promise<void> | null;
  onProgress?: (percent: number, bytesLoaded: number) => void;
}

type Result<T> = Promise<T> & {xhr: XMLHttpRequest};

// Overloading options
function xhr(args: Options | string): Result<string>;
function xhr(
  args: Options | string,
  responseType: 'arraybuffer',
): Result<ArrayBuffer>;

function xhr<T>(
  args: Options | string,
  responseType?: 'arraybuffer',
): Result<T> {
  let url: string;
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
    if (!args.noCSRFToken) {
      headers['X-CSRFToken'] = CSRF_TOKEN;
    }
  }

  const xhr = new XMLHttpRequest();
  const out = new Promise<T>((resolve, reject) => {
    if (responseType) {
      xhr.responseType = responseType;
    }
    if (onProgress) {
      xhr.upload.addEventListener(
        'progress',
        e => {
          console.log(e);
          if (!e.lengthComputable) {
            return;
          }
          if (!onProgress) {
            return;
          }
          onProgress(Math.min(e.loaded / e.total * 100, 99.9), e.loaded);
        },
        false,
      );
    }

    xhr.open(method, url, true);
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      xhr.withCredentials = true;
    }
    if (headers) {
      Object.entries(headers).forEach(([name, value]) => {
        xhr.setRequestHeader(name, value);
      });
    }
    xhr.send(body || undefined);

    if (abortPromise) {
      abortPromise.then(() => xhr.abort());
    }

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(`Status code ${xhr.status}`);
        return;
      }
      if (responseType) {
        resolve(xhr.response);
      } else {
        resolve(xhr.responseText as any);
      }
    });
    xhr.addEventListener('error', () => {
      console.warn(xhr);
      reject();
    });
  });

  (out as any).xhr = xhr;
  return out as any;
}

export default xhr;
