import baseTheme from './_base';
import episodePageLayout from '../wrappers/episodePageLayout';
import fullWidthImageLeftStackedItem from '../itemLayouts/stacked/fullWidthImageLeftStackedItem';
import gridItem from '../itemLayouts/grid/minimalGridItem';
import pagesTemplate from '../wrappers/pagesTemplate';
import header from '../components/header-centeredFixed';
import headerPageLinkList from '../components/header-pageLinkList';
import paginationForwardBack from '../components/pagination-forwardBack-fixed';

import colors from './colors/smooth.json';

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
      lineHeight: '32px',
    },
    heroItemSubtitle: {
      fontSize: 20,
      fontWeight: 'normal',
      lineHeight: '32px',
    },
    heroItemSummary: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: '22px',
    },
    itemHeading: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: '22px',
    },
    itemSubtitle: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: '22px',
    },
    itemSummary: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: '22px',
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
        textAlign: 'left',
      }),
      headerPageLinkList({
        style: {
          margin: '30px 0 60px',
        },
      }),
    ],
    footer: [
      paginationForwardBack({
        nextText: 'Older',
        previousText: 'Newer',

        elementOptions: {
          innerPadding: '0 0 40px',
        },
      }),
    ],

    body: {
      home: {
        firstPagePrefix: [
          {
            type: 'stacked',
            consumeCount: 1,

            bgColor: 'background',
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
            minimumItemWidth: 120,

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
