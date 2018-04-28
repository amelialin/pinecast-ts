import baseTheme from './_base';
import episodePageLayout from '../wrappers/episodePageLayout';
import fullWidthImageCenterStackedItem from '../itemLayouts/stacked/fullWidthImageCenterStackedItem';
import pagesTemplate from '../wrappers/pagesTemplate';
import noImageStackedItem from '../itemLayouts/stacked/noImageStackedItem';
import header from '../components/header-centeredFixed';
import headerPageLinkList from '../components/header-pageLinkList';
import paginationForwardBack from '../components/pagination-forwardBack-fixed';

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
      color: 'accent',
      fontFamily: 'logo',
      fontSize: 50,
    },
    subtitle: {
      color: 'secondaryAccent',
      fontFamily: 'headings',
      fontSize: 20,
    },
    navigationLinks: {
      ...baseTheme.textStyles.navigationLinks,
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'text',
      display: 'inline-block',
      fontSize: 16,

      ':last-child': {
        borderBottom: '0',
      },
    },
    pageHeading: {
      color: 'accent',
      fontSize: 30,
      marginBottom: 20,
    },
    pageSubtitle: {
      color: 'secondaryAccent',
      fontSize: 20,
      marginBottom: 20,
      marginTop: -10,
    },
    pageSecondary: {
      color: 'text',
      fontFamily: 'headings',
      fontWeight: 500,
      textTransform: 'uppercase',
    },

    itemHeading: {
      color: 'accent',
      fontSize: 30,
      fontWeight: 400,
    },
    itemSubtitle: {
      color: 'secondaryAccent',
      fontSize: 20,
    },
    itemSummary: {
      lineHeight: 20,
    },
    itemSecondary: {
      color: 'text',
      fontFamily: 'headings',
      fontSize: 13,
      fontWeight: 600,
      padding: '10px 0',
      textTransform: 'uppercase',
    },
  },

  layout: {
    header: [
      headerPageLinkList({
        linkStyle: {
          lineHeight: '1.5em',
        },
      }),
      header({
        content: 'text',
        showSubtitle: true,
        elementOptions: {
          imageElementOptions: {
            alignX: 'left',
          },
          outerPadding: '0 0 50px',
        },
        textAlign: 'left',
      }),
    ],
    footer: [
      paginationForwardBack({
        nextText: 'Older',
        previousText: 'Newer',
      }),
    ],

    body: {
      home: {
        firstPagePrefix: [
          {
            type: 'stacked',
            consumeCount: 1,

            alignment: 'center',

            elementLayout: fullWidthImageCenterStackedItem({
              ordering: [
                'date',
                'title',
                'subtitle',
                'image',
                'summary',
                'readMore',
              ],
              style: {
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: 'text',
                marginBottom: 20,
                paddingBottom: 30,
              },
            }),
          },
        ],
        segments: [
          {
            type: 'stacked',
            consumeCount: 10,

            bgColor: 'background',
            alignment: 'center',

            elementLayout: noImageStackedItem(),
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
            alignX: 'left',
          },
        },
        innerStyling: {
          publish: {
            padding: 0,
          },
          image: {},
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
