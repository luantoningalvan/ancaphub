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

/// Books
import Books from './books/books'
import AddBook from './books/bookFormPage'
import EditBook from './books/bookFormPage'

/// Articles
import Articles from './articles/articles'
import AddArticle from './articles/articleFormPage'
import EditArticle from './articles/articleFormPage'

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

          <PrivateRoute exact path="/books/" component={Books} />
          <PrivateRoute path="/books/add/" component={AddBook} />
          <PrivateRoute path="/books/edit/:id" component={EditBook} />

          <PrivateRoute exact path="/articles/" component={Articles} />
          <PrivateRoute path="/articles/add/" component={AddArticle} />
          <PrivateRoute path="/articles/edit/:id" component={EditArticle} />

          <Route path="/login" component={SignIn} />
        </Switch>
      </Router>
    </Provider>
  )
}