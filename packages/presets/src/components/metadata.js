import headerCenteredFixed from './header-centeredFixed';
import headerPageLinkList from './header-pageLinkList';
import linksLinkBar from './links-linkBar';
import paginationForwardBack from './pagination-forwardBack-fixed';
import subheaderSubscribeLinks from './subheader-subscribeLinks';

export default {
  'header.centeredFixed': {
    name: 'Title header',
    type: 'header',
    func: headerCenteredFixed,
  },
  'header.pageLinkList': {
    name: 'Link header',
    type: 'header',
    func: headerPageLinkList,
  },
  'links.linkBar': {
    name: 'Link bar',
    type: 'links',
    func: linksLinkBar,
  },
  'pagination.forwardBack': {
    name: 'Pagination, forward/back',
    type: 'pagination',
    func: paginationForwardBack,
  },
  'subheader.subscribeLinks': {
    name: 'Subscribe links',
    type: 'subscribeLinks',
    func: subheaderSubscribeLinks,
  },
};
