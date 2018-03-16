import footerColumnsFixed from './footer-columnsFixed';
import headerCenteredFixed from './header-centeredFixed';
import headerPageLinkList from './header-pageLinkList';
import linksLinkBar from './links-linkBar';
import paginationForwardBack from './pagination-forwardBack-fixed';
import subheaderSubscribeLinks from './subheader-subscribeLinks';
import textWrappedText from './text-wrappedText';

export default {
  'footer.columnsFixed': {
    name: 'Footer columns',
    description:
      'Two columns of links, used for page, site, and subscribe links in a site footer',
    type: 'footer',
    func: footerColumnsFixed,

    schema: {
      col1Name: {
        name: 'Column 1 heading',
        type: 'text',
      },
      col1Items: {
        name: 'Column 1 contents',
        type: 'orderedSet',
        options: [
          {name: 'Site links', value: 'siteLinks'},
          {name: 'Pages', value: 'pages'},
          {name: 'Subscribe links', value: 'subscribeLinks'},
        ],
      },
      col2Name: {
        name: 'Column 2 heading',
        type: 'text',
      },
      col1Items: {
        name: 'Column 2 contents',
        type: 'orderedSet',
        options: [
          {name: 'Site links', value: 'siteLinks'},
          {name: 'Pages', value: 'pages'},
          {name: 'Subscribe links', value: 'subscribeLinks'},
        ],
      },
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
    },
  },

  'header.pageLinkList': {
    name: 'Link header',
    description: 'A header component to show page and site links',
    type: 'header',
    func: headerPageLinkList,

    schema: {
      fixed: {
        name: 'Fixed width',
        type: 'bool',
      },
      openInNewWindow: {
        name: 'Open links in new tab',
        type: 'bool',
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
          {name: 'Site links', value: 'links'},
          {name: 'Pages', value: 'pages'},
        ],
      },
      openInNewWindow: {
        name: 'Open links in new tab',
        type: 'bool',
      },
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
            name: 'Copyright',
            value: ['podcast', 'copyright'],
            key: 'copyright',
          },
          {
            name: 'Description',
            value: ['podcast', 'description'],
            key: 'description',
          },
          {name: 'Podcast name', value: ['podcast', 'name'], key: 'name'},
          {name: 'Subtitle', value: ['podcast', 'subtitle'], key: 'subtitle'},
        ],
      },
    },
  },
};
