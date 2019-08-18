import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';
import PrivateRoute from "./PrivateRoute";
import Dashboard from './dashboard/dashboard'
import Collection from './collection'
import BookForm from './collection/books/bookFormPage'
import ArticleForm from './collection/articles/articleFormPage'
import VideoForm from './collection/videos/videoFormPage'
import Settings from './settings'
import Users from './users'
import SignIn from './auth/signin'
import setAuthToken from "./utils/setAuthToken";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadUser } from "./auth/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function Routes(props) {
  useEffect(() => {
    props.loadUser()
  }, []);

  if (props.auth.loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    )
  } else {
    return (
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
    )
  }

}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ loadUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Routes)