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
import Home from './pages/home'

// # Livros
import Books from './pages/books'
import SingleBook from './pages/books/singleBook'
import AddBook from './pages/books/addBook'

// # Artigos
import Articles from './pages/articles'
import SingleArticle from './pages/articles/singleArticle'
import AddArticle from './pages/articles/addArticle'

// # Vídeos
import Videos from './pages/videos'
import SingleVideo from './pages/videos/singleVideo'
import AddVideo from './pages/videos/addVideo'

// # Podcasts
import Podcasts from './pages/podcasts'

// # Grupos
import Groups from './pages/groups'

// # Eventos
import Events from './pages/events'

// # Campanhas
import Campaigns from './pages/campaigns'

// # Usuários
import Profile from './pages/users/profile/profile'

// # Usuário autenticado
import AccountSetting from './auth/accountSettings'
import SavedItems from './auth/savedItems'
import ContributionsPanel from './auth/contributionsPanel'

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
          <PrivateRoute path="/artigos/contribuir" component={AddArticle} />
          <Route path="/artigos/artigo/:id" component={SingleArticle} />

          <Route exact path="/videos" component={Videos} />
          <PrivateRoute path="/videos/contribuir" component={AddVideo} />
          <Route path="/videos/video/:id" component={SingleVideo} />

          <Route path="/podcasts" component={Podcasts} />

          <Route path="/grupos" component={Groups} />

          <Route path="/eventos" component={Events} />

          <Route path="/campanhas" component={Campaigns} />

          <PrivateRoute path="/salvos" component={SavedItems} />
          <PrivateRoute path="/configuracoes" component={AccountSetting} />
          <PrivateRoute path="/painel-de-contribuicoes" component={ContributionsPanel} />

          <Route exact path="/usuario/:id" component={Profile} />
          <Route exact path="/usuario/:id/seguidores" component={Profile} />
          <Route exact path="/usuario/:id/colecao" component={Profile} />
          <Route path="*" component={UnavailablePage} />
        </Switch>
      </Router>
    </Provider>
  )
}
