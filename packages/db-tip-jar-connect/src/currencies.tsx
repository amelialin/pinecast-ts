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
  chf: {
    id: 'db-tip-jar-connect.currencies.chf',
    description: 'Name of currency "chf"',
    defaultMessage: 'CHF - Swiss Franc',
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

export const countriesToCurrencies: {
  [country: string]: {[currency: string]: Array<string>};
} = {
  US: {usd: ['US']},
  AU: {aud: ['AU']},
  CA: {cad: ['CA'], usd: ['CA', 'US']},
  GB: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },

  AT: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  BE: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  CH: {
    chf: ['CH'],
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
  },
  FI: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  FR: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  DE: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  DK: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  IE: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  IT: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  LU: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  NL: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  NO: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  PT: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  SE: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
  ES: {
    eur: [
      'AT',
      'BE',
      'CH',
      'DE',
      'DK',
      'ES',
      'FI',
      'FR',
      'GB',
      'IE',
      'IT',
      'LU',
      'NL',
      'NO',
      'PT',
      'SE',
    ],
    dkk: ['DK'],
    gbp: ['GB'],
    nok: ['NO'],
    sek: ['SE'],
    usd: ['US'],
    chf: ['CH'],
  },
};

export const defaultCurrency: {[country: string]: string} = {
  US: 'usd',
  AU: 'aud',
  CA: 'cad',
  GB: 'eur',

  AT: 'eur',
  BE: 'eur',
  CH: 'chf',
  DE: 'eur',
  DK: 'dkk',
  ES: 'eur',
  FI: 'eur',
  FR: 'eur',
  IE: 'eur',
  IT: 'eur',
  LU: 'eur',
  NL: 'eur',
  NO: 'nok',
  PT: 'eur',
  SE: 'sek',
};
