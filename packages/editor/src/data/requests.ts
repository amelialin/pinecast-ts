import xhr from './xhr';

const existingRequests = new Map<string, Promise<string>>();

export default function(url: string): Promise<string> {
  const existing = existingRequests.get(url);
  if (existing) {
    return existing;
  }

  const req = xhr(url);
  existingRequests.set(url, req);
  return req.catch(err => {
    existingRequests.delete(url);
    return Promise.reject(err);
  });
}

export function clearCache(url?: string) {
  if (!url) {
    existingRequests.clear();
  } else {
    existingRequests.delete(url);
  }
}
