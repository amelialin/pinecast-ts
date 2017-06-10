import * as React from 'react';

import {
    Body,
    ComponentContext,
    ItemSourceContext,
    primitives,
    renderEpisode as renderEpisodeComponent,
    renderLayout,
} from '@pinecast/sb-components/dist';

import ContextProvider from './ContextProvider';
import frame from './framing';


const sample = {
    colors: {
        base: 'papayawhip',
        accent: 'coral',
        accent2: '#2196F3',
        background: '#f0f0f0',
        white: '#fff',
        buttons: '#009688',
        links: '#212121',

        footerLinks: '#CDDDE4',
        footer: '#607D8B',
    },
    fonts: {
        logo: 'Righteous',
        headings: 'Verdana',
        body: 'Verdana',
    },

    layout: {
        header: [
            // {
            //     type: 'header.simple',
            //     layout: {
            //         bgColor: 'base',
            //         type: 'text',
            //         text: {
            //             color: 'accent',
            //             content: '$podcast.name',
            //             font: 'logo',
            //             size: 60,
            //             transform: 'none',
            //         },
            //     },
            // },
            {
                type: 'header.centered',
                layout: {
                    bgColor: 'accent2',
                    type: 'text',
                    text: {
                        color: 'white',
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
                        color: '#000',
                        content: 'Subscribe with',
                        size: 20,
                        weight: 500,
                    },
                    buttonStyle: {
                        bgColor: 'buttons',
                        paddingX: 1,
                        paddingY: 0.5,
                        roundedCorners: true,
                        textColor: 'white',
                        textSize: 20,
                    },
                },
            },
        ],
        footer: [
            {
                type: 'footer.horizLinkBar',
                layout: {
                    bgColor: 'footerLinks',
                    fgColor: 'footerLinks',
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
                    bgColor: 'footer',
                    fgColor: 'footer',
                    justification: 'left',
                    padding: null,
                    text: {
                        color: '#fff',
                        content: '$podcast.copyright',
                        size: 16,
                    },
                    includes: ['pages', 'links'],
                },
            },
        ],
        page: {
            backgroundColor: 'background',
            padding: '0',
        },
        body: {
            home: {
                firstPagePrefix: [],
                segments: [
                    {
                        type: 'grid',
                        consumeCount: -1,

                        alignment: 'center' as primitives.Alignment,
                        itemStyle: {
                            type: 'tile',
                        } as primitives.EpisodeStyle,
                        padding: '0 0 40px',
                        width: 960,
                    },
                ],
            },
            blog: {},
            episode: [],
            post: [],
            page: {},
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
            },
            getItemSource(data.episodes.items),
            renderLayout(
                concatOnFirstPage<primitives.LayoutConfig>(
                    data.episodes.page,
                    sample.layout.body.home.firstPagePrefix,
                    sample.layout.body.home.segments,
                ),
                renderEpisodeComponent,
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
        ),
        data.site,
        {
            fonts: sample.fonts,
            title: data.episode.title,
        },
        url,
    );
};
export async function renderBlog(data: any, url: URLResolver): Promise<string> {
    return frame(
        render({
            ...sample,
            data: data.site,
            resources: {
                cover_art: data.site.site.cover_image_url,
                logo: data.site.site.logo_url,
            },

            url,
        }, getItemSource(data.posts.items)),
        data.site,
        {
            fonts: sample.fonts,
        },
        url,
    );
};
export async function renderBlogPost(data: any, url: URLResolver): Promise<string> {
    return frame(
        render({
            ...sample,
            data: data.site,
            resources: {
                cover_art: data.site.site.cover_image_url,
                logo: data.site.site.logo_url,
            },

            url,
        }),
        data.site,
        {
            fonts: sample.fonts,
            title: data.post.title,
        },
        url,
    );
};
export async function renderPage(data: any, slug: string, url: URLResolver): Promise<string> {
    return frame(
        render({
            ...sample,
            data: data.site,
            resources: {
                cover_art: data.site.site.cover_image_url,
                logo: data.site.site.logo_url,
            },

            url,
        }),
        data.site,
        {
            fonts: sample.fonts,
            title: data.site.pages[slug].title,
        },
        url,
    );
};
