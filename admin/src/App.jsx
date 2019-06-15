import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './rootReducer'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./auth/authActions";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers,devTools)

// Import screens
import Dashboard from './dashboard/dashboard'
import Books from './books/books'
import AddBooks from './books/addBooks'

import SignIn from './auth/signin'
import SignUp from './auth/signup'

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

export default class App extends Component{

    
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />

                        <PrivateRoute exact path="/books/" component={Books} />
                        <PrivateRoute path="/books/add/" component={AddBooks} />

                        <Route path="/login" component={SignIn} />
                        <Route path="/cadastro" component={SignUp} />

                        
                    </Switch>
                </Router>
            </Provider>
        )
    }
}