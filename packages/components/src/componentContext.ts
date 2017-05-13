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
            disqus_url: string,
            analytics_id: string,
            itunes_banner: string,
        },
        podcast: {
            slug: string,
            name: string,
            subtitle: string,
            copyright: string,
        },
        features: {[feature: string]: boolean},
        links: {title: string, url: string}[],
        pages: {title: string, slug: string, page_type: string, created: string, body: string}[],
        posts: {title: string, slug: string, publish: string}[],
    },

    // For generating URLs
    url: (name: string, ...args: any[]) => string,
};

export function getsContext(toAnnotate: any) {
    toAnnotate.contextTypes = {
        ctx: PropTypes.object,
    };
    return toAnnotate;
};
