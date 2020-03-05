import React from "react";
import Routes from "./routes";

import { IntlProvider } from "react-intl";

// i18n JSON base translation files
import i18n_pt from "./i18n/pt.json";
import i18n_es from "./i18n/es.json";
import i18n_en from "./i18n/en.json";
import i18n_fr from "./i18n/fr.json";

// messages by language
const messages = {
  pt: i18n_pt,
  es: i18n_es,
  en: i18n_en,
  fr: i18n_fr
};

// get default browser language without region code as an initial fallback for development
const language = navigator.language.split(/[-_]/)[0];

export default function App() {
  return (
    <>
      <IntlProvider locale={language} messages={messages[language]}>
        <Routes />
      </IntlProvider>
    </>
  );
}