import en from './locales/en';

// Note: This is just a really basic handler for i18n, which I think is a pretty good thing to take care of
// as early as possible if there is a chance an app will need to support multiple locales.

export default function(stringId, locale='en') {
  let localization;

  switch(locale) {
    case 'en':
    default:
      localization = en;
  }

  return localization[stringId] || localization['err.string-not-found'];
}
