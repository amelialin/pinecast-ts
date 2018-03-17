import {connect} from 'react-redux';
import * as React from 'react';

import {mergedTheme} from '../../reducers/selectors';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {primitives} from '@pinecast/sb-components';
import {ReducerType} from '../../reducer';

type Props = {
  theme: {layout: primitives.PageLayout};
};

const ModulesPanel = ({theme}: Props) => (
  <PanelWrapper>
    <PanelDescription>
      Page wrappers add borders, padding, and shadows to episode detail pages,
      markdown pages, contact pages, and host pages.
    </PanelDescription>
  </PanelWrapper>
);

export default connect(
  (state: ReducerType) => ({theme: mergedTheme(state)}),
  dispatch => ({
    //
  }),
)(ModulesPanel);
