export interface Tag {
  uuid: string;
  name: string;
  description: string | null;
}

export interface Advertisement {
  uuid: string;
  created: Date;
  discontinued: boolean;

  name: string;
  offer_code: string | null;

  duration: number;
  start_date: Date;
  end_date: Date;

  tags: Array<Tag>;

  priority: number;
  place_only_once: boolean;

  for_podcasts: Array<string>;
}

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
