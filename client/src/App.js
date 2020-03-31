import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import Routes from './routes';

import store from './store';


// i18n JSON base translation files
import i18nPt from './i18n/pt.json';
import i18nEs from './i18n/es.json';
import i18nEn from './i18n/en.json';
import i18nFr from './i18n/fr.json';

// messages by language
const messages = {
  pt: i18nPt,
  es: i18nEs,
  en: i18nEn,
  fr: i18nFr,
};

// get default browser language without region code as an initial fallback for development
const language = navigator.language.split(/[-_]/)[0];

export default function App() {
  return (
    <Provider store={store}>
      <IntlProvider locale={language} messages={messages[language]}>
        <Routes />
      </IntlProvider>
    </Provider>
  );
}
