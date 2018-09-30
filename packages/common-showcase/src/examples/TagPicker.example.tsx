import * as React from 'react';

import TagPicker from '@pinecast/common/TagPicker';

class TagState extends React.Component {
  props: {
    children: (
      props: {tags: Array<string>; onSetTags: (tags: Array<string>) => void},
    ) => React.ReactNode;
  };
  state: {
    tags: Array<string>;
  } = {tags: []};

  handleSetTags = (newTags: Array<string>) => {
    this.setState({tags: newTags});
  };
  render() {
    return this.props.children({
      tags: this.state.tags,
      onSetTags: this.handleSetTags,
    });
  }
}

export default {
  name: 'Tag picker',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <TagState>
          {({tags, onSetTags}) => (
            <TagPicker
              emptyLabel="Nothing is chosen yet"
              onSelectionChange={onSetTags}
              options={[
                {key: 'first', label: 'First'},
                {key: 'second', label: 'Second'},
                {key: 'third', label: 'Third'},
              ]}
              optionsLabel="Available items"
              selection={tags}
              selectionLabel="Selected items"
            />
          )}
        </TagState>
      ),
    },
    {
      title: 'Max choices',
      render: () => (
        <TagState>
          {({tags, onSetTags}) => (
            <TagPicker
              emptyLabel="Nothing is chosen yet"
              maxChoices={2}
              onSelectionChange={onSetTags}
              options={[
                {key: 'first', label: 'First'},
                {key: 'second', label: 'Second'},
                {key: 'third', label: 'Third'},
              ]}
              optionsLabel="You can only choose two items"
              selection={tags}
              selectionLabel="Selected items"
            />
          )}
        </TagState>
      ),
    },
    {
      title: 'Max height',
      render: () => (
        <TagState>
          {({tags, onSetTags}) => (
            <TagPicker
              emptyLabel="Nothing is chosen yet"
              maxHeight={100}
              onSelectionChange={onSetTags}
              options={[
                {key: 'first', label: 'First'},
                {key: 'second', label: 'Second'},
                {key: 'third', label: 'Third'},
                {key: 'fourth', label: 'Fourth'},
                {key: 'fifth', label: 'Fifth'},
                {key: 'sixth', label: 'Sixth'},
                {key: 'seventh', label: 'Seventh'},
                {key: 'eighth', label: 'Eighth'},
                {key: 'foo', label: 'Foo'},
                {key: 'bar', label: 'Bar'},
              ]}
              optionsLabel="Available items"
              selection={tags}
              selectionLabel="Selected items"
            />
          )}
        </TagState>
      ),
    },
  ],
};
