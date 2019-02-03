import {primitives} from '@pinecast/sb-components';

import footerColumnsFixed from './footer-columnsFixed';
import headerCenteredFixed from './header-centeredFixed';
import headerPageLinkList from './header-pageLinkList';
import linksLinkBar from './links-linkBar';
import paginationForwardBack from './pagination-forwardBack-fixed';
import subheaderSubscribeLinks from './subheader-subscribeLinks';
import textWrappedText from './text-wrappedText';

const fixedWidthTemplate = {
  elementOptions: {
    name: 'Fixed-width module options',
    type: 'rootComponents.fixedWidth',
  },
};
const textAlignTemplate = {
  textAlign: {
    name: 'Text alignment',
    type: 'enum',
    options: [
      {label: 'Left', key: 'left'},
      {label: 'Center', key: 'center'},
      {label: 'Right', key: 'right'},
    ],
  },
};

type MetadataHash = {
  [component: string]: {
    name: string;
    description: string;
    type:
      | 'header'
      | 'footer'
      | 'links'
      | 'subscribeLinks'
      | 'pagination'
      | 'generic';
    func: () => primitives.ComponentLayout;
  };
};

export default {
  'footer.columnsFixed': {
    name: 'Footer columns',
    description:
      'Two columns of links, used for page, site, and subscribe links in a site footer',
    type: 'footer',
    func: footerColumnsFixed,

    schema: {
      // bgStyle: {
      //   name: 'Background style',
      //   type: 'enum',
      //   options: [
      //     {label: 'Darken', key: 'dark'},
      //     {label: 'Lighten', key: 'light'},
      //   ],
      // },
      col1Name: {
        name: 'Column 1 heading',
        type: 'text',
      },
      col1Items: {
        name: 'Column 1 contents',
        type: 'orderedSet',
        options: [
          {label: 'Site links', key: 'siteLinks'},
          {label: 'Pages', key: 'pageLinks'},
          {label: 'Subscribe links', key: 'subLinks'},
        ],
      },
      col2Name: {
        name: 'Column 2 heading',
        type: 'text',
      },
      col2Items: {
        name: 'Column 2 contents',
        type: 'orderedSet',
        options: [
          {label: 'Site links', key: 'siteLinks'},
          {label: 'Pages', key: 'pageLinks'},
          {label: 'Subscribe links', key: 'subLinks'},
        ],
      },
      ...fixedWidthTemplate,
    },
  },

  'header.centeredFixed': {
    name: 'Title header',
    description:
      'A generic header component, used to show the podcast title, logo, and subtitle',
    type: 'header',
    func: headerCenteredFixed,

    schema: {
      showSubtitle: {
        name: 'Show subtitle?',
        type: 'bool',
      },
      ...textAlignTemplate,
      ...fixedWidthTemplate,
    },
  },

  'header.pageLinkList': {
    name: 'Link header',
    description: 'A header component to show page and site links',
    type: 'header',
    func: headerPageLinkList,

    schema: {
      ...fixedWidthTemplate,
      ...textAlignTemplate,
      includes: {
        name: 'Included links',
        type: 'orderedSet',
        options: [
          {label: 'Site links', key: 'siteLinks'},
          {label: 'Pages', key: 'pageLinks'},
        ],
      },
    },
  },

  'links.linkBar': {
    name: 'Link bar',
    description: 'A link bar component for showing site and page links',
    type: 'links',
    func: linksLinkBar,

    schema: {
      includes: {
        name: 'Contents',
        type: 'orderedSet',
        options: [
          {label: 'Site links', key: 'links'},
          {label: 'Pages', key: 'pages'},
        ],
      },
      ...textAlignTemplate,
      ...fixedWidthTemplate,
    },
  },

  'pagination.forwardBack': {
    name: 'Pagination, forward/back',
    description:
      'Basic forward/backward pagination for navigating the episode list',
    type: 'pagination',
    func: paginationForwardBack,

    schema: {
      previousText: {
        name: '"Previous" button text',
        type: 'text',
      },
      nextText: {
        name: '"Next" button text',
        type: 'text',
      },
      ...fixedWidthTemplate,
    },
  },

  'subheader.subscribeLinks': {
    name: 'Subscribe links',
    description:
      'A subheader component for displaying links to subscribe to your podcast',
    type: 'subscribeLinks',
    func: subheaderSubscribeLinks,

    schema: {
      subscribeText: {
        name: 'Subscribe text',
        type: 'text',
      },
      ...fixedWidthTemplate,
    },
  },

  'text.wrappedText': {
    name: 'Podcast text',
    description: 'Display text about your podcast',
    type: 'generic',
    func: textWrappedText,

    schema: {
      text: {
        name: 'Content',
        type: 'enum',

        options: [
          {
            label: 'Copyright',
            key: 'copyright',
            value: ['podcast', 'copyright'],
          },
          {
            label: 'Description',
            key: 'description',
            value: ['podcast', 'description'],
          },
          {label: 'Podcast name', key: 'name', value: ['podcast', 'name']},
          {label: 'Subtitle', key: 'subtitle', value: ['podcast', 'subtitle']},
        ],
      },
      ...fixedWidthTemplate,
    },
  },
} as MetadataHash;
