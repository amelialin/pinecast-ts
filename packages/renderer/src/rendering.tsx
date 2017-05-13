import * as React from 'react';

import {Body, ComponentContext} from '@pinecast/sb-components/dist';

import ContextProvider from './ContextProvider';


function render(data: any): JSX.Element {
    return <ContextProvider
        ctx={{
            colors: {
                base: 'papayawhip',
                accent: 'coral',
                background: '#555',
            },
            fonts: {
                logo: 'Helvetica',
                headings: 'Times',
                body: 'Verdana',
            },
            resources: {},
            data: data.site,

            url: () => '',
        } as ComponentContext}
    >
        <Body
            page={{
                header: [
                    {
                        type: 'header.simple',
                        layout: {
                            bgColor: 'base',
                            type: 'text',
                            text: {
                                color: 'accent',
                                content: '$podcast.name',
                                font: 'logo',
                                size: 60,
                                transform: 'none',
                            },
                        },
                    }
                ],
                footer: [],
                page: {
                    backgroundColor: 'background',
                    padding: '0',
                },
            }}
        />
    </ContextProvider>;
}

export function renderHome(data: object): JSX.Element {
    return render(data);
};
export function renderEpisode(data: object): JSX.Element {
    return render(data);
};
export function renderBlog(data: object): JSX.Element {
    return render(data);
};
export function renderBlogPost(data: object): JSX.Element {
    return render(data);
};
export function renderPage(data: object, slug: string): JSX.Element {
    return render(data);
};
