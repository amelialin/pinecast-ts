import {connect} from 'react-redux';
import * as React from 'react';

import EmptyState from '@pinecast/common/EmptyState';
import Label from '@pinecast/common/Label';
import Tabs, {Tab} from '@pinecast/common/Tabs';

import {
  deleteHomeSegment,
  deleteFirstPagePrefixSegment,
  setHeroLayouts,
  setHomeSegments,
  setFirstPagePrefixSegments,
} from '../../actions/theme';
import ComponentLayoutGroup from '../moduleHelpers/ComponentLayoutGroup';
import LayoutChoiceGroup from './LayoutChoiceGroup';
import {mergedTheme} from '../../reducers/selectors';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {primitives} from '@pinecast/sb-components';
import {ReducerType} from '../../reducer';

type ThemePartial = {
  layout: primitives.PageLayout;
  options: {defaultConsumeCount: number};
};

class EpisodeItemPanel extends React.Component {
  props: {
    children?: any; // FIXME: required by react-redux
    onDeleteFirstPagePrefixSegment: (index: number) => any;
    onDeleteHomeSegment: (index: number) => any;
    onFirstPageAfterPrefixUpdated: (
      layout: Array<primitives.ComponentLayout>,
    ) => any;
    onSetFirstPagePrefixSegments: (
      segments: Array<primitives.LayoutConfig>,
    ) => any;
    onSetHomeSegments: (segments: Array<primitives.LayoutConfig>) => any;
    theme: ThemePartial;
  };

  remainingBudget(): number {
    const {firstPagePrefix, segments} = this.props.theme.layout.body.home;

    const total = segments
      .concat(firstPagePrefix)
      .reduce((a, b) => a + b.consumeCount, 0);

    return 100 - total;
  }

  render() {
    const {onFirstPageAfterPrefixUpdated, theme} = this.props;
    const budget = this.remainingBudget();
    return (
      <PanelWrapper>
        <PanelDescription>
          Choose how episodes are laid out in episode lists. You can customize
          their appearance on all pages of results, and add special treatment to
          the homepage.
        </PanelDescription>
        <Tabs>
          <Tab name="Every page">
            <LayoutChoiceGroup
              canDelete={theme.layout.body.home.segments.length > 1}
              consumeBudget={budget}
              layouts={theme.layout.body.home.segments}
              onUpdated={this.props.onSetHomeSegments}
            />
          </Tab>
          <Tab name="First page">
            <Label
              componentType="div"
              subText="Hero episodes appear before all other episodes on the homepage, and are useful for featuring recent episodes."
              text="Hero episodes"
            >
              {theme.layout.body.home.firstPagePrefix.length ? (
                <LayoutChoiceGroup
                  canDelete
                  consumeBudget={budget}
                  layouts={theme.layout.body.home.firstPagePrefix || []}
                  onUpdated={this.props.onSetFirstPagePrefixSegments}
                />
              ) : (
                <EmptyState
                  copy="Hero sections let you feature recent episodes on your site's homepage."
                  title="There is no hero section."
                />
              )}
            </Label>
            <Label
              componentType="div"
              subText="Add modules that will appear between your hero sections and the first regular episode segment."
              text="Modules after hero section"
            >
              <ComponentLayoutGroup
                layouts={theme.layout.body.home.firstPageAfterPrefix || []}
                onUpdated={onFirstPageAfterPrefixUpdated}
              />
            </Label>
          </Tab>
        </Tabs>
      </PanelWrapper>
    );
  }
}

export default connect(
  (state: ReducerType): {theme: ThemePartial} => ({theme: mergedTheme(state)}),
  {
    onDeleteFirstPagePrefixSegment: deleteFirstPagePrefixSegment,
    onDeleteHomeSegment: deleteHomeSegment,
    onFirstPageAfterPrefixUpdated: setHeroLayouts,
    onSetFirstPagePrefixSegments: setFirstPagePrefixSegments,
    onSetHomeSegments: setHomeSegments,
  },
)(EpisodeItemPanel);
