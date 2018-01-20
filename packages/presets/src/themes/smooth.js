import baseTheme from './_base';
import simpleEpisodeTileLayout from '../itemLayouts/simpleEpisodeTileLayout';
import pagesTemplate from '../wrappers/pagesTemplate';
import snippetEpisodeItemLayout from '../episodePageLayouts/snippetEpisodeItemLayout';
import snippetEpisodePostLayout from '../itemLayouts/snippetEpisodePostLayout';
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
  },

  layout: {
    header: [
      header({
        content: 'text',
        showSubtitle: true,
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
      page: pagesTemplate(),
    },
  },
};
