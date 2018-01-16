import baseTheme from './_base';
import macroWrapper from '../wrappers/macro';
import snippetEpisodeItemLayout from '../episodePageLayouts/snippetEpisodeItemLayout';
import snippetEpisodePostLayout from '../itemLayouts/snippetEpisodePostLayout';
import header from '../components/header-minimal';
import paginationForwardBack from '../components/pagination-forwardBack';

import * as colors from './colors/clarity.json';

export default {
  ...baseTheme,
  colors,
  fonts: {
    logo: 'Archivo',
    headings: 'Archivo',
    body: 'Archivo',
  },
  styling: {
    ...baseTheme.styling,
    page: {
      backgroundColor: 'background',
      backgroundImage:
        'linear-gradient(90deg, var(--color-accent), var(--color-accent) 40px, transparent 40px)',
      fontSize: 14,
      padding: '0 20%',

      '@media (max-width: 700px)': {
        backgroundImage:
          'linear-gradient(90deg, var(--color-accent), var(--color-accent) 10px, transparent 10px)',
        padding: '0 20px',
      },
    },
  },
  textStyles: {
    ...baseTheme.textStyles,
    logo: {
      ...baseTheme.textStyles.logo,
      color: 'accent',
      fontFamily: 'logo',
      fontSize: 50,
    },
    navigationLinks: {
      ...baseTheme.textStyles.navigationLinks,
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'text',
      display: 'inline-block',
      fontSize: 16,
      lineHeight: '1.5em',
      marginRight: 20,
      whiteSpace: 'nowrap',

      ':last-child': {
        borderBottom: '0',
      },
    },
  },

  layout: {
    header: [
      {
        type: 'links.linkMount',
        layout: {},
        template: {
          elements: [
            {
              type: 'mount',
              props: {mount: 'pageLinks'},
            },
          ],
          tagName: 'nav',
          styles: {
            margin: '30px 0',
          },
        },
        tag: 'header.pageLinkList',
        tagMetadata: {},
      },
      header({content: 'text', showSubtitle: true}),
    ],
    footer: [
      paginationForwardBack({
        nextText: 'Older',
        previousText: 'Newer',
      }),
    ],

    body: {
      home: {
        firstPagePrefix: [],
        segments: [
          {
            type: 'stacked',
            consumeCount: -1,

            alignment: 'center',

            elementLayout: snippetEpisodePostLayout,
          },
        ],
      },
      episode: snippetEpisodeItemLayout,
      page: {
        markdown: macroWrapper({
          contents: [
            {
              type: 'block.text',
              tag_name: 'h1',
              textContent: ['title'],
              styles: {
                color: 'accent',
                fontSize: 30,
                marginBottom: 20,
              },
            },
            {
              type: 'block.text',
              textContent: ['body'],
              textContentFilter: 'markdown',
              styles: {
                lineHeight: 24,
              },
            },
          ],
        }),
        contact: macroWrapper({
          contents: [
            {
              type: 'block.text',
              tag_name: 'h1',
              textContent: ['title'],
              styles: {
                color: 'accent',
                fontSize: 30,
                marginBottom: 20,
              },
            },
            {
              type: 'func.narrowScope',
              elementOptions: {path: ['body']},
              children: [
                {
                  type: 'helper.page.contact',
                  elementOptions: {
                    alignX: 'center',
                    cellStyles: {
                      padding: 5,
                    },
                  },
                  styles: {
                    marginBottom: 20,
                    marginTop: 20,
                  },
                },
              ],
            },
          ],
        }),
        hosts: macroWrapper({
          contents: [
            {
              type: 'block.text',
              tag_name: 'h1',
              textContent: ['title'],
              styles: {
                color: 'accent',
                fontSize: 30,
                marginBottom: 20,
              },
            },
            {
              type: 'helper.page.hosts',
              elementOptions: {style: 'flow'},
              children: [
                {
                  type: 'layout.column',
                  elementOptions: {innerAlignX: 'center'},
                  children: [
                    {
                      type: 'image',
                      elementOptions: {
                        gravatar: ['email'],
                        round: 200,
                        square: 'element',
                      },
                      styles: {
                        width: 200,
                      },
                    },
                    {
                      type: 'block.text',
                      textContent: ['name'],
                      styles: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        lineHeight: 32,
                      },
                    },
                    {
                      type: 'helper.page.contact',
                      elementOptions: {
                        alignX: 'center',
                        cellStyles: {
                          padding: 5,
                        },
                      },
                      styles: {
                        marginBottom: 20,
                        marginTop: 20,
                      },
                    },
                  ],
                  styles: {
                    padding: 15,
                    textAlign: 'center',
                  },
                },
              ],
            },
          ],
        }),
      },
    },
  },
};
