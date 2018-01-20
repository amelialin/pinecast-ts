import baseTheme from './_base';
import pagesTemplate from '../wrappers/pagesTemplate';
import snippetEpisodeItemLayout from '../episodePageLayouts/snippetEpisodeItemLayout';
import snippetEpisodePostLayout from '../itemLayouts/snippetEpisodePostLayout';
import header from '../components/header-centeredFixed';
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
  },

  layout: {
    header: [
      {
        type: 'links.linkMount',
        layout: {
          linkStyle: {
            marginRight: 20,
            lineHeight: '1.5em',
            whiteSpace: 'nowrap',
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
      header({
        content: 'text',
        showSubtitle: true,
        style: {
          marginBottom: 50,
          textAlign: 'left',
        },
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
      page: pagesTemplate(),
    },
  },
};
