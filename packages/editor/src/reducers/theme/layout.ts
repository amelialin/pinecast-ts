import {Action, overrideReducer} from '../../actions';
import {actionHandler, reduceReducers} from '../util';
import {primitives} from '@pinecast/sb-components';

type ComponentLayout = primitives.ComponentLayout;

interface ReducerType {
  readonly header?: Array<ComponentLayout>;
  readonly footer?: Array<ComponentLayout>;
}

export default actionHandler<ReducerType>({
  header: overrideReducer<ReducerType['header']>('theme.changeLayout.header'),
  footer: overrideReducer<ReducerType['footer']>('theme.changeLayout.footer'),
});
