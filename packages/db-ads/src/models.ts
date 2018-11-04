export interface Tag {
  uuid: string;
  name: string;
  description: string | null;
}

export interface MutableAdvertisement {
  name: string;
  offer_code: string | null;

  duration: number;
  // start_date: Date;
  // end_date: Date | null;

  tags: Array<string>;

  priority: number;
  place_only_once: boolean;

  for_podcasts: Array<string>;
  discontinued: boolean;
}
export type Advertisement = MutableAdvertisement & {
  uuid: string;
  created: Date;
  discontinued: boolean;

  tags: Array<Tag>;
  for_podcasts: Array<Podcast>;
};

export interface InjectedEpisode {
  uuid: string;
  title: string;
  dashboard_url: string;
}

export interface AdvertisementPlacement {
  ad_uuid: string;
  episode: InjectedEpisode;
  matched_by_tag: Tag;
}

export interface Podcast {
  name: string;
  slug: string;
}
