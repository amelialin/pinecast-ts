import {gettext} from '@pinecast/i18n';

export const names: {[currency: string]: string} = {
  aud: gettext('AUD - Australian Dollar'),
  cad: gettext('CAD - Canadian Dollar'),
  dkk: gettext('DKK - Danish Krone'),
  eur: gettext('EUR - Euro'),
  gbp: gettext('GBP - Pound Sterling'),
  nok: gettext('NOK - Norwegian Krone'),
  sek: gettext('SEK - Swedish Krone'),
  usd: gettext('USD - US Dollar'),
};

export const countriesToCurrencies: {[country: string]: Array<string>} = {
  us: ['usd'],
  au: ['aud'],
  ca: ['cad', 'usd'],
  gb: ['gbp', 'eur'],
};
