import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { loadUser } from "./auth/authActions";
import setAuthToken from "./utils/setAuthToken";
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
import Books from './books'
import SingleBook from './books/singleBook'

// # Podcasts
import Podcasts from './podcasts'

// # Artigos
import Articles from './articles'
import SingleArticle from './articles/singleArticle'

// # Grupos
import Groups from './groups'

// # Eventos
import Events from './events'

// # Campanhas
import Campaigns from './campaigns'

// # Usuários
import Profile from './users/profile/profile'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/livros" component={Books} />
          <Route path="/livros/:id" component={SingleBook} />

          <Route path="/podcasts" component={Podcasts} />

          <Route path="/grupos" component={Groups} />

          <Route path="/eventos" component={Events} />

          <Route path="/campanhas" component={Campaigns} />

          <Route exact path="/artigos" component={Articles} />
          <Route path="/artigos/:id" component={SingleArticle} />

          <Route exact path="/usuario/:id" component={Profile} />
          <Route exact path="/usuario/:id/seguidores" component={Profile} />
          <Route exact path="/usuario/:id/biblioteca" component={Profile} />
        </Switch>
      </Router>
    </Provider>
  )
}
