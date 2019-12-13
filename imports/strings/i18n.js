import { sprintf } from 'sprintf-js';

import en from './locales/en';

export default function(stringId, args={}) {
  let { locale='en', ...rest } = args,
    localization;

  switch(locale) {
    default:
      localization = en;
  }

  return sprintf(localization[stringId] || localization['err.string-not-found'], rest);
}
