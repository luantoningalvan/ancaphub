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
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

// Import screens
import Dashboard from './dashboard/dashboard'
import Books from './books/books'
import AddBooks from './books/bookFormPage'
import EditBook from './books/bookFormPage'
import SignIn from './auth/signin'

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

export default class App extends Component {
    render() {
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
                        <PrivateRoute path="/books/add/" component={AddBooks} />
                        <PrivateRoute path="/books/edit/:id" component={EditBook}/>

                        <Route path="/login" component={SignIn} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}