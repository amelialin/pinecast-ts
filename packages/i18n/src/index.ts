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
export function ngettext(text: string, plural: string, n: number) {
  if (!warned) {
    console.warn(`Legacy ngettext() used for string "${text}"`);
    warned = true;
  }
  return (n === 1 ? text : plural).replace(/%d/, String(n));
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
