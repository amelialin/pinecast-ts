import {primitives} from '@pinecast/sb-components';

import {actionHandler, reduceReducers} from '../util';
import {deleteArrayItem, overrideReducer} from '../../actions';

type ComponentLayout = primitives.ComponentLayout;

interface Home {
  readonly firstPageAfterPrefix?: Array<ComponentLayout>;
  readonly firstPagePrefix?: Array<primitives.LayoutConfig>;
  readonly segments?: Array<primitives.LayoutConfig>;
}
interface Body {
  readonly home?: Home;
}
interface ReducerType {
  readonly header?: Array<ComponentLayout>;
  readonly body?: Body;
  readonly footer?: Array<ComponentLayout>;
}

const LayoutConfigArrayReducer = (field: string) =>
  reduceReducers(
    overrideReducer<Array<primitives.LayoutConfig>>(
      `theme.changeLayout.home.${field}`,
    ),
    deleteArrayItem<primitives.LayoutConfig>(
      `theme.changeLayout.home.${field}.delete`,
    ),
  );

const home = reduceReducers<Home>(
  (state: Home) => state || {},
  actionHandler<Home>({
    firstPagePrefix: LayoutConfigArrayReducer('firstPagePrefix'),
    firstPageAfterPrefix: overrideReducer<Home['firstPageAfterPrefix']>(
      'theme.changeLayout.hero',
    ),
    segments: LayoutConfigArrayReducer('segments'),
  }),
);
const body = reduceReducers<Body>(
  (state: Body) => state || {home: {}},
  actionHandler<Body>({home}),
);

export default reduceReducers(
  (state: ReducerType) => state || {body: {}},
  actionHandler<ReducerType>({
    header: overrideReducer<ReducerType['header']>('theme.changeLayout.header'),
    body,
    footer: overrideReducer<ReducerType['footer']>('theme.changeLayout.footer'),
  }),
);
