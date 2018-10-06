import * as React from 'react';

import ErrorState from '@pinecast/common/ErrorState';
import {FormattedMessage} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import LoadingState from '@pinecast/common/LoadingState';
import SelectCustom from '@pinecast/common/SelectCustom';

import * as constants from '../constants';
import {Consumer} from '../Config';
import Loader, {State as LoaderState} from '../Loader';
import {MenuData} from '../types';
import render from './index';

export default class Menu extends React.Component {
  props: {
    data: MenuData;
    view: constants.AnalyticsView;
  };
  state: {
    error: JSX.Element | string | null;
    selection: string;
  };

  constructor(props: Menu['props']) {
    super(props);
    this.state = {
      error: null,
      selection: props.data[0].value,
    };
  }

  handleChange = (selection: string) => {
    this.setState({selection});
  };
  handleError = (error: JSX.Element | string) => {
    this.setState({error});
  };
  handleClearError = () => {
    this.setState({error: null});
  };

  renderInner = (state: LoaderState) => {
    if (state.isLoading) {
      return <LoadingState title="Loading analytics…" />;
    }

    return render(
      this.props.view,
      state.data,
      null,
      constants.TYPES_CHART_MENU_TYPES[this.props.view],
    );
  };

  renderBody() {
    const {error} = this.state;

    if (error) {
      return (
        <ErrorState
          actionLabel="Retry"
          onAction={this.handleClearError}
          title={error}
        />
      );
    }

    return (
      <Consumer>
        {({queryString, type, view}) => (
          <Loader
            analyticsType={type}
            analyticsView={view}
            endpointOverride={constants.TYPES_ENDPOINTS_MENU[type][view](
              this.state.selection,
            )}
            loadEpisodes={false}
            queryString={queryString}
            onError={this.handleError}
          >
            {this.renderInner}
          </Loader>
        )}
      </Consumer>
    );
  }

  render() {
    const {data, view} = this.props;
    return (
      <React.Fragment>
        <Group spacing={12} wrapperStyle={{alignItems: 'center'}}>
          <FormattedMessage {...constants.MENU_LABELS[view]} />
          <SelectCustom
            onChange={this.handleChange}
            options={data.map(item => ({
              key: item.value,
              render: () => item.label,
            }))}
            value={this.state.selection}
          />
        </Group>
        {this.renderBody()}
      </React.Fragment>
    );
  }
}
