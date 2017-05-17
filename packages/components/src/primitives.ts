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
