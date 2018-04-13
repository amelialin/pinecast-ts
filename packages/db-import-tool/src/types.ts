export interface Feed {
  name: string;
  slug?: string;
  homepage: string;
  description: string;
  language: string;
  copyright: string;
  author_name: string;
  subtitle: string;
  is_explicit: boolean;
  cover_image: string;
  categories: Array<string>;

  episode_release_type: 'serial' | 'episodic' | null;
  items: Array<FeedItem>;

  readonly __ignored_items: number;
}

interface FeedItem {
  title: string;
  guid: string;
  description: string;
  subtitle: string;
  publish: string;
  image_url: string;
  duration: number;
  audio_url: string;
  audio_size: number;
  audio_type: string;
  copyright: string;
  license: string;
  season: number;
  season_episode: number;
  episode_type: 'full' | 'trailer' | 'bonus';
}
