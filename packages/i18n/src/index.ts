import {FormattedMessage, IntlProvider} from 'react-intl';

export {FormattedMessage};
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
  values?: {[key: string]: JSX.Element | string};
};

export function defineMessages(messages: {
  [id: string]: Message;
}): {[id: string]: Message} {
  return messages;
}
