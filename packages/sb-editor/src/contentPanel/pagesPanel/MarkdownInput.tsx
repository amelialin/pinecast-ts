const {
  getSelection,
} = require('react-mde/lib/js/helpers/ReactMdeSelectionHelper');
import * as React from 'react';
import {
  ReactMdeCommands,
  ReactMdePreview,
  ReactMdeTextArea,
  ReactMdeToolbar,
  ReactMdeTypes,
} from 'react-mde';
import * as sanitizeHTML from 'sanitize-html';

import * as RichTextIcons from '@pinecast/common/icons/richText';

class SaferPreview extends ReactMdePreview {
  origMakeHTML: ReactMdePreview['converter']['makeHtml'];

  static options = {
    allowedTags: [
      'a',
      'b',
      'blockquote',
      'br',
      'caption',
      'code',
      'dd',
      'div',
      'dl',
      'dt',
      'em',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'hr',
      'i',
      'li',
      'nl',
      'ol',
      'p',
      'pre',
      'span',
      'strike',
      'strong',
      'table',
      'tbody',
      'td',
      'th',
      'thead',
      'tr',
      'ul',
    ],
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['alt', 'src', 'title'],
    },
    allowedSchemes: ['http', 'https'],
    selfClosing: ['img', 'br', 'hr'],
  };

  constructor(props: MarkdownInput['props']) {
    super(props);
    this.origMakeHTML = this.converter.makeHtml.bind(this.converter);
    this.converter.makeHtml = this.makeHTML;
  }

  makeHTML = (markdown: string): string => {
    const out = this.origMakeHTML(markdown);
    // NOTE: This is not a security panacea. And this is only on the preview,
    // not on the value itself. This just makes it less likely that the user
    // will self-XSS themselves for now.
    return sanitizeHTML(out, SaferPreview.options);
  };
}

const commands = [
  [
    {
      ...ReactMdeCommands.makeBoldCommand,
      icon: (
        <RichTextIcons.Bold
          style={{height: 16}}
          innerStyle={{strokeWidth: 2}}
        />
      ) as any,
    },
    {
      ...ReactMdeCommands.makeItalicCommand,
      icon: (
        <RichTextIcons.Italic
          style={{height: 16}}
          innerStyle={{strokeWidth: 2}}
        />
      ) as any,
    },
  ],
  [
    {
      ...ReactMdeCommands.makeUnorderedListCommand,
      icon: (
        <RichTextIcons.BulletedList
          style={{height: 16}}
          innerStyle={{strokeWidth: 1}}
        />
      ) as any,
    },
    {
      ...ReactMdeCommands.makeOrderedListCommand,
      icon: (
        <RichTextIcons.NumberedList
          style={{height: 16}}
          innerStyle={{strokeWidth: 1}}
        />
      ) as any,
    },
  ],
];

export default class MarkdownInput extends React.Component {
  textArea: HTMLTextAreaElement;
  props: {
    onChange: (value: ReactMdeTypes.Value) => void;
    value: ReactMdeTypes.Value;
  };

  handleCommand = async (command: ReactMdeTypes.Command) => {
    const {
      value: {text},
      onChange,
    } = this.props;
    let newValue = await command.execute(text, getSelection(this.textArea));
    // This is necessary because otherwise, when the value is reset, the scroll will jump to the end
    newValue.scrollTop = this.textArea.scrollTop;
    onChange(newValue);
  };

  render() {
    return (
      <React.Fragment>
        <ReactMdeToolbar onCommand={this.handleCommand} commands={commands} />
        <ReactMdeTextArea
          onChange={this.props.onChange}
          textAreaProps={{
            style: {
              border: '1px solid #ccc',
              fontSize: 13,
            },
          }}
          textAreaRef={c => (this.textArea = c)}
          value={this.props.value}
        />
        <SaferPreview
          helpVisible={false}
          markdown={this.props.value.text}
          showdownFlavor="github"
          showdownOptions={{
            tables: false,
          }}
        />
      </React.Fragment>
    );
  }
}
