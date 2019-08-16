import React, { useEffect } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './rootReducer'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./auth/authActions";
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

// Import screens
/// Dashboard
import Dashboard from './dashboard/dashboard'

/// Collection
import Collection from './collection'
import BookForm from './collection/books/bookFormPage'
import ArticleForm from './collection/articles/articleFormPage'
import VideoForm from './collection/videos/videoFormPage'

/// Settings
import Settings from './settings'

/// Users
import Users from './users'

/// Auth
import SignIn from './auth/signin'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>

      <ReduxToastr
        timeOut={4000}
        newestOnTop={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />

      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />

          <PrivateRoute exact path="/collection" component={Collection} />
          <PrivateRoute path="/collection/book/add/" component={BookForm} />
          <PrivateRoute path="/collection/book/edit/:id" component={BookForm} />
          <PrivateRoute path="/collection/article/add/" component={ArticleForm} />
          <PrivateRoute path="/collection/article/edit/:id" component={ArticleForm} />
          <PrivateRoute path="/collection/video/add/" component={VideoForm} />
          <PrivateRoute path="/collection/video/edit/:id" component={VideoForm} />

          <PrivateRoute exact path="/settings" component={Settings} />

          <PrivateRoute exact path="/users" component={Users} />

          <Route path="/login" component={SignIn} />
        </Switch>
      </Router>
    </Provider>
  )
}