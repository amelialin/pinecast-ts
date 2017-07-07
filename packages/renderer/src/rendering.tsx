import * as React from 'react';

import {
    Body,
    ComponentContext,
    ItemSourceContext,
    primitives,
    renderElement,
    renderLayout,
} from '@pinecast/sb-components/dist';

import ContextProvider from './ContextProvider';
import frame from './framing';


const simpleEpisodeTileLayout: primitives.ElementLayout = {
    elements: [
        {
            type: 'block.link',
            children: [
                {
                    type: 'image',
                    elementOptions: {alignX: 'center', square: 'element'},
                    props: {
                        alt: '',
                    },
                    propPaths: {
                        src: ['image_url'],
                    },
                    styles: {
                        height: 300,
                        width: 300,
                    },
                },
                {
                    type: 'block.text',
                    tagName: 'strong',

                    textContent: ['title'],

                    elementOptions: {
                        maxLines: 2,
                        maxLinesOnHover: 4,
                        maxLineFade: {color: 'background', height: 10},
                    },
                    styles: {
                        fontSize: 16,
                        fontWeight: 'normal',
                        lineHeight: 22,
                        marginBottom: 16,
                        marginTop: 16,
                        paddingLeft: 15,
                        paddingRight: 15,
                    },
                },
            ],
            props: {
                href: {name: 'episode', params: {id: ['id']}},
            },
        },
    ],
    tagName: 'article',
    styles: {
        display: 'block',
        textAlign: 'center',
    },
};

const cardEpisodeItemLayout: primitives.ElementLayout = {
    elements: [
        {
            type: 'image',
            elementOptions: {
                alignX: 'center',
                square: 'element',
            },
            propPaths: {src: ['image_url']},
            styles: {
                marginBottom: 15,
                maxWidth: 300,
            },
        },
        {
            type: 'block.player',
            propPaths: {src: ['player_url']},
        },
        {
            type: 'layout.column',
            tagName: 'hgroup',
            children: [
                {
                    type: 'block.text',
                    tagName: 'h1',
                    styles: {
                        fontFamily: 'headings',
                        fontSize: 18,
                        fontWeight: 'bold',
                        margin: 0,
                        textTransform: 'uppercase',
                    },
                    textContent: ['title'],
                },
                {
                    type: 'block.text',
                    tagName: 'h2',
                    styles: {
                        color: 'buttons',
                        fontFamily: 'headings',
                        fontSize: 18,
                        margin: 0,
                    },
                    textContent: ['title'],
                },
            ],
            styles: {
                padding: 10,
                textAlign: 'center',
            },
        },
        {
            type: 'layout.column',
            tagName: 'div',
            children: [
                {
                    type: 'block.text',
                    textContent: ['description'],
                    textContentFilter: 'raw',
                },
            ],
        },
    ],
    tagName: 'article',
    styles: {
        backgroundColor: 'foreground',
        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)',
        maxWidth: 800,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 30,
    },
};


const sample = {
    colors: {
        background: '#f0f0f0',
        accent: '#2196F3',
        text: '#000',
        buttons: '#009688',
        buttonsText: '#fff',

        foreground: '#fff',
        links: '#212121',

        secondaryAccent: '#96CFFF',
    },
    fonts: {
        logo: 'Righteous',
        headings: 'Lato',
        body: 'Lato',
    },

    layout: {
        header: [
            {
                type: 'header.centered',
                layout: {
                    bgColor: 'accent',
                    type: 'text',
                    text: {
                        color: 'foreground',
                        content: '$podcast.name',
                        font: 'logo',
                        size: 80,
                        transform: 'uppercase',
                    },
                },
            },
            {
                type: 'subheader.subscribeLinks',
                layout: {
                    // bgColor: 'base',
                    text: {
                        color: 'text',
                        content: 'Subscribe with',
                        size: 20,
                        weight: 500,
                    },
                },
            },
        ],
        footer: [
            {
                type: 'pagination.forwardBack',
                layout: {
                    nextText: 'Go Back in Time',
                    previousText: 'Onward to the Future',
                },
            },
            {
                type: 'footer.horizLinkBar',
                layout: {
                    bgColor: 'secondaryAccent',
                    fgColor: 'secondaryAccent',
                    divider: 'none',
                    justification: 'left',
                    padding: null,
                    textStyle: {
                        color: 'links',
                        size: 14,
                    },
                    includes: ['pages', 'links'],
                },
            },
            {
                type: 'footer.footerText',
                layout: {
                    bgColor: 'accent',
                    fgColor: 'accent',
                    justification: 'left',
                    padding: null,
                    text: {
                        color: 'foreground',
                        content: '$podcast.copyright',
                        size: 16,
                    },
                    includes: ['pages', 'links'],
                },
            },
        ],
        page: {
            backgroundColor: 'background',
            fontSize: 14,
            padding: '0',
        },
        body: {
            home: {
                firstPagePrefix: [
                ],
                segments: [
                    {
                        type: 'grid',
                        consumeCount: -1,

                        alignment: 'center' as primitives.Alignment,
                        itemSpacing: 30,
                        maxItemsAcross: 3,
                        padding: 0,
                        width: 990,

                        elementLayout: simpleEpisodeTileLayout,
                    },
                ],
            },
            episode: cardEpisodeItemLayout,
            page: {
                markdown: {
                    elements: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        },
                        {
                            type: 'block.text',
                            textContent: ['body'],
                            textContentFilter: 'markdown',
                        },
                    ],
                    tag_name: 'article',
                    styles: {
                        backgroundColor: 'foreground',
                        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)',
                        maxWidth: 800,
                        marginBottom: 50,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 30,
                    },
                } as primitives.ElementLayout,
                contact: {
                    elements: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        },
                        {
                            type: 'func.narrowScope',
                            elementOptions: {path: ['body']},
                            children: [
                                {
                                    type: 'helper.page.contact',
                                    elementOptions: {
                                        alignX: 'center',
                                        cellStyles: {
                                            padding: 5,
                                        },
                                    },
                                    styles: {
                                        marginBottom: 20,
                                        marginTop: 20,
                                    },
                                },
                            ],
                        },
                    ],
                    tag_name: 'article',
                    styles: {
                        backgroundColor: 'foreground',
                        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)',
                        maxWidth: 800,
                        marginBottom: 50,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 30,
                    },
                } as primitives.ElementLayout,
                hosts: {
                    elements: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        },
                        {
                            type: 'helper.page.hosts',
                            elementOptions: {style: 'flow'},
                            children: [
                                {
                                    type: 'layout.column',
                                    elementOptions: {innerAlignX: 'center'},
                                    children: [
                                        {
                                            type: 'image',
                                            elementOptions: {
                                                gravatar: ['email'],
                                                round: 200,
                                                square: 'element',
                                            },
                                            styles: {
                                                width: 200,
                                            },
                                        },
                                        {
                                            type: 'block.text',
                                            textContent: ['name'],
                                            styles: {
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                lineHeight: 32,
                                            },
                                        },
                                        {
                                            type: 'helper.page.contact',
                                            elementOptions: {
                                                alignX: 'center',
                                                cellStyles: {
                                                    padding: 5,
                                                },
                                            },
                                            styles: {
                                                marginBottom: 20,
                                                marginTop: 20,
                                            },
                                        },
                                    ],
                                    styles: {
                                        padding: 15,
                                        textAlign: 'center',
                                    },
                                },
                            ],
                        },
                    ],
                    tag_name: 'article',
                    styles: {
                        backgroundColor: 'foreground',
                        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)',
                        maxWidth: 800,
                        marginBottom: 50,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 30,
                    },
                } as primitives.ElementLayout,
            },
        },
    },

    styling: {
        buttons: {
            bgColor: 'buttons',
            paddingX: 1,
            paddingY: 0.5,
            roundedCorners: true,
            textColor: 'buttonsText',
            textSize: 20,
        },
    },
}


