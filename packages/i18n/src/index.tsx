import {
  FormattedMessage as OrigFormattedMessage,
  injectIntl as nativeInjectIntl,
  InjectedIntlProps,
  IntlProvider,
} from 'react-intl';
import * as React from 'react';

export {InjectedIntlProps};
export const Provider = IntlProvider;

export const FormattedMessage = ({
  style,
  ...rest
}: OrigFormattedMessage['props'] & {style?: React.CSSProperties}) => (
  <OrigFormattedMessage {...rest}>
    {content => <span style={style}>{content}</span>}
  </OrigFormattedMessage>
);

let warned = false;
export function gettext(inp: string): string {
  if (!warned) {
    console.warn(`Legacy gettext() used for string "${inp}"`);
    warned = true;
  }
  return inp;
}

export type Message = {
  id: string;
  description: string;
  defaultMessage: string;
};

// This weird typing is to preserve autocomplete
export function defineMessages<T extends Object>(
  messages: {[id in keyof T]: Message},
): {[id in keyof T]: Message} {
  return messages;
}

export function injectIntl<T extends Object>(
  component: React.ComponentType<T & {intl: InjectedIntlProps['intl']}>,
) {
  return (nativeInjectIntl(component as any) as any) as React.ComponentType<T>;
}

type RenderProp = {
  children: (props: InjectedIntlProps) => React.ReactNode;
};
export const I18n = injectIntl(
  class I18n extends React.Component<RenderProp & InjectedIntlProps> {
    render() {
      return this.props.children({intl: this.props.intl});
    }
  },
);
