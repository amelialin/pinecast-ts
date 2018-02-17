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
  email?: string;
  twitter?: string;
  instagram?: string;
  twitch?: string;
  youtube?: string;
  facebook?: string;
  url?: string;
}
export type HostsBody = Array<Host>;
export interface Page {
  title: string;
  slug: string;
  page_type: 'markdown' | 'hosts' | 'contact';
  created: string;
  body: string | ContactBody | HostsBody;
}
