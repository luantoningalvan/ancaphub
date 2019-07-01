import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { setCurrentUser, logoutUser } from "./auth/authActions";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './rootReducer'

// Telas
// # Página Inicial
import Home from './home/home'

// # Livros
import Books from './books/books'
import SingleBook from './books/singleBook'


// # Podcasts
import Podcasts from './podcasts/podcasts'

// # Artigos
import Articles from './articles/articles'
import SingleArticle from './articles/singleArticle'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/livros" component={Books} />
          <Route path="/livros/:id" component={SingleBook} />

          <Route path="/podcasts" component={Podcasts} />

          <Route exact path="/artigos" component={Articles} />
          <Route path="/artigos/:id" component={SingleArticle} />
        </Switch>
      </Router>
    </Provider>
  )
}
