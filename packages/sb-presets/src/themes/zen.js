import baseTheme from './_base';
import episodePageLayout from '../wrappers/episodePageLayout';
import gridItem from '../itemLayouts/grid/minimalGridItem';
import headerC from '../components/header-centeredFixed';
import linksLinkBar from '../components/links-linkBar';
import pagesTemplate from '../wrappers/pagesTemplate';
import paginationForwardBack from '../components/pagination-forwardBack-fixed';
import subheaderSubscribeLinks from '../components/subheader-subscribeLinks';
import textWrappedText from '../components/text-wrappedText';

import * as colors from './colors/zen.json';

export default {
  ...baseTheme,
  colors,
  fonts: {
    logo: 'Righteous',
    headings: 'Lato',
    body: 'Lato',
  },
  styling: {
    buttons: {
      borderRadius: 3,
      boxShadow: '0 2px 0.5px rgba(0, 0, 0, 0.15)',
      padding: '0.5em 1em',
      fontSize: 20,
    },
    page: {
      backgroundColor: 'background',
      fontSize: 14,
      padding: '0',
    },
  },
  options: {
    ...baseTheme.options,
    fixedWidthMax: '960px',
  },
  textStyles: {
    ...baseTheme.textStyles,
    logo: {
      ...baseTheme.textStyles.logo,
      color: 'foreground',
      fontFamily: 'logo',
      fontSize: 60,
      textTransform: 'uppercase',
    },
    pageHeading: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itemHeading: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 22,
      paddingLeft: 15,
      paddingRight: 15,
    },
  },

  layout: {
    header: [
      header({
        content: 'text',
        elementOptions: {
          bgColor: 'accent',
        },
        style: {
          padding: '200px 150px',
          '@mobile': {padding: '100px 5%'},
        },
      }),
      subheaderSubscribeLinks(),
    ],
    footer: [
      paginationForwardBack({
        nextText: 'Back in time',
        previousText: 'Onward to the Future',
      }),
      linksLinkBar({
        includes: ['pages', 'links'],
        elementOptions: {
          bgColor: 'secondaryAccent',
          fgColor: 'secondaryAccent',
          innerPadding: '20px 15px',
        },
      }),
      textWrappedText({
        text: ['podcast', 'copyright'],
        elementOptions: {innerPadding: '20px 15px'},
      }),
    ],

    body: {
      home: {
        firstPagePrefix: [],
        segments: [
          {
            type: 'grid',
            consumeCount: -1,

            alignment: 'center',
            itemSpacing: 30,
            maxItemsAcross: 3,
            padding: 0,

            elementLayout: gridItem({}),
          },
        ],
      },
      episode: episodePageLayout({
        elementOptions: {
          fgColor: 'secondaryBackground',
          innerPadding: 30,
          outerPadding: '0 5px',
        },
        ordering: ['title', 'image', 'player', 'subtitle', 'description'],
        style: {
          boxShadow: '0 2px 1px rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          marginBottom: 50,
        },
      }),
      page: pagesTemplate({
        style: {
          backgroundColor: 'secondaryBackground',
          boxShadow: '0 2px 1px rgba(0, 0, 0, 0.1)',
          marginBottom: 50,
        },
        elementOptions: {
          innerPadding: 30,
          outerPadding: 15,
        },
      }),
    },
  },
};