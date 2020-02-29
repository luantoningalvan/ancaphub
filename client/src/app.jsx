import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { loadUser } from "./actions/authActions";
import thunk from "redux-thunk";
import reducers from "./reducers";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./routes";

// i18n provider and JSON base translation files
import { IntlProvider } from "react-intl";
import i18n_pt from "./i18n/pt.json";
import i18n_es from "./i18n/es.json";
import i18n_en from "./i18n/en.json";
import i18n_fr from "./i18n/fr.json";

// At any time a new language is added, just add it here and all stuff is done
const messages = {
  pt: i18n_pt,
  es: i18n_es,
  en: i18n_en,
  fr: i18n_fr
};

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk)(createStore)(reducers, devTools);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// If there is a preferred language, set it. Otherwise fallback to portuguese
const preferredLanguage = localStorage.getItem("preferred_language")
  ? localStorage.getItem("preferred_language")
  : store.getState().i18n.currentLanguage;

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <IntlProvider
        locale={preferredLanguage}
        messages={messages[preferredLanguage]}
      >
        <Routes />
      </IntlProvider>
    </Provider>
  );
}
