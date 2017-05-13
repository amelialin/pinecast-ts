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


export interface Text {
    color: string,
    content: string,
    font: string,
    size: number, // in px
    transform: 'none' | 'uppercase' | 'lowercase',
};

export interface Image {
    alt: string,
    resourceId: string,
    dimensions?: [number, number],
};

export interface BackgroundImage {
    resourceId: string,
    sizing: 'center' | 'cover' | 'contain' | 'left bottom' | 'right bottom' | 'left top' | 'right top',
};
