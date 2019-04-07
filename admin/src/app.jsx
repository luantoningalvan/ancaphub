import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Dashboard from './dashboard/dashboard'
import Books from './books/books'
import AddBooks from './books/addBooks'

export default class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/books/" component={Books} />
                    <Route path="/books/add/" component={AddBooks} />
                </Switch>
            </Router>
        )
    }
}