type URLResolver = (route: string, params?: {[param: string]: string}) => string;


function render(data: any, itemSource: ItemSourceContext<any> | null = null, children?: any | null): JSX.Element {
    return <ContextProvider
        ctx={data as ComponentContext}
        itemSource={itemSource}
    >
        <Body page={data.layout}>
            {children}
        </Body>
    </ContextProvider>;
}

function getItemSource(items: any[]): ItemSourceContext<any> {
    let yielded = 0;
    function* yielder() {
        for (; yielded < items.length; yielded += 1) {
            yield items[yielded];
        }
    }
    const inst = yielder();
    return {
        getItem: inst.next.bind(inst),
        hasNextItem: () => yielded + 1 < items.length,
        [Symbol.iterator]: inst[Symbol.iterator].bind(inst),
    };
}

function concatOnFirstPage<T>(page: number, firstPage: Array<T>, allPages: Array<T>): Array<T> {
    return page === 1 ? firstPage.concat(allPages) : allPages;
}

export async function renderHome(data: any, url: URLResolver): Promise<string> {
    return frame(
        render(
            {
                ...sample,
                data: data.site,
                resources: {
                    cover_art: data.site.site.cover_image_url,
                    logo: data.site.site.logo_url,
                },

                url,
                pagination: data.episodes,
            },
            getItemSource(data.episodes.items),
            renderLayout(
                concatOnFirstPage<primitives.LayoutConfig>(
                    data.episodes.page,
                    sample.layout.body.home.firstPagePrefix,
                    sample.layout.body.home.segments,
                ),
            ),
        ),
        data.site,
        {
            fonts: sample.fonts,
        },
        url,
    );
};
export async function renderEpisode(data: any, url: URLResolver): Promise<string> {
    return frame(
        render(
            {
                ...sample,
                data: data.site,
                resources: {
                    cover_art: data.site.site.cover_image_url,
                    logo: data.site.site.logo_url,
                },

                url,
            },
            null,
            renderElement(
                'episode',
                data.episode,
                sample.layout.body.episode
            )
        ),
        data.site,
        {
            fonts: sample.fonts,
            title: data.episode.title,
        },
        url,
    );
};
export async function renderPage(data: any, slug: string, url: URLResolver): Promise<string> {
    function renderBody(): JSX.Element {
        const page: primitives.Page = data.site.pages[slug];
        if (!page) {
            throw new Error(`Unknown page slug '${slug}'`);
        }
        switch (page.page_type) {
            case 'markdown':
                return renderElement(
                    'page.markdown',
                    page,
                    sample.layout.body.page.markdown
                );
            case 'hosts':
                const hostData = JSON.parse(page.body);
                return renderElement(
                    'page.hosts',
                    {...page, body: hostData},
                    sample.layout.body.page.hosts
                );
            case 'contact':
                const contactData = JSON.parse(page.body);
                return renderElement(
                    'page.contact',
                    {...page, body: contactData},
                    sample.layout.body.page.contact
                );
            default:
                throw new Error(`Unknown page type '${page.page_type}'`);
        }
    }
    return frame(
        render(
            {
                ...sample,
                data: data.site,
                resources: {
                    cover_art: data.site.site.cover_image_url,
                    logo: data.site.site.logo_url,
                },

                url,
            },
            null,
            renderBody()
        ),
        data.site,
        {
            fonts: sample.fonts,
            title: data.site.pages[slug].title,
        },
        url,
    );
};
