import baseTheme from './_base';
import simpleEpisodeTileLayout from '../itemLayouts/simpleEpisodeTileLayout';
import macroWrapper from '../wrappers/macro';
import snippetEpisodeItemLayout from '../episodePageLayouts/snippetEpisodeItemLayout';
import snippetEpisodePostLayout from '../itemLayouts/snippetEpisodePostLayout';
import header from '../components/header-minimal';
import paginationForwardBack from '../components/pagination-forwardBack';

import * as colors from './colors/smooth.json';

export default {
  ...baseTheme,
  colors,
  fonts: {
    logo: 'Raleway',
    headings: 'Inconsolata',
    body: 'Inconsolata',
  },
  styling: {
    buttons: {
      borderRadius: 4,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '0.5em 1em',
      fontSize: 16,
    },
    page: {
      backgroundColor: 'background',
      fontSize: 14,
      padding: '80px 30px',
    },
  },

  layout: {
    header: [
      header({
        content: 'text',
        showSubtitle: true,
        subtitleStyle: {
          color: 'secondaryAccent',
          fontWeight: 500,
        },
        titleStyle: {fontWeight: 600},
      }),
      {
        type: 'links.linkMount',
        layout: {
          linkStyle: {
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'text',
            display: 'inline-block',
            fontSize: 18,
            lineHeight: '1.5em',
            marginRight: 20,
            textDecoration: 'none',
            whiteSpace: 'nowrap',

            ':hover': {
              textDecoration: 'underline',
            },
            ':last-child': {
              borderBottom: '0',
            },
          },
        },
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
            type: 'grid',
            consumeCount: 6,

            alignment: 'center',

            elementLayout: simpleEpisodeTileLayout,
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
