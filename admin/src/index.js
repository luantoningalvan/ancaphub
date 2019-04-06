import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

import App from './app'
import Livros from './books'
import Podcasts from './podcasts'
import Artigos from './articles'
import Login from './auth/login'
import Cadastro from './auth/signup'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const store = createStore(rootReducer, applyMiddleware(thunk))
const routing = (     
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/livros" component={Livros} />
        <Route path="/podcasts" component={Podcasts} />
        <Route path="/artigos" component={Artigos} />
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={Cadastro} />
      </div>
    </Router>
  </Provider> 
)

ReactDOM.render(routing, document.getElementById('app'))