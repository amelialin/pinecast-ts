import * as React from 'react';
import {styled} from 'styletron-react';

import {backgroundImage} from '../../styleMixins';
import {TextStyle} from '../../primitives';
import ButtonRenderer from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import ImageRenderer from '../../common/image';
import TextRenderer from '../../common/text';


const OuterWrapper = styled('nav', ({bgColor}: {bgColor: string}) => ({
    backgroundColor: bgColor,
}));
const Wrapper = styled(
    'div',
    (
        {bgColor, justification, padding}:
        {
            bgColor: string,
            justification: 'center' | 'left' | 'right',
            padding: number | null
        }
    ) =>
        ({
            backgroundColor: bgColor,
            color: '#fff',
            margin: '0 auto',
            maxWidth: 960,
            padding: padding !== null ? `${padding}px 0` : '40px 0',
            textAlign: justification,
        })
);

const Divider = styled('span', () => ({
    display: 'inline-block',
    marginRight: 15,
}));

const Link = styled('a', () => ({
    fontSize: 14,
    marginRight: 15,
    textDecoration: 'none',

    ':hover': {
        textDecoration: 'underline',
    },
}));

type includeableTypes = 'links' | 'pages';
type includedTypes = ['links'] | ['pages'] | ['links', 'pages'] | ['pages', 'links'];

type dividerStyle = 'none' | 'bullet' | 'dash';

export default getsContext(
    (
        {layout}:
            {
                layout: {
                    bgColor: string,
                    fgColor: string,
                    divider: dividerStyle,
                    justification: 'center' | 'left' | 'right',
                    padding: number | null,
                    textStyle: TextStyle,

                    includes: includedTypes,
                },
            },
        {ctx}: {ctx: ComponentContext}
    ) =>
        <OuterWrapper bgColor={formatColor(layout.bgColor, ctx)}>
        <Wrapper bgColor={formatColor(layout.fgColor, ctx)} padding={layout.padding} justification={layout.justification}>
                {(layout.includes as Array<includeableTypes>).map((type: includeableTypes): Array<JSX.Element> => {
                    let linkEls: Array<JSX.Element>;
                    if (type === 'links') {
                        linkEls = ctx.data.links.map((link: {title: string, url: string}, i: number): JSX.Element =>
                            <Link
                                href={link.url}
                                key={`link:${i}`}
                                style={{color: formatColor(layout.textStyle.color, ctx)}}
                            >
                                <TextRenderer {...layout.textStyle} content={link.title} />
                            </Link>
                        );
                    } else {
                        linkEls = Object.values(ctx.data.pages).map((page: {title: string, slug: string}): JSX.Element =>
                            <Link
                                href={ctx.url('page', {slug: page.slug})}
                                key={`page:${page.slug}`}
                                style={{color: formatColor(layout.textStyle.color, ctx)}}
                            >
                                <TextRenderer {...layout.textStyle} content={page.title} />
                            </Link>
                        );
                    }
                    if (layout.divider === 'none') {
                        return linkEls;
                    }
                    let divChar: string;
                    switch (layout.divider) {
                        case 'bullet':
                            divChar = '•';
                            break;
                        case 'dash':
                            divChar = '—';
                            break;
                        default:
                            ((div: never): never => {
                                throw new Error(`unrecognized divider ${div}`);
                            })(layout.divider);
                    }
                    const divider = key => <Divider key={`div${key}`}>{divChar}</Divider>;
                    return linkEls.map((le, i) => i ? [divider(i), le] : [le]).reduce((acc, cur) => acc.concat(cur));
                }).reduce(
                    (acc: Array<JSX.Element>, cur: Array<JSX.Element>): Array<JSX.Element> => acc.concat(cur)
                )}
            </Wrapper>
        </OuterWrapper>
);
