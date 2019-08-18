import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './rootReducer'
import ReduxToastr from 'react-redux-toastr'
import Routes from './routes'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

export default function App() {
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

      <Routes />
    </Provider>
  )
}