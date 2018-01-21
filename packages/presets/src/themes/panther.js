import baseTheme from './_base';
import fullWidthImageCenterStackedItem from '../itemLayouts/stacked/fullWidthImageCenterStackedItem';
import header from '../components/header-centeredFixed';
import pagesTemplate from '../wrappers/pagesTemplate';
import slabEpisodeItemLayout from '../episodePageLayouts/slabEpisodeItemLayout';
import paginationForwardBackFixed from '../components/pagination-forwardBack-fixed';

import * as colors from './colors/panther.json';

export default {
  ...baseTheme,
  colors,
  fonts: {
    logo: 'Lobster',
    headings: 'Lato',
    body: 'Lato',
  },
  styling: {
    ...baseTheme.styling,
    page: {
      backgroundColor: 'background',
      fontSize: 14,
      padding: '40px 15px',
    },
  },
  options: {
    ...baseTheme.options,
    fixedWidthMax: '960px',
  },

  textStyles: {
    ...baseTheme.textStyles,
    logo: {
      color: 'foreground',
      fontFamily: 'logo',
      fontSize: 40,
    },
    subtitle: {
      color: 'foreground',
      fontFamily: 'headings',
      fontSize: 20,
    },
    pageHeading: {
      fontSize: 30,
      fontWeight: 500,
      marginBottom: 30,
    },

    itemHeading: {
      color: 'text',
      fontSize: 30,
      fontWeight: 400,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    itemSecondary: {
      color: 'text',
      fontFamily: 'logo',
      fontSize: 16,
      fontWeight: 600,
      opacity: 0.4,
      padding: '20px 0',
      textAlign: 'center',
    },
    itemSubtitle: {
      color: 'secondaryAccent',
      fontSize: 20,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
  },

  layout: {
    header: [
      header({
        content: 'text',
        showSubtitle: true,
        style: {
          backgroundColor: 'accent',
          padding: '100px 0',
        },
      }),
    ],
    footer: [
      paginationForwardBackFixed({
        fgColor: 'secondaryBackground',
        nextText: 'Back in time',
        previousText: 'Onward to the Future',
      }),
      {
        type: 'links.linkMount',
        layout: {
          linkStyle: {
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'foreground',
            display: 'block',
            lineHeight: '2.5em',
            textDecoration: 'underline',

            ':last-child': {
              borderBottom: '0',
            },
          },
        },
        template: {
          elements: [
            {
              type: 'layout.fixedWrapper',
              elementOptions: {
                maxWidth: 'var(--fixedWidthMax)',
              },
              children: [
                {
                  type: 'layout.column',
                  children: [
                    {
                      type: 'block.text',
                      textContent: 'Menu',
                      styles: {
                        fontFamily: 'logo',
                        fontSize: 28,
                        marginBottom: 20,
                      },
                    },
                    {
                      type: 'mount',
                      props: {mount: 'pageLinks'},
                    },
                    {
                      type: 'mount',
                      props: {mount: 'siteLinks'},
                    },
                  ],
                  styles: {
                    flex: '1 1',
                    padding: '0 40px',
                  },
                },
                {
                  type: 'layout.column',
                  children: [
                    {
                      type: 'block.text',
                      textContent: 'Subscribe',
                      styles: {
                        fontFamily: 'logo',
                        fontSize: 28,
                        marginBottom: 20,
                      },
                    },
                    {
                      type: 'mount',
                      props: {mount: 'subLinks'},
                    },
                  ],
                  styles: {
                    flex: '1 1',
                    padding: '0 40px',
                  },
                },
              ],
              styles: {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'foreground',
                display: 'flex',
                fontSize: 14,
                padding: '20px 0 50px',
                textAlign: 'center',
              },
            },
          ],
          tagName: 'footer',
          styles: {
            marginBottom: 40,
          },
        },
        tag: 'footer.columnsFixed',
        tagMetadata: {
          cols: ['page,site', 'sub'],
        },
      },
    ],

    body: {
      home: {
        firstPagePrefix: [],
        segments: [
          {
            type: 'stacked',
            consumeCount: -1,

            alignment: 'center',
            fgColor: 'secondaryBackground',
            width: 'var(--fixedWidthMax)',

            elementLayout: fullWidthImageCenterStackedItem({
              showBorder: true,
              style: {
                backgroundColor: 'secondaryBackground',
                margin: '0 15px',
                padding: 40,
                ':nth-child(n+1)': {
                  borderTop: '1px solid #eee',
                },
              },
            }),
          },
        ],
      },
      episode: slabEpisodeItemLayout,
      page: pagesTemplate({
        elementOptions: {fgColor: 'secondaryBackground'},
        style: {padding: 40},
      }),
    },
  },
};
