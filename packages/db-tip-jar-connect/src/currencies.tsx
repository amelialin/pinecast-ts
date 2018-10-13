import {defineMessages, Message} from '@pinecast/i18n';

export const names = defineMessages({
  aud: {
    id: 'db-tip-jar-connect.currencies.aud',
    description: 'Name of currency "aud"',
    defaultMessage: 'AUD - Australian Dollar',
  },
  cad: {
    id: 'db-tip-jar-connect.currencies.cad',
    description: 'Name of currency "cad"',
    defaultMessage: 'CAD - Canadian Dollar',
  },
  dkk: {
    id: 'db-tip-jar-connect.currencies.dkk',
    description: 'Name of currency "dkk"',
    defaultMessage: 'DKK - Danish Krone',
  },
  eur: {
    id: 'db-tip-jar-connect.currencies.eur',
    description: 'Name of currency "eur"',
    defaultMessage: 'EUR - Euro',
  },
  gbp: {
    id: 'db-tip-jar-connect.currencies.gbp',
    description: 'Name of currency "gbp"',
    defaultMessage: 'GBP - Pound Sterling',
  },
  nok: {
    id: 'db-tip-jar-connect.currencies.nok',
    description: 'Name of currency "nok"',
    defaultMessage: 'NOK - Norwegian Krone',
  },
  sek: {
    id: 'db-tip-jar-connect.currencies.sek',
    description: 'Name of currency "sek"',
    defaultMessage: 'SEK - Swedish Krone',
  },
  usd: {
    id: 'db-tip-jar-connect.currencies.usd',
    description: 'Name of currency "usd"',
    defaultMessage: 'USD - US Dollar',
  },
}) as {[currency: string]: Message};

export const countriesToCurrencies: {[country: string]: Array<string>} = {
  US: ['usd'],
  AU: ['aud'],
  CA: ['cad', 'usd'],
  GB: ['gbp', 'eur'],
};
