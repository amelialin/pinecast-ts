export type Alignment = 'left' | 'center' | 'right';


export interface ComponentLayout {
    type: string,
    layout: any,
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
    resourceId: string,
    dimensions?: [number, number],
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


export interface EpisodeStyle {
    type: 'tile' | 'card',
    title: {
        position: 'hidden' | 'cover' | 'below' | 'above' | 'left' | 'right',
        style: TextStyle | null,
    },
};
export interface PostStyle {
    type: 'medium' | 'tumblr',
};
export interface LayoutConfig {
    type: string,
    consumeCount: number,
    itemStyle: EpisodeStyle | PostStyle,
    alignment: Alignment,
    bgColor?: string,
    fgColor?: string,
    padding?: string | number,

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
