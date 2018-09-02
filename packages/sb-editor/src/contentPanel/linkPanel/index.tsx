import {connect} from 'react-redux';
import * as React from 'react';

import EmptyState from '@pinecast/common/EmptyState';
import ErrorState from '@pinecast/common/ErrorState';
import LoadingState from '@pinecast/common/LoadingState';
import {MeatballIconMenu} from '@pinecast/common/ContextMenu';
import {Table, TableBodyCell, TableHeaderCell} from '@pinecast/common/Table';
import xhr from '@pinecast/xhr';

import NewLinkForm from './NewLinkForm';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {ReducerType} from '../../reducer';
import {refresh} from '../../actions/preview';
import request, {clearCache} from '../../data/requests';

class LinkPanel extends React.PureComponent {
  props: {
    onRefresh: () => any;
    slug: string;
  };
  state: {
    data: Array<{title: string; url: string}> | null;
    error: string | null;
  } = {
    data: null,
    error: null,
  };
  unmounted: boolean = false;

  componentWillMount() {
    const {slug} = this.props;
    request(`/sites/site_builder/editor/links/${encodeURIComponent(slug)}`)
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          if (this.unmounted) {
            return;
          }
          this.setState({data: parsed});
        },
        () => {
          if (this.unmounted) {
            return;
          }
          this.setState({error: 'Failed to load site links from Pinecast'});
        },
      );
  }
  componentWillUnmount() {
    this.unmounted = true;
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
    const {slug} = this.props;
    xhr({
      body: JSON.stringify(newLinksArr),
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
          <EmptyState
            title="No site links"
            copy="You don't have any site links created yet."
          />
          {this.renderCreateForm()}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Table>
          <thead>
            <tr>
              <TableHeaderCell $wrapAt={150}>Link text</TableHeaderCell>
              <TableHeaderCell $wrapAt={200}>URL</TableHeaderCell>
              <TableHeaderCell />
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((link, i) => {
              return (
                <tr key={i}>
                  <TableBodyCell $wrapAt={150}>{link.title}</TableBodyCell>
                  <TableBodyCell $wrapAt={200} title={link.url}>
                    {link.url}
                  </TableBodyCell>
                  <TableBodyCell style={{width: 30}}>
                    <MeatballIconMenu
                      onSelect={slug => {
                        switch (slug) {
                          case 'delete':
                            this.deleteItem(i);
                            return;
                          case 'visit':
                            window.open(link.url);
                            return;
                        }
                      }}
                      options={[
                        {name: 'Visit…', slug: 'visit'},
                        {name: 'Delete', slug: 'delete'},
                      ]}
                    />
                  </TableBodyCell>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {this.renderCreateForm()}
      </React.Fragment>
    );
  }

  render() {
    return (
      <PanelWrapper>
        <PanelDescription>
          Site links allow you to link your podcast website to other websites,
          like Facebook and Twitter.
        </PanelDescription>

        {this.renderInner()}
      </PanelWrapper>
    );
  }
}

export default connect(
  (state: ReducerType) => ({
    slug: state.slug || '',
  }),
  {onRefresh: refresh},
)(LinkPanel);
