import * as React from 'react';

import Card from '@pinecast/common/Card';
import Callout from '@pinecast/common/Callout';
import Checkbox from '@pinecast/common/Checkbox';
import {gettext} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import Tag from '@pinecast/common/Tag';
import styled from '@pinecast/styles';

declare var PODCAST_CATEGORIES: Array<string>;
const allCats = (
  (typeof PODCAST_CATEGORIES !== 'undefined' && PODCAST_CATEGORIES) ||
  []
).sort((a, b) => a.localeCompare(b));

const AllCategories = styled('div', {
  maxHeight: 300,
  overflow: 'auto',
});

export default class Categories extends React.Component {
  static selector = '.categories-placeholder';

  static propExtraction = {
    name: (e: HTMLElement) => e.getAttribute('data-name'),
    defCats: (e: HTMLElement) =>
      (e.getAttribute('data-default-cats') || '').split(',').filter(x => x),
  };

  props: {
    name: string;
    defCats: Array<string>;
  };
  state: {
    selectedCats: Array<string>;
  };

  constructor(props: Categories['props']) {
    super(props);
    this.state = {selectedCats: props.defCats};
  }

  renderOption = (text: string) => (
    <Checkbox
      checked={this.state.selectedCats.includes(text)}
      onChange={checked => {
        if (checked) {
          this.doSelect(text);
        } else {
          this.doUnselect(text);
        }
      }}
      text={text}
    />
  );

  doSelect(s: string) {
    this.setState({selectedCats: [s].concat(this.state.selectedCats).sort()});
  }
  doUnselect(s: string) {
    this.setState({
      selectedCats: this.state.selectedCats.filter(x => x !== s),
    });
  }

  renderSelection = (category: string) => (
    <Tag
      color="gray"
      deleteButton
      onDelete={() => {
        this.doUnselect(category);
      }}
      size="large"
      style={{marginBottom: 8}}
    >
      {category}
    </Tag>
  );

  render() {
    return (
      <Card whiteBack>
        {this.state.selectedCats.length > 3 && (
          <Callout type="negative" style={{marginTop: 0}}>
            {gettext(
              'Too many selections: some categories may be ignored by Apple and Google.',
            )}
          </Callout>
        )}
        <Label componentType="div" text={gettext('Selected categories')}>
          <Group spacing={8} wrapperStyle={{flexWrap: 'wrap'}}>
            {this.state.selectedCats.map(this.renderSelection)}
          </Group>
        </Label>
        <Label
          componentType="div"
          style={{marginBottom: 0}}
          text={gettext('All categories')}
        >
          <AllCategories>{allCats.map(this.renderOption)}</AllCategories>
        </Label>
        <input
          name={this.props.name}
          type="hidden"
          value={this.state.selectedCats.join(',')}
        />
      </Card>
    );
  }
}
