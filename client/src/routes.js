import React, { lazy,Suspense} from 'react';
import UnavailablePage from './pages/unavaliable'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route as OpenRoute, Switch } from 'react-router-dom'
import PrivateRoute from './components/auth/privateRoute'
import Template from './components/template'
import Loading from './components/loaders/loadingItems'

// Telas
<<<<<<< HEAD
const Home = lazy(() => import('./pages/home'))
const Feed = lazy(() => import('./pages/feed'))
const Books = lazy(() => import('./pages/library/books'))
const SingleBook = lazy(() => import('./pages/library/books/singleBook'))
const AddBook = lazy(() => import('./pages/library/books/addBook'))
const Articles = lazy(() => import('./pages/library/articles'))
const SingleArticle = lazy(() => import('./pages/library/articles/singleArticle'))
const AddArticle = lazy(() => import('./pages/library/articles/addArticle'))
const Videos = lazy(() => import('./pages/library/videos'))
const SingleVideo = lazy(() => import('./pages/library/videos/singleVideo'))
const AddVideo = lazy(() => import('./pages/library/videos/addVideo'))
const Groups = lazy(() => import('./pages/groups'))
const Events = lazy(() => import('./pages/events'))
const Projects = lazy(() => import('./pages/projects'))
const Profile = lazy(() => import('./pages/profile'))
const SearchResults = lazy(() => import('./pages/search/searchResults'))
const FindPeople = lazy(() => import('./pages/search/findPeople'))
const AccountSetting = lazy(() => import('./pages/account/settings'))
const Bookmarks = lazy(() => import('./pages/account/bookmarks'))
const ContributionsPanel = lazy(() => import('./pages/account/contributions'))
const Notifications = lazy(() => import('./pages/notifications'))
=======
import Home from "./pages/home";
import Feed from "./pages/feed";
import BooksOverview from "./pages/library/books";
import SingeBook from "./pages/library/books/SingleBook";
import ArticlesOverview from "./pages/library/articles";
import SingleArticle from "./pages/library/articles/SingleArticle";
import VideosOverview from "./pages/library/videos";
import SingleVideo from "./pages/library/videos/SingleVideo";
import Groups from "./pages/groups";
import Events from "./pages/events";
import Projects from "./pages/projects";
import Profile from "./pages/profiles";
import Notifications from "./pages/notifications";
import Messages from "./pages/messages";
>>>>>>> feature/new-template

const Routes = ({auth}) => {
  const allRoutes = [
    {
      exact: true,
      path: "/",
      component: auth.isAuthenticated ? Feed : Home
    }, {
      isPrivate: true,
      path: "/contribute/book",
      component: AddBook
    }, {
      isPrivate: true,
      path: "/contribute/article",
      component: AddArticle
    }, {
      isPrivate: true,
      path: "/contribute/video",
      component: AddVideo
    }, {
      exact: true,
      path: "/books",
      component: BooksOverview
    },
    {
      path: "/books/:id",
      component: SingeBook
    },
    {
      exact: true,
      path: "/articles",
      component: ArticlesOverview
    },
    {
      path: "/articles/:id",
      component: SingleArticle
    },
    {
      exact: true,
      path: "/videos",
      component: VideosOverview
    },
    {
      path: "/videos/:id",
      component: SingleVideo
    },
    {
      exact: true,
      path: "/groups",
      component: Groups
    }, {
      path: "/events",
      component: Events
    }, {
      path: "/projects",
      component: Projects
    }, {
      path: "/search",
      component: SearchResults
    }, {
      isPrivate: true,
      path: "/find-people",
      component: FindPeople
    }, {
      isPrivate: true,
      path: "/bookmarks",
      component: Bookmarks
    },
    {
      isPrivate: true,
      path: "/settings",
      component: AccountSetting
    }, {
      isPrivate: true,
      path: "/notifications",
      component: Notifications
    }, {
      isPrivate: true,
      path: "/contributions",
      component: ContributionsPanel
    }, {
      exact: true,
      path: "/:id",
      component: Profile
    },
    {
      exact: true,
      path: "/:id/followers",
      component: Profile
    }, {
      exact: true,
      path: "/:id/following",
      component: Profile
    }, {
      exact: true,
      path: "/:id/library",
      component: Profile
    }, {
      exact: true,
      path: "/:id/contributions",
      component: Profile
    }, {
      path: "*",
      component: UnavailablePage
    }
  ]

  return (
    <Router>
    <Switch>
      {allRoutes.map((route, index) => {
        const Route = route.isPrivate ? PrivateRoute : OpenRoute
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={props => {
              return (
                <Template {...props}>
                  <Suspense fallback={<Loading />}>
                    <route.component {...props} />
                  </Suspense>
                </Template>
              );
            }}
          />
        );
      })}
    </Switch>
  </Router>
  )
}

export default connect((state) => ({auth: state.auth}))(Routes)