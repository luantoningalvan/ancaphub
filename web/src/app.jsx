import React, { useEffect } from 'react'
import PrivateRoute from './PrivateRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { loadUser } from "./auth/authActions";
import setAuthToken from "./utils/setAuthToken";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './rootReducer'
import UnavailablePage from './unavailablePage'

// Telas
// # Página Inicial
import Home from './home/home'

// # Livros
import Books from './books'
import SingleBook from './books/singleBook'
import AddBook from './books/addBook'

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

// # Usuário autenticado
import AccountSetting from './auth/accountSettings'
import SavedItems from './auth/savedItems'

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
          <PrivateRoute path="/livros/contribuir" component={AddBook} />
          <Route path="/livros/livro/:id" component={SingleBook} />

          <Route exact path="/artigos" component={Articles} />
          <PrivateRoute path="/artigos/contribuir" component={Articles} />
          <Route path="/artigos/artigo/:id" component={SingleArticle} />

          <Route path="/podcasts" component={Podcasts} />

          <Route path="/grupos" component={Groups} />

          <Route path="/eventos" component={Events} />

          <Route path="/campanhas" component={Campaigns} />

          <Route path="/salvos" component={SavedItems} />
          <Route path="/configuracoes" component={AccountSetting} />

          <Route exact path="/usuario/:id" component={Profile} />
          <Route exact path="/usuario/:id/seguidores" component={Profile} />
          <Route exact path="/usuario/:id/colecao" component={Profile} />
          <Route path="*" component={UnavailablePage} />
        </Switch>
      </Router>
    </Provider>
  )
}
