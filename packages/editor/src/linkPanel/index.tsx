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
  PanelWrapper,
} from '../panelComponents';
import {ReducerType} from '../reducer';
import request, {clearCache} from '../data/requests';

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
  borderCollapse: 'collapse',
});

class LinkPanel extends React.PureComponent {
  props: {slug: string};
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
    //
  };

  renderCreateForm() {
    return <NewLinkForm onNewLink={this.handleNewLink} />;
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
          {this.renderCreateForm()}
          <PanelDivider />
          <EmptyState
            title="No site links"
            copy="You don't have any site links created yet."
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {this.renderCreateForm()}
        <PanelDivider />
        <LinkTable>
          <tbody>
            {this.state.data.map((link, i) => {
              return (
                <tr>
                  <td>{link.title}</td>
                  <td>{link.url}</td>
                  <td>X</td>
                </tr>
              );
            })}
          </tbody>
        </LinkTable>
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

export default connect((state: ReducerType) => ({slug: state.slug}))(LinkPanel);
