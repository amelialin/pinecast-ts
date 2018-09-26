import * as React from 'react';

import {Omit} from '@pinecast/common/types';

import xhr, {Options} from './xhr';

type InitialState<T> = {
  isInitial: true;
  isLoading: false;
  isErrored: false;
  isCompleted: false;
  reload: () => Promise<DataProviderState<T>>;
};
type LoadingState<T> = {
  isInitial: false;
  isLoading: true;
  isErrored: false;
  isCompleted: false;
  reload: () => Promise<DataProviderState<T>>;
};
type ErrorState<T> = {
  isInitial: false;
  isLoading: false;
  isErrored: true;
  isCompleted: false;
  responseText: string;
  error: any;
  reload: () => Promise<DataProviderState<T>>;
};
type CompletedState<T> = {
  isInitial: false;
  isLoading: false;
  isErrored: false;
  isCompleted: true;
  data: T;
  reload: () => Promise<DataProviderState<T>>;
};
export type DataProviderState<T> =
  | InitialState<T>
  | LoadingState<T>
  | ErrorState<T>
  | CompletedState<T>;
type StateString = 'initial' | 'loading' | 'errored' | 'completed';

export default function dataProvider<
  OutboundProps extends Object,
  injectedProp extends keyof OutboundProps,
  TransformedResponse,
  InboundProps = Omit<OutboundProps, injectedProp>
>(
  prop: injectedProp,
  options: (props: InboundProps) => Options,
  transformer: (response: string) => TransformedResponse,
): (
  innerComp: React.ComponentType<OutboundProps>,
) => React.ComponentType<InboundProps> {
  type DPState = {
    state: StateString;
    dpState: DataProviderState<TransformedResponse>;
    req: XMLHttpRequest | null;
  };

  return (Component: React.ComponentType<OutboundProps>) =>
    class extends React.Component {
      props: InboundProps;
      state: DPState;
      constructor(props: InboundProps) {
        super(props);
        this.state = {
          state: 'initial',
          dpState: {
            isInitial: true,
            isLoading: false,
            isErrored: false,
            isCompleted: false,
            reload: this.triggerLoad,
          },
          req: null,
        };
      }
      triggerLoad = (): Promise<DataProviderState<TransformedResponse>> => {
        if (this.state.state === 'loading') {
          this.state.req!.abort();
        }
        const xhrReq = xhr(options(this.props));
        this.setState({
          state: 'loading',
          dpState: {
            isInitial: false,
            isLoading: true,
            isErrored: false,
            isCompleted: false,
            reload: this.triggerLoad,
          },
          req: xhrReq.xhr,
        });

        return xhrReq
          .then(response => {
            const dpState = {
              isInitial: false,
              isLoading: false,
              isErrored: false,
              isCompleted: true,
              data: transformer(response),
              reload: this.triggerLoad,
            } as CompletedState<TransformedResponse>;
            this.setState({
              state: 'completed',
              dpState: dpState,
              req: null,
            } as DPState);
            return dpState;
          })
          .catch(error => {
            const dpState = {
              isInitial: false,
              isLoading: false,
              isErrored: true,
              isCompleted: false,
              responseText: xhrReq.xhr.responseText,
              error,
              reload: this.triggerLoad,
            } as ErrorState<TransformedResponse>;
            this.setState({
              state: 'errored',
              dpState,
              req: null,
            } as DPState);
            return dpState;
          });
      };

      componentDidMount() {
        this.triggerLoad();
      }
      componentWillUnmount() {
        if (this.state.state === 'loading') {
          this.state.req!.abort();
        }
      }

      render() {
        const propObj = {[prop]: this.state.dpState};
        return <Component {...this.props} {...propObj} />;
      }
    };
}
