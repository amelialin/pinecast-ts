import * as React from 'react';

import Card from '@pinecast/common/Card';
import Callout from '@pinecast/common/Callout';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import TagPicker from '@pinecast/common/TagPicker';

declare var PODCAST_CATEGORIES: Array<string>;
const allCats = (
  (typeof PODCAST_CATEGORIES !== 'undefined' && PODCAST_CATEGORIES) ||
  []
).sort((a, b) => a.localeCompare(b));
const allCatsAsOptions = allCats.map(x => ({key: x, label: x}));

const messages = defineMessages({
  tooManySelections: {
    id: 'db-categories.Categories.tooManySelections',
    description: 'Message shown when there are too many selections.',
    defaultMessage:
      'Too many selections: some categories may be ignored by Apple and Google.',
  },
  emptyLabel: {
    id: 'db-categories.Categories.emptyLabel',
    description: 'Message shown when no categories have been selected',
    defaultMessage: 'No categories selected yet',
  },
  optionsLabel: {
    id: 'db-categories.Categories.optionsLabel',
    description: 'Label for category options',
    defaultMessage: 'All categories',
  },
  selectedLabel: {
    id: 'db-categories.Categories.selectedLabel',
    description: 'Label for selected category options',
    defaultMessage: 'Selected categories',
  },
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

  doSelect(s: string) {
    this.setState({selectedCats: [s].concat(this.state.selectedCats).sort()});
  }
  doUnselect(s: string) {
    this.setState({
      selectedCats: this.state.selectedCats.filter(x => x !== s),
    });
  }

  setSelection = (selectedCats: Array<string>) => {
    this.setState({selectedCats});
  };

  render() {
    const {selectedCats} = this.state;
    return (
      <Card whiteBack>
        {selectedCats.length > 3 && (
          <Callout type="negative" style={{marginTop: 0}}>
            <FormattedMessage {...messages.tooManySelections} />
          </Callout>
        )}
        <TagPicker
          emptyLabel={<FormattedMessage {...messages.emptyLabel} />}
          maxHeight={204}
          onSelectionChange={this.setSelection}
          options={allCatsAsOptions}
          optionsLabel={<FormattedMessage {...messages.optionsLabel} />}
          selection={selectedCats}
          selectionLabel={<FormattedMessage {...messages.selectedLabel} />}
        />
        <input name="categories" type="hidden" value={selectedCats.join(',')} />
      </Card>
    );
  }
}
