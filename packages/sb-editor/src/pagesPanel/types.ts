export interface ContactBody {
  email?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  twitch?: string;
  youtube?: string;
}
export interface Host {
  name: string;
  email?: Array<string>;
  twitter?: Array<string>;
  instagram?: Array<string>;
  twitch?: Array<string>;
  youtube?: Array<string>;
  facebook?: Array<string>;
  url?: Array<string>;
}
export type HostsBody = Array<Host>;
export interface Page {
  title: string;
  slug: string;
  page_type: 'markdown' | 'hosts' | 'contact';
  created?: string;
  body: string | HostsBody | ContactBody;
}
