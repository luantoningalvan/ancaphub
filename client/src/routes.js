import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UnavailablePage from './pages/unavaliable';
import PrivateRoute from './components/auth/privateRoute';
import { connect } from 'react-redux'
import Loading from './components/loaders/loadingItems'

// Telas
const Home = lazy(() => import ('./pages/home'))
const Feed = lazy(() => import ('./pages/feed'))
const Books = lazy(() => import ('./pages/library/books'))
const SingleBook = lazy(() => import ('./pages/library/books/singleBook'))
const AddBook = lazy(() => import ('./pages/library/books/addBook'))
const Articles = lazy(() => import ('./pages/library/articles'))
const SingleArticle = lazy(() => import ('./pages/library/articles/singleArticle'))
const AddArticle = lazy(() => import ('./pages/library/articles/addArticle'))
const Videos = lazy(() => import ('./pages/library/videos'))
const SingleVideo = lazy(() => import ('./pages/library/videos/singleVideo'))
const AddVideo = lazy(() => import ('./pages/library/videos/addVideo'))
const Groups = lazy(() => import ('./pages/groups'))
const Events = lazy(() => import ('./pages/events'))
const Projects = lazy(() => import ('./pages/projects'))
const Profile = lazy(() => import ('./pages/profile'))
const SearchResults = lazy(() => import ('./pages/search/searchResults'))
const FindPeople = lazy(() => import ('./pages/search/findPeople'))
const AccountSetting = lazy(() => import ('./pages/account/accountSettings'))
const Bookmarks = lazy(() => import ('./pages/account/bookmarks'))
const ContributionsPanel = lazy(() => import ('./pages/account/contributionsPanel'))
const Notifications = lazy(() => import ('./pages/notifications'))


function Routes(props) {
if(!props.auth.loading){
  return (
    <Router>
    <Suspense fallback={<Loading />}>
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
      <Route path="/events" component={Events} />
      <Route path="/projects" component={Projects} />
      <Route path="/search" component={SearchResults} />
      <PrivateRoute path="/find-people" component={FindPeople} />
      <PrivateRoute path="/bookmarks" component={Bookmarks} />
      <PrivateRoute path="/settings" component={AccountSetting} />
      <PrivateRoute path="/notifications" component={Notifications} />
      <PrivateRoute path="/contributions" component={ContributionsPanel} />
      <Route exact path="/:id" component={Profile} />
      <Route exact path="/:id/followers" component={Profile} />
      <Route exact path="/:id/following" component={Profile} />
      <Route exact path="/:id/library" component={Profile} />
      <Route exact path="/:id/contributions" component={Profile} />
      <Route path="*" component={UnavailablePage} />
      </Switch>
    </Suspense>
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