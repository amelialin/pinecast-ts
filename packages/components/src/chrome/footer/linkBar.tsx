import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {backgroundImage} from '../../styleMixins';
import {ElementLayout, Link, Page, TextStyle} from '../../primitives';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import {MountProvider} from '../mounts';
import renderElements from '../../elements';
import TextRenderer from '../../common/text';

const Divider = styled('span', {
  display: 'inline-block',
  marginRight: 15,
});

const Link = styled(
  'a',
  {
    fontSize: 14,
    marginRight: 15,
    textDecoration: 'none',

    ':hover': {
      textDecoration: 'underline',
    },
  },
  {'data-link': 'true'},
);

type includeableType = 'links' | 'pages';
type includedTypes =
  | ['links']
  | ['pages']
  | ['links', 'pages']
  | ['pages', 'links'];

type dividerStyle = 'none' | 'bullet' | 'dash';

export default getsContext(
  (
    {
      layout,
      template,
    }: {
      layout: {
        divider?: dividerStyle;
        textStyle: TextStyle;
        includes: includedTypes;
      };
      template: ElementLayout;
    },
    {ctx}: {ctx: ComponentContext},
  ) => (
    <MountProvider
      children={renderElements('mount', ctx.data, template)}
      mounts={{
        links: (layout.includes as Array<includeableType>)
          .map((type: includeableType): Array<JSX.Element> => {
            let linkEls: Array<JSX.Element>;
            if (type === 'links') {
              linkEls = ctx.data.links.map(
                (link: Link, i: number): JSX.Element => (
                  <Link
                    href={link.url}
                    key={`link:${i}`}
                    style={{color: formatColor(layout.textStyle.color, ctx)}}
                  >
                    <TextRenderer {...layout.textStyle} content={link.title} />
                  </Link>
                ),
              );
            } else {
              linkEls = Object.values(
                ctx.data.pages,
              ).map((page: Page): JSX.Element => (
                <Link
                  href={ctx.url('page', {slug: page.slug})}
                  key={`page:${page.slug}`}
                  style={{color: formatColor(layout.textStyle.color, ctx)}}
                >
                  <TextRenderer {...layout.textStyle} content={page.title} />
                </Link>
              ));
            }
            if (!layout.divider || layout.divider === 'none') {
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
            const divider = key => (
              <Divider key={`div${key}`}>{divChar}</Divider>
            );
            return linkEls
              .map((le, i) => (i ? [divider(i), le] : [le]))
              .reduce((acc, cur) => acc.concat(cur), []);
          })
          .reduce((acc: Array<JSX.Element>, cur: Array<JSX.Element>): Array<
            JSX.Element
          > => acc.concat(cur)),
      }}
    />
  ),
);
