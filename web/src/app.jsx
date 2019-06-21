import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

// Telas
import Home from './home/home'
import Livros from './books/books'
import Podcasts from './podcasts/podcasts'
import Artigos from './articles/articles'
import Login from './auth/loginForm'
import Cadastro from './auth/signup'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/livros" component={Livros} />
          <Route path="/podcasts" component={Podcasts} />
          <Route path="/artigos" component={Artigos} />
          <Route path="/login" component={Login} />
          <Route path="/cadastro" component={Cadastro} />
        </Switch>
      </Router>
    </Provider>
  )
}
