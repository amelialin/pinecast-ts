import {connect} from 'react-redux';
import * as React from 'react';

import Label from '../../common/Label';
import {mergedTheme} from '../../reducers/selectors';
import ModuleCard from './ModuleCard';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {ReducerType} from '../../reducer';

type Props = {theme: ReducerType['theme']};

const ModulesPanel = ({theme}: Props) => (
  <PanelWrapper>
    <PanelDescription>
      Adding and removing modules lets you add or remove features from your
      podcast website.
    </PanelDescription>
    <Label componentType="div" text="Header">
      {theme.layout.header.map((layout, i) => (
        <ModuleCard
          canDelete={theme.layout.header.length > 1}
          key={i}
          isFirst={i === 0}
          isLast={i === theme.layout.header.length - 1}
          tag={layout.tag}
        />
      ))}
    </Label>
    <Label componentType="div" text="Footer">
      {theme.layout.footer.map((layout, i) => (
        <ModuleCard
          canDelete={theme.layout.footer.length > 1}
          key={i}
          isFirst={i === 0}
          isLast={i === theme.layout.footer.length - 1}
          tag={layout.tag}
        />
      ))}
    </Label>
  </PanelWrapper>
);

export default connect((state: ReducerType) => ({theme: mergedTheme(state)}))(
  ModulesPanel,
);
