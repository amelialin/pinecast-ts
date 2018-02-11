import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import LoadingState from '../common/LoadingState';
import {
  PageHeading,
  PanelDescription,
  PanelDivider,
  PanelSectionTitle,
  PanelWrapper,
} from '../panelComponents';
import {ReducerType} from '../reducer';
import {refresh} from '../actions/preview';
import request, {clearCache} from '../data/requests';
import xhr from '../data/xhr';

const HeaderWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

const PageTable = styled('table', {
  border: 0,
  borderBottom: '1px solid #ccc',
  borderCollapse: 'collapse',
  lineHeight: '36px',
  marginBottom: 40,
  width: '100%',
});
const PageHeaderCell = styled('th', {
  borderBottom: '1px solid #ccc',
  color: '#888',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 26,
  padding: '0 8px',
  textAlign: 'left',
  textTransform: 'uppercase',
});
const PageBodyCell = styled('td', ({$wrapAt}: {$wrapAt?: number}) => ({
  borderBottom: '1px solid #ccc',
  fontSize: 16,
  maxWidth: $wrapAt,
  overflow: 'hidden',
  padding: '0 8px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const DeleteButton = styled(
  'button',
  {
    background: 'transparent',
    border: 0,
    borderRadius: 0,
    cursor: 'pointer',
    display: 'inline-flex',
    height: 20,
    marginTop: -3,
    padding: 0,
    verticalAlign: 'middle',
    width: 20,

    ':before': {
      backgroundColor: '#ccc',
      content: '""',
      display: 'block',
      height: 2,
      margin: 'auto',
      transform: 'translateX(5px) rotate(45deg)',
      transformOrigin: 'center',
      transition: 'background-color 0.25s',
      width: 20,
    },
    ':after': {
      backgroundColor: '#ccc',
      content: '""',
      display: 'block',
      height: 2,
      margin: 'auto',
      transform: 'translateX(-5px) rotate(-45deg)',
      transformOrigin: 'center',
      transition: 'background-color 0.25s',
      width: 20,
    },
    ':hover:before': {
      backgroundColor: '#b00',
    },
    ':hover:after': {
      backgroundColor: '#b00',
    },
  },
  {'aria-label': 'Delete link'},
);

interface Page {
  title: string;
  slug: string;
  page_type: 'markdown' | 'hosts' | 'contact';
  created: string;
  body: string;
}

class PagesPanel extends React.PureComponent {
  props: {csrf: string; onRefresh: () => void; slug: string};
  state: {
    data: Array<Page> | null;
    error: string | null;
  } = {
    data: null,
    error: null,
  };

  componentWillMount() {
    const {slug} = this.props;
    request(`/sites/site_builder/editor/pages/${encodeURIComponent(slug)}`)
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          this.setState({data: parsed});
        },
        () => {
          this.setState({error: 'Failed to load pages from Pinecast'});
        },
      );
  }

  save(newLinksArr: Array<{title: string; url: string}>) {
    this.setState({data: null, error: null});
    const {csrf, slug} = this.props;
    xhr({
      body: JSON.stringify(newLinksArr),
      headers: {'X-CSRFToken': csrf},
      method: 'POST',
      url: `/sites/site_builder/editor/pages/${encodeURIComponent(slug)}`,
    })
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          this.setState({data: parsed});
          clearCache();
          this.props.onRefresh();
        },
        () => {
          this.setState({error: 'Could not contact Pinecast'});
        },
      );
  }

  deleteItem(index: number) {
    //
  }

  renderInner() {
    if (this.state.error) {
      return <ErrorState title={this.state.error} />;
    }
    if (!this.state.data) {
      return <LoadingState title="Loading pages…" />;
    }

    if (!this.state.data.length) {
      return (
        <React.Fragment>
          <EmptyState
            title="No pages"
            copy="You don't have any pages created yet."
          />
          <PanelDivider />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <PageTable>
          <thead>
            <tr>
              <PageHeaderCell $wrapAt={150}>Title</PageHeaderCell>
              <PageHeaderCell $wrapAt={100}>Slug</PageHeaderCell>
              <PageHeaderCell $wrapAt={100}>Type</PageHeaderCell>
              <PageHeaderCell />
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((page, i) => {
              return (
                <tr key={i}>
                  <PageBodyCell $wrapAt={150} title={page.title}>
                    {page.title}
                  </PageBodyCell>
                  <PageBodyCell $wrapAt={100} title={page.slug}>
                    {page.slug}
                  </PageBodyCell>
                  <PageBodyCell $wrapAt={100}>
                    {page.page_type === 'markdown' && 'Markdown'}
                    {page.page_type === 'hosts' && 'Hosts'}
                    {page.page_type === 'contact' && 'Contact'}
                  </PageBodyCell>
                  <PageBodyCell style={{width: 30}}>
                    <DeleteButton
                      onClick={() => {
                        this.deleteItem(i);
                      }}
                    />
                  </PageBodyCell>
                </tr>
              );
            })}
          </tbody>
        </PageTable>
        <PanelDivider />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <HeaderWrapper>
          <PageHeading>Pages</PageHeading>
        </HeaderWrapper>
        <PanelWrapper>
          <PanelDescription>
            Add pages to your site to add content alongside your episodes.
          </PanelDescription>

          {this.renderInner()}
        </PanelWrapper>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ReducerType) => ({
    csrf: state.csrf,
    slug: state.slug,
  }),
  {onRefresh: refresh},
)(PagesPanel);
