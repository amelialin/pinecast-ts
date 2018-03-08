import footerColumnsFixed from './footer-columnsFixed';
import headerCenteredFixed from './header-centeredFixed';
import headerPageLinkList from './header-pageLinkList';
import linksLinkBar from './links-linkBar';
import paginationForwardBack from './pagination-forwardBack-fixed';
import subheaderSubscribeLinks from './subheader-subscribeLinks';

export default {
  'footer.columnsFixed': {
    name: 'Footer columns',
    type: 'footer',
    func: footerColumnsFixed,

    schema: {
      col1Name: {
        name: 'Column 1 heading',
        type: 'text',
      },
      col1Items: {
        name: 'Column 1 contents',
        type: 'set',
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
        type: 'set',
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
    type: 'header',
    func: headerPageLinkList,

    schema: {
      fixed: {
        name: 'Fixed width',
        type: 'bool',
      },
    },
  },
  'links.linkBar': {
    name: 'Link bar',
    type: 'links',
    func: linksLinkBar,

    schema: {
      col1Items: {
        name: 'Contents',
        type: 'set',
        options: [
          {name: 'Site links', value: 'links'},
          {name: 'Pages', value: 'pages'},
        ],
      },
    },
  },
  'pagination.forwardBack': {
    name: 'Pagination, forward/back',
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
    type: 'subscribeLinks',
    func: subheaderSubscribeLinks,

    schema: {
      subscribeText: {
        name: 'Subscribe text',
        type: 'text',
      },
    },
  },
};
