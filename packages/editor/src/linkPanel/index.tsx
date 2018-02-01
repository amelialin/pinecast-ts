import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import LoadingState from '../common/LoadingState';
import NewLinkForm from './NewLinkForm';
import {
  PageHeading,
  PanelDescription,
  PanelDivider,
  PanelSection,
  PanelWrapper,
} from '../panelComponents';
import {ReducerType} from '../reducer';
import {refresh} from '../actions/preview';
import request, {clearCache} from '../data/requests';
import xhr from '../data/xhr';

const pageOptions = [
  {value: 'presets', name: 'Presets'},
  {value: 'colors', name: 'Colors'},
  {value: 'typography', name: 'Typography'},
  {value: 'components', name: 'Components'},
];

const HeaderWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

const LinkTable = styled('table', {
  border: 0,
  borderBottom: '1px solid #ccc',
  borderCollapse: 'collapse',
  lineHeight: '36px',
  marginBottom: 40,
  width: '100%',
});
const LinkHeaderCell = styled('th', {
  borderBottom: '1px solid #ccc',
  color: '#888',
  fontSize: 12,
  fontWeight: 500,
  padding: '0 8px',
  textAlign: 'left',
  textTransform: 'uppercase',
});
const LinkBodyCell = styled('td', ({$wrapAt}: {$wrapAt?: number}) => ({
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

class LinkPanel extends React.PureComponent {
  props: {csrf: string; onRefresh: () => void; slug: string};
  state: {
    data: Array<{title: string; url: string}> | null;
    error: string | null;
  } = {
    data: null,
    error: null,
  };

  componentWillMount() {
    const {slug} = this.props;
    request(`/sites/site_builder/editor/links/${encodeURIComponent(slug)}`)
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          this.setState({data: parsed});
        },
        () => {
          this.setState({error: 'Failed to load site links from Pinecast'});
        },
      );
  }

  handleNewLink = (title: string, url: string) => {
    const newLinksArr = [...(this.state.data || []), {title, url}];
    this.save(newLinksArr);
  };

  deleteItem(i: number) {
    const data = this.state.data || [];
    const newLinksArr = data.slice(0, i).concat(data.slice(i + 1));
    this.save(newLinksArr);
  }

  save(newLinksArr: Array<{title: string; url: string}>) {
    this.setState({data: null, error: null});
    const {csrf, slug} = this.props;
    xhr({
      body: JSON.stringify(newLinksArr),
      headers: {'X-CSRFToken': csrf},
      method: 'POST',
      url: `/sites/site_builder/editor/links/${encodeURIComponent(slug)}`,
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

  renderCreateForm() {
    return (
      <React.Fragment>
        <PanelSection>Add site link</PanelSection>
        <NewLinkForm onNewLink={this.handleNewLink} />
      </React.Fragment>
    );
  }

  renderInner() {
    if (this.state.error) {
      return <ErrorState title={this.state.error} />;
    }
    if (!this.state.data) {
      return <LoadingState title="Loading site links…" />;
    }

    if (!this.state.data.length) {
      return (
        <React.Fragment>
          <EmptyState
            title="No site links"
            copy="You don't have any site links created yet."
          />
          <PanelDivider />
          {this.renderCreateForm()}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <LinkTable>
          <thead>
            <tr>
              <LinkHeaderCell $wrapAt={150}>Link text</LinkHeaderCell>
              <LinkHeaderCell $wrapAt={200}>URL</LinkHeaderCell>
              <LinkHeaderCell />
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((link, i) => {
              return (
                <tr key={i}>
                  <LinkBodyCell $wrapAt={150}>{link.title}</LinkBodyCell>
                  <LinkBodyCell $wrapAt={200} title={link.url}>
                    {link.url}
                  </LinkBodyCell>
                  <LinkBodyCell style={{width: 30}}>
                    <DeleteButton
                      onClick={() => {
                        this.deleteItem(i);
                      }}
                    />
                  </LinkBodyCell>
                </tr>
              );
            })}
          </tbody>
        </LinkTable>
        <PanelDivider />
        {this.renderCreateForm()}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <HeaderWrapper>
          <PageHeading>Links</PageHeading>
        </HeaderWrapper>
        <PanelWrapper>
          <PanelDescription>
            Site links allow you to link your podcast website to other websites,
            like Facebook and Twitter.
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
)(LinkPanel);
