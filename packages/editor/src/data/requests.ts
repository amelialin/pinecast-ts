import xhr from './xhr';

const existingRequests = new Map<string, Promise<string>>();

export default function(url: string): Promise<string> {
    const existing = existingRequests.get(url);
    if (existing) {
        return existing;
    }

    const req = xhr(url);
    existingRequests.set(url, req);
    req.catch(() => existingRequests.delete(url));
    return req;
};
