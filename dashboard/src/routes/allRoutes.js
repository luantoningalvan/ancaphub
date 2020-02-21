import Dashboard from '../pages/dashboard';
import Collection from '../pages/library';
import BookForm from '../pages/library/books/bookFormPage';
import ArticleForm from '../pages/library/articles/articleFormPage';
import VideoForm from '../pages/library/videos/videoFormPage';
import Settings from '../pages/settings';
import Users from '../pages/users';
import SingleUser from '../pages/users/single';
import Categories from '../pages/categories';
import SignIn from '../pages/auth/signIn';

const closedRoutes = [
  {
    exact: true,
    path: "/",
    component: Dashboard
  },
  {
    exact: true,
    path: "/collection",
    component: Collection
  },
  {
    exact: false,
    path: "/collection/book/add/",
    component: BookForm
  },
  {
    exact: false,
    path: "/collection/book/edit/:id",
    component: BookForm
  },
  {
    exact: false,
    path: "/collection/article/add/",
    component: ArticleForm
  },
  {
    exact: false,
    path: "/collection/article/edit/:id",
    component: ArticleForm
  },
  {
    exact: false,
    path: "/collection/video/add/",
    component: VideoForm
  },
  {
    exact: false,
    path: "/collection/video/edit/:id",
    component: VideoForm
  },
  {
    exact: true,
    path: "/categories",
    component: Categories
  },
  {
    exact: true,
    path: "/users",
    component: Users
  },
  {
    exact: true,
    path: "/users/:id",
    component: SingleUser
  },
  {
    exact: true,
    path: "/settings",
    component: Settings
  }
]

const openRoutes = [
  {
    exact: true,
    path: "",
    component: SignIn,
    noTemplate: true,
  }
]

export { openRoutes, closedRoutes }