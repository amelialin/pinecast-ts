import * as PropTypes from 'prop-types';


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
        pages: {title: string, slug: string, page_type: string, created: string, body: string}[],
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
            episode: any[],
            post: any[],
            page: {[type: string]: any[]},
        },
        footer: any[],
        page: {
            backgroundColor: string,
            padding: string | number,
        },
    },

    // For generating URLs
    url: (name: string, params?: {[param: string]: string}) => string,
};

export function getsContext(toAnnotate: any) {
    toAnnotate.contextTypes = {
        ...toAnnotate.contextTypes,
        ctx: PropTypes.object.isRequired,
    };
    return toAnnotate;
};