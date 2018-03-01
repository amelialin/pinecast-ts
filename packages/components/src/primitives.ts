import {CSS} from '@pinecast/sb-styles';

export type Alignment = 'left' | 'center' | 'right';

export interface ComponentLayout {
  type: string;
  layout: any;
  template?: ElementLayout;
  tag: string;
}
export interface PageLayout {
  header: Array<ComponentLayout>;
  footer: Array<ComponentLayout>;

  body: {
    home: {
      firstPagePrefix: Array<LayoutConfig>;
      firstPageAfterPrefix?: Array<ComponentLayout>;
      segments: Array<LayoutConfig>;
    };
    episode: ElementLayout;
    page: {
      markdown: ElementLayout;
      contact: ElementLayout;
      hosts: ElementLayout;
    };
  };
}

export interface PageStyle extends React.CSSProperties {
  backgroundColor: string;
  fontSize: number;
  padding: string;
}

export interface Image {
  alt: string;
  resourceId?: string;
  src?: string;
  dimensions?: [number | string, number | string];
}

export interface BackgroundImage {
  resourceId: string;
  repeat: 'none' | 'repeat';
  sizing:
    | 'center'
    | 'cover'
    | 'contain'
    | 'left bottom'
    | 'right bottom'
    | 'left top'
    | 'right top';
}

export type DataPath = Array<string>;
export type AbstractURL = {
  name: string;
  params?: {[param: string]: Array<string>};
};
export interface StyleableElement {
  elementOptions?: {[option: string]: any};
  extendsStyles?: Array<string>;
  props?: {
    href?: AbstractURL;
    [prop: string]: any;
  };
  propPaths?: {[prop: string]: DataPath};
  styles?: CSS;
}
export interface Element extends StyleableElement {
  type:
    | 'block.link'
    | 'block.logo'
    | 'block.player'
    | 'block.text'
    | 'image'
    | 'image.background'
    | 'layout.inline'
    | 'layout.column'
    | 'layout.fixedWrapper'
    | 'layout.row'
    | 'mount'
    | 'helper.page.contact'
    | 'helper.page.hosts'
    | 'func.narrowScope';
  tagName?: string;

  textContent?: DataPath | string;
  textContentFilter?: 'markdown' | 'stripMarkdown' | 'raw' | null;

  children?: Array<Element | InlineElement>;
}
export interface InlineElement extends StyleableElement {
  type: 'button' | 'icon' | 'span';
}
export interface ElementLayout {
  tagName?: string;
  elements: Array<Element>;
  styles?: CSS;

  // For use by the editor to store extra information about trees of elements
  tag?: string;
  tagMetadata?: any;
}
export interface LayoutConfig {
  type: string;
  consumeCount: number;
  elementLayout: ElementLayout;
  alignment: Alignment;
  bgColor?: string;
  fgColor?: string;
  padding?: string | number;
  itemSpacing: number;
  maxItemsAcross: number;

  width: 'full' | number;
}

export interface Episode {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  audio_type: string;
  publish: string;
  description: string;
  player_url: string;
}
export interface Page {
  title: string;
  slug: string;
  page_type: 'markdown' | 'hosts' | 'contact';
  created: string;
  body: string;
}
export interface Link {
  title: string;
  url: string;
}

export interface Paginatable {
  page: number;
  has_previous: boolean;
  has_next: boolean;
  has_other_pages: boolean;
}
