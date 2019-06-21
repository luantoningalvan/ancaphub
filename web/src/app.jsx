import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

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

// # Autenticação
import Signin from './auth/login'
import Signup from './auth/signup'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/livros" component={Books} />
          <Route path="/livros/:id" component={SingleBook} />

          <Route path="/podcasts" component={Podcasts} />

          <Route path="/artigos" component={Articles} />

          <Route path="/login" component={Signin} />
          <Route path="/cadastro" component={Signup} />
        </Switch>
      </Router>
    </Provider>
  )
}
