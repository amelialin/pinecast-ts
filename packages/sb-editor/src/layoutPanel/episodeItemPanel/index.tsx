import {connect} from 'react-redux';
import * as React from 'react';

import EmptyState from '@pinecast/common/EmptyState';
import Label from '@pinecast/common/Label';
import Tabs, {Tab} from '@pinecast/common/Tabs';
import TextInput from '@pinecast/common/TextInput';

import {
  changePageOptions,
  deleteHomeSegment,
  deleteFirstPagePrefixSegment,
  setHeroLayouts,
  setHomeSegments,
  setFirstPagePrefixSegments,
} from '../../actions/theme';
import ComponentLayoutGroup from '../moduleHelpers/ComponentLayoutGroup';
import LayoutChoice from './LayoutChoice';
import {mergedTheme} from '../../reducers/selectors';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {primitives} from '@pinecast/sb-components';
import {ReducerType} from '../../reducer';

const layoutTypeOptions = {
  stacked: 'Stacked',
  grid: 'Grid',
};

class EpisodeItemPanel extends React.Component {
  props: {
    onDeleteFirstPagePrefixSegment: (index: number) => void;
    onDeleteHomeSegment: (index: number) => void;
    onFirstPageAfterPrefixUpdated: (
      layout: Array<primitives.ComponentLayout>,
    ) => void;
    onSetFirstPagePrefixSegments: (
      segments: Array<primitives.LayoutConfig>,
    ) => void;
    onSetHomeSegments: (segments: Array<primitives.LayoutConfig>) => void;
    theme: {
      layout: primitives.PageLayout;
      options: {defaultConsumeCount: number};
    };
  };

  handleFirstPagePrefixLayoutChange = (
    index: number,
    layout: primitives.LayoutConfig,
  ) => {
    const newSegments = [...this.props.theme.layout.body.home.firstPagePrefix];
    newSegments[index] = {
      ...this.props.theme.layout.body.home.firstPagePrefix[index],
      ...layout,
    };
    this.props.onSetFirstPagePrefixSegments(newSegments);
  };
  handleHomeLayoutChange = (index: number, layout: primitives.LayoutConfig) => {
    const newSegments = [...this.props.theme.layout.body.home.segments];
    newSegments[index] = {
      ...this.props.theme.layout.body.home.segments[index],
      ...layout,
    };
    this.props.onSetHomeSegments(newSegments);
  };
  handleHomeLayoutSwap = (fromIndex: number, toIndex: number) => {
    const newSegments = [...this.props.theme.layout.body.home.segments];
    const temp = newSegments[fromIndex];
    newSegments[fromIndex] = newSegments[toIndex];
    newSegments[toIndex] = temp;
    this.props.onSetHomeSegments(newSegments);
  };
  handleFirstPagePrefixLayoutSwap = (fromIndex: number, toIndex: number) => {
    const newSegments = [...this.props.theme.layout.body.home.firstPagePrefix];
    const temp = newSegments[fromIndex];
    newSegments[fromIndex] = newSegments[toIndex];
    newSegments[toIndex] = temp;
    this.props.onSetFirstPagePrefixSegments(newSegments);
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
            {theme.layout.body.home.segments.map((segment, i) => (
              <LayoutChoice
                canDelete={theme.layout.body.home.segments.length > 1}
                consumeBudget={budget}
                index={i}
                isFirst={i === 0}
                isLast={i === theme.layout.body.home.segments.length - 1}
                key={i}
                layout={segment}
                onChange={this.handleHomeLayoutChange}
                onSwap={this.handleHomeLayoutSwap}
                onDelete={this.props.onDeleteHomeSegment}
              />
            ))}
          </Tab>
          <Tab name="First page">
            <Label
              componentType="div"
              subText="Hero episodes appear before all other episodes on the homepage, and are useful for featuring recent episodes."
              text="Hero episodes"
            >
              {theme.layout.body.home.firstPagePrefix.length ? (
                theme.layout.body.home.firstPagePrefix.map((segment, i) => (
                  <LayoutChoice
                    canDelete
                    consumeBudget={budget}
                    index={i}
                    isFirst={i === 0}
                    isLast={
                      i === theme.layout.body.home.firstPagePrefix.length - 1
                    }
                    key={i}
                    layout={segment}
                    onChange={this.handleFirstPagePrefixLayoutChange}
                    onSwap={this.handleFirstPagePrefixLayoutSwap}
                    onDelete={this.props.onDeleteFirstPagePrefixSegment}
                  />
                ))
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
  (state: ReducerType) => ({theme: mergedTheme(state)}),
  dispatch => ({
    onDeleteFirstPagePrefixSegment: index =>
      dispatch(deleteFirstPagePrefixSegment(index)),
    onDeleteHomeSegment: index => dispatch(deleteHomeSegment(index)),
    onFirstPageAfterPrefixUpdated: modules => dispatch(setHeroLayouts(modules)),
    onSetFirstPagePrefixSegments: segments =>
      dispatch(setFirstPagePrefixSegments(segments)),
    onSetHomeSegments: segments => dispatch(setHomeSegments(segments)),
  }),
)(EpisodeItemPanel);
