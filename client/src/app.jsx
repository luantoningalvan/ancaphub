import React, { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadUser } from './actions/authActions';
import thunk from 'redux-thunk';
import reducers from './reducers';
import setAuthToken from './utils/setAuthToken';
import Routes from './routes'
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk)(createStore)(reducers, devTools);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
