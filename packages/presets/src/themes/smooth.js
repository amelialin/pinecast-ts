import baseTheme from './_base';
import episodePageLayout from '../wrappers/episodePageLayout';
import fullWidthImageLeftStackedItem from '../itemLayouts/stacked/fullWidthImageLeftStackedItem';
import gridItem from '../itemLayouts/grid/minimalGridItem';
import pagesTemplate from '../wrappers/pagesTemplate';
import header from '../components/header-centeredFixed';
import paginationForwardBack from '../components/pagination-forwardBack-fixed';

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
      padding: '40px 30px',
    },
  },

  textStyles: {
    ...baseTheme.textStyles,
    logo: {
      color: 'accent',
      fontFamily: 'logo',
      fontSize: 32,
      fontWeight: 600,
    },
    subtitle: {
      color: 'secondaryAccent',
      fontFamily: 'headings',
      fontSize: 20,
      fontWeight: 500,
    },
    navigationLinks: {
      ...baseTheme.textStyles.navigationLinks,
      borderBottom: '1px dotted rgba(0, 0, 0, 0.2)',
      color: 'text',
      display: 'inline-block',
      fontSize: 16,

      ':hover': {
        borderBottom: '1px dotted rgba(0, 0, 0, 0.4)',
      },
    },
    pageHeading: {
      color: 'accent',
      fontSize: 30,
      marginBottom: 20,
    },
    pageSubtitle: {
      color: 'text',
      fontSize: 24,
      marginBottom: 20,
      marginTop: -10,
    },
    pageSecondary: {
      color: 'text',
      fontFamily: 'headings',
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    heroItemHeading: {
      color: 'accent',
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    heroItemSubtitle: {
      fontSize: 20,
      fontWeight: 'normal',
      lineHeight: 32,
    },
    heroItemSummary: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: 22,
    },
    itemHeading: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 22,
    },
    itemSubtitle: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 22,
    },
    itemSummary: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: 22,
    },
  },

  layout: {
    header: [
      header({
        content: 'text',
        showSubtitle: true,
        elementOptions: {
          imageElementOptions: {
            alignX: 'left',
          },
        },
        style: {
          textAlign: 'left',
        },
      }),
      {
        type: 'links.linkMount',
        layout: {
          linkStyle: {
            marginRight: 20,
            whiteSpace: 'nowrap',
          },
        },
        template: {
          elements: [
            {
              type: 'layout.fixedWrapper',
              children: [
                {
                  type: 'mount',
                  props: {mount: 'pageLinks'},
                },
              ],
            },
          ],
          tagName: 'nav',
          styles: {
            margin: '30px 0 60px',
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

        styles: {
          padding: '0 0 40px',
        },
      }),
    ],

    body: {
      home: {
        firstPagePrefix: [
          {
            type: 'stacked',
            consumeCount: 1,

            alignment: 'center',
            width: 'var(--fixedWidthMax)',

            elementLayout: fullWidthImageLeftStackedItem({
              imageSize: 200,
              maxLinesOfSummary: 8,
              ordering: ['title', 'subtitle', 'player', 'summary'],
              padding: '0 0 0 20px',
              style: {
                backgroundColor: 'background',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                marginBottom: 50,
                paddingBottom: 20,
              },
              textStyleType: 'heroItem',
            }),
          },
        ],
        segments: [
          {
            type: 'grid',
            consumeCount: 8,

            itemSpacing: 40,
            maxItemsAcross: 10,
            padding: 0,

            alignment: 'center',

            elementLayout: gridItem({
              size: 150,
              style: {textAlign: 'left'},
              showSubtitle: true,
            }),
          },
        ],
      },
      episode: episodePageLayout({
        elementOptions: {
          fgColor: 'background',
          innerPadding: '30px 0',
        },
        innerElementOptions: {
          image: {
            alignX: null,
            square: 'background',
          },
        },
        innerStyling: {
          publish: {
            padding: 0,
          },
          image: {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: 400,
            marginLeft: 0,
            maxWidth: null,
            width: '100%',
          },
        },
        ordering: [
          'publish',
          'title',
          'subtitle',
          'image',
          'player',
          'description',
        ],
        style: {},
      }),
      page: pagesTemplate(),
    },
  },
};
