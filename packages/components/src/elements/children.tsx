import * as MarkdownIt from 'markdown-it';
import * as React from 'react';

import {Element} from '../primitives';
import {extractPath} from './extractor';
import {layoutElements} from './index';


function textContentFilter(content: string, filter: string): JSX.Element | string {
    switch (filter) {
        case 'raw':
            return <div
                dangerouslySetInnerHTML={{__html: content}}
            />;
        case 'markdown':
            const md = new MarkdownIt();
            return <div
                dangerouslySetInnerHTML={{__html: md.render(content)}}
            />;
        case null:
            return content;
        default:
            throw new Error(`Unrecognized text content filter ${filter}`);
    }
}


export function blockChildren(item: Object, element: Element): any {
    if (element.textContent) {
        const content = Array.isArray(element.textContent) ?
            String(extractPath(item, element.textContent)) :
            element.textContent;
        if (element.textContentFilter) {
            return textContentFilter(content, element.textContentFilter);
        } else {
            return content;
        }
    }

    if (element.children) {
        return layoutElements(item, element.children);
    }

    return null;
};
