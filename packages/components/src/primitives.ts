import {CSSProperties} from 'react';


export type Alignment = 'left' | 'center' | 'right';


export interface ComponentLayout {
    type: string,
    layout: any,
    template?: ElementLayout,
};
export interface PageLayout {
    header: Array<ComponentLayout>,
    footer: Array<ComponentLayout>,

    page: Page,
};

export interface Page {
    backgroundColor: string,
    padding: string,
};


export interface TextStyle {
    color: string,
    font?: string,
    size?: number, // in px
    transform?: 'none' | 'uppercase' | 'lowercase',
    weight?: 100 | 200 | 300 | 400 | 500 | 600,
};
export interface Text extends TextStyle {
    content: string,
};

export interface Image {
    alt: string,
    resourceId?: string,
    src?: string,
    dimensions?: [number | string, number | string],
};

export interface BackgroundImage {
    resourceId: string,
    repeat: 'none' | 'repeat',
    sizing: 'center' | 'cover' | 'contain' | 'left bottom' | 'right bottom' | 'left top' | 'right top',
};

export interface ButtonStyle {
    bgColor: string,
    paddingX: number, // em
    paddingY: number, // em
    roundedCorners: boolean,
    textColor: string,
    textSize?: number,
};


export type DataPath = Array<string>;
export type AbstractURL = {name: string, params?: {[param: string]: Array<string>}};
export type StyledCSSProperties = CSSProperties & {
    ':active'?: CSSProperties,
    ':focus'?: CSSProperties,
    ':hover'?: CSSProperties,
    ':visited'?: CSSProperties,

    ':after'?: CSSProperties & {content: string},
    ':before'?: CSSProperties & {content: string},
    ':active:before'?: CSSProperties & {content: string},
    ':focus:before'?: CSSProperties & {content: string},
    ':hover:before'?: CSSProperties & {content: string},
    ':active:after'?: CSSProperties & {content: string},
    ':focus:after'?: CSSProperties & {content: string},
    ':hover:after'?: CSSProperties & {content: string},
};
export interface StyleableElement {
    elementOptions?: {[option: string]: any},
    props?: {
        href?: AbstractURL,
        [prop: string]: any,
    },
    propPaths?: {[prop: string]: DataPath},
    styles?: StyledCSSProperties,
}
export interface Element extends StyleableElement {
    type:
        'block.link' |
        'block.player' |
        'block.text' |
        'image' |
        'layout.inline' |
        'layout.column' |
        'layout.fixedWrapper' |
        'layout.row' |
        'mount' |
        'helper.page.contact' |
        'helper.page.hosts' |
        'func.narrowScope',
    tagName?: string,

    textContent?: DataPath | string,
    textContentFilter?: 'markdown' | 'stripMarkdown' | 'raw' | null,

    children?: Array<Element | InlineElement>,
};
export interface InlineElement extends StyleableElement {
    type: 'button' | 'icon' | 'span',
};
export interface ElementLayout {
    tagName?: string,
    elements: Array<Element>,
    styles?: StyledCSSProperties,

    // For use by the editor to store extra information about trees of elements
    tag?: string,
    tagMetadata?: any,
};
export interface LayoutConfig {
    type: string,
    consumeCount: number,
    elementLayout: ElementLayout,
    alignment: Alignment,
    bgColor?: string,
    fgColor?: string,
    padding?: string | number,
    itemSpacing: number,
    maxItemsAcross: number,

    width: 'full' | number,
};

export interface Episode {
    id: string,
    title: string,
    subtitle: string,
    image_url: string,
    audio_type: string,
    publish: string,
    description: string,
    player_url: string,
};
export interface Page {
    title: string,
    slug: string,
    page_type: 'markdown' | 'hosts' | 'contact',
    created: string,
    body: string,
};

export interface Paginatable {
    page: number,
    has_previous: boolean,
    has_next: boolean,
    has_other_pages: boolean,
    next_page_number: number,
    previous_page_number: number,
};
