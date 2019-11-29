import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UnavailablePage from './pages/unavaliable';
import PrivateRoute from './components/auth/privateRoute';

// Telas
import Home from './pages/home';
import Feed from './pages/feed';
import Books from './pages/collection/books';
import SingleBook from './pages/collection/books/singleBook';
import AddBook from './pages/collection/books/addBook';
import Articles from './pages/collection/articles';
import SingleArticle from './pages/collection/articles/singleArticle';
import AddArticle from './pages/collection/articles/addArticle';
import Videos from './pages/collection/videos';
import SingleVideo from './pages/collection/videos/singleVideo';
import AddVideo from './pages/collection/videos/addVideo';
import Groups from './pages/groups';
import SingleGroup from './pages/groups/single';
import Events from './pages/events';
import Campaigns from './pages/campaigns';
import Profile from './pages/profile';
import SearchResults from './pages/search/searchResults';
import FindPeople from './pages/search/findPeople';
import AccountSetting from './pages/account/accountSettings';
import SavedItems from './pages/account/savedItems';
import ContributionsPanel from './pages/account/contributionsPanel';
import Notifications from './pages/account/notifications'
import { connect } from 'react-redux'
import Loading from './components/loaders/loadingItems'

function Routes(props) {
if(!props.auth.loading){
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={props.auth.isAuthenticated ? Feed : Home} />
      <PrivateRoute path="/contribute/book" component={AddBook} />
      <PrivateRoute path="/contribute/article" component={AddArticle} />
      <PrivateRoute path="/contribute/video" component={AddVideo} />
      <Route exact path="/books" component={Books} />
      <Route path="/books/:id" component={SingleBook} />
      <Route exact path="/articles" component={Articles} />
      <Route path="/articles/:id" component={SingleArticle} />
      <Route exact path="/videos" component={Videos} />
      <Route path="/videos/:id" component={SingleVideo} />
      <Route exact path="/groups" component={Groups} />
      <Route exact path="/groups/:id" component={SingleGroup} />
      <Route path="/groups/:id/chat" component={SingleGroup} />
      <Route path="/groups/:id/members" component={SingleGroup} />
      <Route path="/groups/:id/files" component={SingleGroup} />
      <Route path="/events" component={Events} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/search" component={SearchResults} />
      <PrivateRoute path="/find-people" component={FindPeople} />
      <PrivateRoute path="/saved" component={SavedItems} />
      <PrivateRoute path="/settings" component={AccountSetting} />
      <PrivateRoute path="/notifications" component={Notifications} />
      <PrivateRoute path="/contributions" component={ContributionsPanel} />
      <Route exact path="/:id" component={Profile} />
      <Route exact path="/:id/followers" component={Profile} />
      <Route exact path="/:id/following" component={Profile} />
      <Route exact path="/:id/collection" component={Profile} />
      <Route exact path="/:id/contributions" component={Profile} />
      <Route path="*" component={UnavailablePage} />
    </Switch>
  </Router>
  )
} else {
    return (
<Loading />
    )
}
}

const mapStateToProps = state => ({ auth: state.auth})

export default connect(mapStateToProps)(Routes)