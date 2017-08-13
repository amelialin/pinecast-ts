import * as React from 'react';

import {
    Body,
    ComponentContext,
    ItemSourceContext,
    primitives,
    renderBlock,
    renderElement,
    renderLayout,
} from '@pinecast/sb-components/dist';
import * as presets from '@pinecast/sb-presets';

import ContextProvider from './ContextProvider';
import frame from './framing';


type URLResolver = (route: string, params?: {[param: string]: string}) => string;


function render(data: ComponentContext, itemSource: ItemSourceContext<any> | null = null, children?: any | null): JSX.Element {
    return <ContextProvider ctx={data} itemSource={itemSource}>
        <Body children={children} />
    </ContextProvider>;
}

function getItemSource<T>(items: Array<T>): ItemSourceContext<T> {
    let yielded = 0;
    function* yielder(): Iterator<T> {
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

function getContextFromResources(
    func: (context: ComponentContext, resources: any, ...args: Array<any>) => Promise<string>
): (data: any, ...args: Array<any>) => Promise<string> {
    return async (data: any, ...args: Array<any>): Promise<string> => {
        const context: ComponentContext = {
            ...presets.themes.panther,
            data: data.site,
            resources: {
                cover_art: data.site.site.cover_image_url,
                logo: data.site.site.logo_url,
            },

            url: args[args.length - 1],
            pagination: data.episodes,
        };
        return func(context, data, ...args);
    };
}

export const renderHome = getContextFromResources(
    async function renderHome(context: ComponentContext, resources: any, url: URLResolver): Promise<string> {
        context.pagination = resources.episodes;
        return frame(
            render(
                context,
                getItemSource(resources.episodes.items),
                [
                    resources.episodes.page === 1 ?
                        renderLayout(context.layout.body.home.firstPagePrefix) :
                        [],
                    resources.episodes.page === 1 ?
                        renderBlock(context.layout.body.home.firstPageAfterPrefix || []) :
                        [],
                    renderLayout(context.layout.body.home.segments),
                ].filter(x => x),
            ),
            context.data,
            {context},
            url,
        );
    }
);
export const renderEpisode = getContextFromResources(
    async function renderEpisode(context: ComponentContext, resources: any, url: URLResolver): Promise<string> {
        return frame(
            render(
                context,
                null,
                renderElement(
                    'episode',
                    resources.episode,
                    context.layout.body.episode
                )
            ),
            context.data,
            {
                context,
                title: resources.episode.title,
            },
            url,
        );
    }
);
export const renderPage = getContextFromResources(
    async function renderPage(context: ComponentContext, resources: any, slug: string, url: URLResolver): Promise<string> {
        function renderBody(): JSX.Element {
            const page: primitives.Page = context.data.pages[slug];
            if (!page) {
                throw new Error(`Unknown page slug '${slug}'`);
            }
            switch (page.page_type) {
                case 'markdown':
                    return renderElement(
                        'page.markdown',
                        page,
                        context.layout.body.page.markdown
                    );
                case 'hosts':
                    const hostData = JSON.parse(page.body);
                    return renderElement(
                        'page.hosts',
                        {...page, body: hostData},
                        context.layout.body.page.hosts
                    );
                case 'contact':
                    const contactData = JSON.parse(page.body);
                    return renderElement(
                        'page.contact',
                        {...page, body: contactData},
                        context.layout.body.page.contact
                    );
                default:
                    throw new Error(`Unknown page type '${page.page_type}'`);
            }
        }
        return frame(
            render(context, null, renderBody()),
            context.data,
            {
                context,
                title: context.data.pages[slug].title,
            },
            url,
        );
    }
);
