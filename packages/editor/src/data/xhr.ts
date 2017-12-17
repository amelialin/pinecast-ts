export interface Options {
  body?: string | FormData | null;
  headers?: {[name: string]: string};
  method?: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE';
  url: string;
}
export default function(args: Options | string): Promise<string> {
  let url;
  let headers;
  let method;
  let body;

  if (typeof args === 'string') {
    url = args;
    headers = null;
    method = 'GET';
    body = null;
  } else {
    body = args.body || null;
    headers = args.headers || null;
    method = args.method || 'GET';
    url = args.url;
  }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;
    if (headers) {
      Object.entries(headers).forEach(([name, value]) => {
        xhr.setRequestHeader(name, value);
      });
    }
    xhr.send(body);

    xhr.addEventListener('load', () => {
      if (xhr.status !== 200) {
        reject(`Status code ${xhr.status}`);
        return;
      }
      resolve(xhr.responseText);
    });
    xhr.addEventListener('error', () => {
      reject();
    });
  });
}
