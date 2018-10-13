import {
  FormattedMessage,
  injectIntl as nativeInjectIntl,
  InjectedIntlProps,
  IntlProvider,
} from 'react-intl';
import * as React from 'react';

export {FormattedMessage, InjectedIntlProps};
export const Provider = IntlProvider;

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

export function injectIntl<T>(
  component: React.ComponentType<T & InjectedIntlProps>,
) {
  return (nativeInjectIntl(component as any) as any) as React.ComponentType<T>;
}

export const I18n = injectIntl(
  class I18n extends React.Component {
    props: {
      children: (props: InjectedIntlProps) => React.ReactNode;
    } & InjectedIntlProps;

    render() {
      return this.props.children({intl: this.props.intl});
    }
  },
);
