import * as PropTypes from 'prop-types';

import * as primitives from './primitives';

export interface ComponentContext {
  colors: {[key: string]: string};
  fonts: {
    logo: string;
    headings: string;
    body: string;
  };
  resources: {[key: string]: string};
  data: {
    site: {
      analytics_id: string | null;
      itunes_banner: string | null;

      itunes_url: string | null;
      google_play_url: string | null;
      stitcher_url: string | null;
    };
    podcast: {
      slug: string;
      name: string;
      subtitle: string;
      description: string;
      copyright: string;
    };
    features: {[feature: string]: boolean};
    links: Array<primitives.Link>;
    pages: {[slug: string]: primitives.Page};
  };

  layout: primitives.PageLayout;

  styling: {
    buttons: primitives.ButtonStyle;
    page: primitives.PageStyle;
  };
  options: {
    embedTheme?: 'minimal' | 'thick' | 'slim';
    rootFlexibleHeight?: boolean;
    defaultConsumeCount: number;
  };

  // For generating URLs
  url: (name: string, params?: {[param: string]: string}) => string;
  pagination?: primitives.Paginatable;
}

export function getsContext<T>(toAnnotate: T & {contextTypes?: Object}): T {
  toAnnotate.contextTypes = {
    ...toAnnotate.contextTypes,
    ctx: PropTypes.object.isRequired,
  };
  return toAnnotate;
}
