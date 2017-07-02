import * as PropTypes from 'prop-types';

import {ButtonStyle, ElementLayout, Page, Paginatable} from './primitives';


export interface ComponentContext {
    colors: {[key: string]: string},
    fonts: {
        logo: string,
        headings: string,
        body: string,
    },
    resources: {[key: string]: string},
    data: {
        site: {
            disqus_url: string | null,
            analytics_id: string | null,
            itunes_banner: string | null,

            itunes_url: string | null,
            google_play_url: string | null,
            stitcher_url: string | null,
        },
        podcast: {
            slug: string,
            name: string,
            subtitle: string,
            description: string,
            copyright: string,
        },
        features: {[feature: string]: boolean},
        links: Array<{title: string, url: string}>,
        pages: {[slug: string]: Page},
        posts: Array<{title: string, slug: string, publish: string}>,
    },

    layout: {
        header: any[],
        body: {
            home: {
                firstPagePrefix: any[],
                segments: any[],
            },
            blog: {
                firstPagePrefix: any[],
                segments: any[],
            },
            episode: ElementLayout,
            post: ElementLayout,
            page: {[type: string]: ElementLayout},
        },
        footer: any[],
        page: {
            backgroundColor: string,
            padding: string | number,
        },
    },

    styling: {
        buttons: ButtonStyle,
    },

    // For generating URLs
    url: (name: string, params?: {[param: string]: string}) => string,
    pagination?: Paginatable,
};

export function getsContext<T>(toAnnotate: T & {contextTypes?: Object}): T {
    toAnnotate.contextTypes = {
        ...toAnnotate.contextTypes,
        ctx: PropTypes.object.isRequired,
    };
    return toAnnotate;
};
