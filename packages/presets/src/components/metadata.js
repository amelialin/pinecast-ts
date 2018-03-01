import headerCenteredFixed from './header-centeredFixed';
import linksLinkBar from './links-linkBar';
import paginationForwardBack from './pagination-forwardBack-fixed';
import subheaderSubscribeLinks from './subheader-subscribeLinks';

export default {
  'header.centeredFixed': {
    name: 'Title header',
    type: 'header',
    func: headerCenteredFixed,
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
