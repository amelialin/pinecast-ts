import * as React from 'react';

import atom from '../../elements/atom';
import {ElementLayout, Link, Page} from '../../primitives';
import {ComponentContext, getsContext} from '../../componentContext';
import {MountProvider} from '../mounts';
import renderElements from '../../elements';
import TextRenderer from '../../common/text';

const Divider = atom('span', {
  display: 'inline-block',
  marginRight: 15,
});

const linkStyle = {
  marginRight: 15,
};

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
                  <TextRenderer
                    content={link.title}
                    data-link="true"
                    element="a"
                    extends={ctx.textStyles.navigationLinks}
                    href={link.url}
                    key={`link:${i}`}
                    style={linkStyle}
                  />
                ),
              );
            } else {
              linkEls = Object.values(ctx.data.pages).map(
                (page: Page): JSX.Element => (
                  <TextRenderer
                    content={page.title}
                    data-link="true"
                    element="a"
                    extends={ctx.textStyles.navigationLinks}
                    href={ctx.url('page', {slug: page.slug})}
                    key={`page:${page.slug}`}
                    style={linkStyle}
                  />
                ),
              );
            }
            if (!layout.divider || layout.divider === 'none') {
              return linkEls;
            }
            let divChar: string;
            switch (layout.divider) {
              case 'bullet':
                divChar = '·';
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
