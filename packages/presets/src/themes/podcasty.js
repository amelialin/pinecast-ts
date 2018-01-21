import baseTheme from './_base';
import fullWidthImageLeftStackedItem from '../itemLayouts/stacked/fullWidthImageLeftStackedItem';
import heroFullWidthStackedItem from '../itemLayouts/stacked/heroFullWidthStackedItem';
import mosaicEpisodeItemLayout from '../episodePageLayouts/mosaicEpisodeItemLayout';
import header from '../components/header-centeredFixed';
import linksLinkBar from '../components/links-linkBar';
import pagesTemplate from '../wrappers/pagesTemplate';
import paginationForwardBack from '../components/pagination-forwardBack-fixed';
import subheaderSubscribeLinks from '../components/subheader-subscribeLinks';
import textWrappedText from '../components/text-wrappedText';

import * as colors from './colors/podcasty.json';

export default {
  ...baseTheme,
  colors,
  fonts: {
    logo: 'Pacifico',
    headings: 'Roboto',
    body: 'Roboto',
  },
  styling: {
    ...baseTheme.styling,
    page: {
      backgroundColor: 'background',
      fontSize: 12,
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
      color: 'foreground',
      fontFamily: 'logo',
      fontSize: 36,
    },
    pageHeading: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 30,
    },

    heroItemSecondary: {
      color: 'foreground',
      fontSize: 18,
      fontFamily: 'headings',
      fontWeight: '500',
      // textTransform: 'uppercase',
    },
    heroItemHeading: {
      color: 'foreground',
      fontFamily: 'headings',
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 30,
      textTransform: 'uppercase',
    },

    itemHeading: {
      color: 'inherit',
      fontFamily: 'headings',
      fontSize: 30,
      fontWeight: 600,
      lineHeight: 30,
      textDecoration: 'underline',
    },
    itemSubtitle: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 16,
      textTransform: 'uppercase',
    },
    itemSummary: {
      fontSize: 12,
      lineHeight: 18,
    },
  },

  layout: {
    header: [
      header({
        content: 'text',
        elementOptions: {
          bgColor: 'accent',
          fgColor: 'accent',
          innerPadding: '20px 0',
          lineHeight: '60px',
          outerPadding: '0 15px',
        },
        style: {
          textAlign: 'left',
        },
      }),
    ],
    footer: [
      paginationForwardBack({
        nextText: 'Back in time',
        previousText: 'Onward to the Future',
      }),
      textWrappedText({
        text: ['podcast', 'copyright'],
        elementOptions: {
          bgColor: 'secondaryAccent',
          fgColor: 'secondaryAccent',
          innerPadding: '100px 0',
        },
        style: {
          color: 'text',
          fontSize: 18,
          paddingLeft: 15,
          paddingRight: 15,
        },
      }),
      linksLinkBar({
        includes: ['pages', 'links'],
        elementOptions: {
          bgColor: 'accent',
          fgColor: 'accent',
          innerPadding: '40px 0',
        },
        layout: {
          textStyle: {
            color: 'foreground',
            size: 18,
          },
        },
        style: {
          paddingLeft: 15,
          paddingRight: 15,
          textAlign: 'center',
        },
      }),
    ],

    body: {
      home: {
        firstPagePrefix: [
          {
            type: 'stacked',
            consumeCount: 1,

            width: 'full',

            elementLayout: heroFullWidthStackedItem(),
          },
        ],
        firstPageAfterPrefix: [
          subheaderSubscribeLinks({style: {margin: '-50px 0 -30px'}}),
        ],
        segments: [
          {
            type: 'stacked',
            consumeCount: -1,

            alignment: 'center',
            padding: '30px 15px 0',
            width: 'var(--fixedWidthMax)',

            elementLayout: fullWidthImageLeftStackedItem({
              padding: '30px 20px',
            }),
          },
        ],
      },
      episode: mosaicEpisodeItemLayout,
      page: pagesTemplate({
        elementOptions: {
          innerPadding: 15,
        },
        style: {
          marginBottom: 30,
          marginTop: 30,
        },
      }),
    },
  },
};
