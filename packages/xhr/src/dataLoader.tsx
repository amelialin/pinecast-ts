import * as React from 'react';

import {DataProviderState, StateString} from './dataProvider';
import xhr, {Options, Result as XHRResult} from './xhr';

export default class DataLoader<Input, Response> extends React.Component {
  props:
    | {
        autoLoad?: boolean;
        children: (status: DataProviderState<Response>) => React.ReactNode;
        input: Input;
        fetcher: (inp: Input) => Options;
        transformer: (resp: string) => Response;
      }
    | {
        autoLoad?: boolean;
        children: (status: DataProviderState<Response>) => React.ReactNode;
        fetcher: Options;
        transformer: (resp: string) => Response;
      };
  state: {
    status: StateString;
    state: DataProviderState<Response>;
    req: XMLHttpRequest | null;
  };

  constructor(props: DataLoader<Input, Response>['props']) {
    super(props);
    this.state = {
      status: 'initial',
      state: {
        isInitial: true,
        isLoading: false,
        isErrored: false,
        isCompleted: false,
        data: null,
        reload: this.triggerLoad,
      },
      req: null,
    };

    if (props.autoLoad) {
      const options =
        typeof props.fetcher === 'function'
          ? props.fetcher((props as any).input as Input)
          : props.fetcher;
      const req = xhr(options);
      this.state = {
        status: 'loading',
        state: {
          isInitial: false,
          isLoading: true,
          isErrored: false,
          isCompleted: false,
          data: null,
          reload: this.triggerLoad,
        },
        req: req.xhr,
      };
      this.loadRequest(req);
    }
  }
  triggerLoad = () => {
    if (this.state.status === 'loading') {
      this.state.req!.abort();
    }
    const options =
      typeof this.props.fetcher === 'function'
        ? this.props.fetcher((this.props as any).input as Input)
        : this.props.fetcher;
    const xhrReq = xhr(options);
    this.setState({
      status: 'loading',
      dpState: {
        isInitial: false,
        isLoading: true,
        isErrored: false,
        isCompleted: false,
        reload: this.triggerLoad,
      },
      req: xhrReq.xhr,
    });
    this.loadRequest(xhrReq);
  };
  loadRequest(req: XHRResult<string>): Promise<DataProviderState<Response>> {
    return req
      .then(response => {
        const state: DataProviderState<Response> = {
          isInitial: false,
          isLoading: false,
          isErrored: false,
          isCompleted: true,
          data: this.props.transformer(response),
          reload: this.triggerLoad,
        };
        this.setState({
          status: 'completed',
          state,
          req: null,
        });
        return state;
      })
      .catch(error => {
        const state: DataProviderState<Response> = {
          isInitial: false,
          isLoading: false,
          isErrored: true,
          isCompleted: false,
          responseText: req.xhr.responseText,
          error,
          data: null,
          reload: this.triggerLoad,
        };
        this.setState({
          status: 'errored',
          state,
          req: null,
        });
        return state;
      });
  }

  render() {
    return this.props.children(this.state.state);
  }
}
