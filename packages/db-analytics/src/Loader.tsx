import * as React from 'react';

import EmptyState from '@pinecast/common/EmptyState';
import {nullThrows} from '@pinecast/common/helpers';
import xhr from '@pinecast/xhr';

import * as constants from './constants';
import {Data, Episode} from './types';

type LoadingState = {
  isLoading: true;
};
type CompletedState = {
  isLoading: false;
  data: Data;
  episodes?: Array<Episode>;
};
export type State = LoadingState | CompletedState;

export default class Loader extends React.Component {
  props: {
    analyticsType: constants.AnalyticsType;
    analyticsView: constants.AnalyticsView;
    children: (p: State) => JSX.Element;
    endpointOverride?: string;
    onError: (error: JSX.Element | string) => void;
    queryString: string;
  };
  state: {
    data: Data | null;
    episodes: Array<Episode> | null;
    loading: boolean;
  } = {
    data: null,
    episodes: null,
    loading: true,
  };

  private abort: (() => void) | null = null;

  componentDidMount() {
    this.load(
      this.props.analyticsType,
      this.props.analyticsView,
      this.props.queryString,
      this.props.endpointOverride,
    );
  }
  componentWillUnmount() {
    if (this.abort) {
      this.abort();
    }
  }

  componentWillReceiveProps(newProps: Loader['props']) {
    if (
      newProps.analyticsType !== this.props.analyticsType ||
      newProps.analyticsView !== this.props.analyticsView ||
      newProps.queryString !== this.props.queryString ||
      newProps.endpointOverride !== this.props.endpointOverride
    ) {
      this.load(
        newProps.analyticsType,
        newProps.analyticsView,
        newProps.queryString,
        newProps.endpointOverride,
      );
    }
  }

  async load(
    type: constants.AnalyticsType,
    view: constants.AnalyticsView,
    queryString: string,
    endpointOverride?: string,
  ) {
    if (this.abort) {
      this.abort();
      this.abort = null;
    }

    let abort: (() => void) | null = null;
    const abortPromise = new Promise<void>(res => {
      abort = res;
    });
    this.abort = abort;

    this.setState({data: null, episodes: null, loading: true});

    // Kick off episodes loading in parallel
    xhr({
      url: `/analytics/services/get_episodes?${queryString}`,
      method: 'GET',
      abortPromise,
    })
      .then(resp => JSON.parse(resp))
      .then(parsed => this.setState({episodes: parsed}), () => undefined);

    let response;
    try {
      const rawResponse = await xhr({
        url: `/analytics/${endpointOverride ||
          constants.TYPES_ENDPOINTS[type][view]}?${queryString}`,
        method: 'GET',
        abortPromise,
      });
      response = JSON.parse(rawResponse);
    } catch (e) {
      // TODO(L10n)
      this.setState({loading: false}, () => {
        this.props.onError('Unable to contact the server');
      });
      return;
    }

    this.setState({
      data: response,
      loading: false,
    });
  }

  isEmpty() {
    const {data} = this.state;
    if (!data) {
      return true;
    }
    if (Array.isArray(data)) {
      if (data.length < 1) {
        return true;
      }
      if (Array.isArray(data[0])) {
        return data.length < 2;
      }
      return false;
    } else if (typeof data === 'object') {
      return !data.datasets.some(
        ds => ds.data.length > 0 || ds.data.some(x => x > 0),
      );
    }
    throw new Error('unreachable');
  }

  render() {
    const {data, episodes, loading} = this.state;
    if (loading) {
      return this.props.children({isLoading: true});
    }

    if (this.isEmpty()) {
      // TODO(L10n)
      return (
        <EmptyState
          copy="There is no analaytics data available for the selected time range."
          style={{marginBottom: 0}}
          title="No analytics data"
        />
      );
    }

    return this.props.children({
      isLoading: false,
      data: nullThrows(data),
      episodes: episodes || undefined,
    });
  }
}
