import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

import App from './app'

const store = createStore(rootReducer, applyMiddleware(thunk))
const routing = (     
  <Provider store={store}>
    <App />
  </Provider> 
)

ReactDOM.render(routing, document.getElementById('app'))