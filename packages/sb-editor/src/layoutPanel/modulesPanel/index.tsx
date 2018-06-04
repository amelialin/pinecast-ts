import {connect} from 'react-redux';
import * as React from 'react';

import ComponentLayoutGroup from '../moduleHelpers/ComponentLayoutGroup';
import Label from '@pinecast/common/Label';
import {setHeaderLayouts, setFooterLayouts} from '../../actions/theme';
import {mergedTheme} from '../../reducers/selectors';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {primitives} from '@pinecast/sb-components';
import {ReducerType} from '../../reducer';

type Props = {
  onFooterUpdate: (layout: Array<primitives.ComponentLayout>) => void;
  onHeaderUpdate: (layout: Array<primitives.ComponentLayout>) => void;
  theme: {layout: primitives.PageLayout};
};

const ModulesPanel = ({onFooterUpdate, onHeaderUpdate, theme}: Props) => (
  <PanelWrapper>
    <PanelDescription>
      Modules are the sections of content on each of your pages. One group of
      modules composes your header, and another composes your website's footer.
      You can add, remove, and modify modules from either group.
    </PanelDescription>
    <Label
      componentType="div"
      subText="Header modules appear at the top of every page."
      text="Header"
    >
      <ComponentLayoutGroup
        layouts={theme.layout.header}
        onUpdated={onHeaderUpdate}
      />
    </Label>
    <Label
      componentType="div"
      subText="Footer modules appear at the bottom of every page."
      text="Footer"
    >
      <ComponentLayoutGroup
        layouts={theme.layout.footer}
        onUpdated={onFooterUpdate}
      />
    </Label>
  </PanelWrapper>
);

export default connect((state: ReducerType) => ({theme: mergedTheme(state)}), {
  onFooterUpdate: setFooterLayouts,
  onHeaderUpdate: setHeaderLayouts,
})(ModulesPanel);
