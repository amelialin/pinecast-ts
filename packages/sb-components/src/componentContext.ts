import * as PropTypes from 'prop-types';

import {CSS} from '@pinecast/styles';

import * as primitives from './primitives';

export interface ComponentContext {
  colors: {[key: string]: string};
  fonts: {
    logo: string;
    headings: string;
    body: string;
  };
  textStyles: {
    logo?: CSS;
    subtitle?: CSS;
    pageHeading?: CSS;
    pageSubtitle?: CSS;
    pageSecondary?: CSS;
    navigationLinks?: CSS;
    itemHeading?: CSS;
    itemSubtitle?: CSS; // Prominent sub-title on an inline item
    itemSecondary?: CSS; // Less prominent metadata on an inline item
    itemSummary?: CSS;
    heroItemHeading?: CSS;
    heroItemSubtitle?: CSS; // Prominent sub-title on the hero post
    heroItemSecondary?: CSS; // Less prominent metadata on the hero post
    heroItemSummary?: CSS;
    // footerText?: CSS; // Copyright, etc.
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
    buttons: CSS;
    page: primitives.PageStyle;
  };
  options: {
    embedTheme?: 'minimal' | 'thick' | 'slim';
    fixedWidthMax?: string | null;
    rootFlexibleHeight?: boolean;
    defaultConsumeCount: number;
  };

  // For generating URLs
  url: (name: string, params?: {[param: string]: string}) => string;
  pagination?: primitives.Paginatable;
}

export function getsContext<T>(
  toAnnotate: React.ComponentType<T> & {
    contextTypes?: PropTypes.ValidationMap<any>;
  },
): React.ComponentType<T> {
  toAnnotate.contextTypes = {
    ...toAnnotate.contextTypes,
    ctx: PropTypes.object.isRequired,
  };
  return toAnnotate;
}
