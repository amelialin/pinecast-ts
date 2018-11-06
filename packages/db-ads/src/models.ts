export interface Tag {
  uuid: string;
  name: string;
  description: string | null;
}

interface BaseAdvertisement {
  name: string;
  offer_code: string | null;
  duration: number;

  // start_date: Date;
  // end_date: Date | null;

  priority: number;
  place_only_once: boolean;
}

export interface MutableAdvertisement extends BaseAdvertisement {
  tags: Array<string>;
  for_podcasts: Array<string>;
}
export interface Advertisement extends BaseAdvertisement {
  uuid: string;
  created: Date;
  discontinued: boolean;

  tags: Array<Tag>;
  for_podcasts: Array<Podcast>;

  placements: number;
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

export interface Podcast {
  name: string;
  slug: string;
  requires_reprocessing: boolean;
}

export interface Episode {
  uuid: string;
  title: string;
  publish: string;
}

export interface BreakPlaceholder {
  uuid: string;
  episode: Episode;
  timecode: number;
  max_duration: number;
  tags: Array<Tag>;
}
