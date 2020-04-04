import Home from "../pages/home";
import Feed from "../pages/feed";
import BooksOverview from "../pages/library/books";
import SingeBook from "../pages/library/books/SingleBook";
import ArticlesOverview from "../pages/library/articles";
import SingleArticle from "../pages/library/articles/SingleArticle";
import VideosOverview from "../pages/library/videos";
import SingleVideo from "../pages/library/videos/SingleVideo";
import Groups from "../pages/groups";
import SingleGroup from "../pages/groups/SingleGroup";
import Events from "../pages/events";
import Projects from "../pages/projects";
import Profile from "../pages/profiles";
import Notifications from "../pages/notifications";
import Messages from "../pages/messages";
import Contributions from "../pages/account/Contributions";
import Bookmarks from "../pages/account/Bookmarks";
import Settings from "../pages/account/settings";

export default [
  {
    isOpen: true,
    exact: true,
    path: "/",
    component: Home
  },
  {
    exact: true,
    path: "/home",
    component: Feed
  },
  {
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
  },
  {
    path: "/groups/:id",
    component: SingleGroup
  },
  {
    exact: true,
    path: "/events",
    component: Events
  },
  {
    exact: true,
    path: "/projects",
    component: Projects
  },
  {
    exact: true,
    path: "/contributions",
    component: Contributions
  },
  {
    exact: true,
    path: "/bookmarks",
    component: Bookmarks
  },
  {
    exact: true,
    path: "/settings",
    component: Settings
  },
  {
    exact: true,
    path: "/notifications",
    component: Notifications
  },
  {
    exact: true,
    path: "/messages",
    component: Messages
  },
  {
    exact: true,
    path: "/:id",
    component: Profile
  },
  {
    path: "/:id/contributions",
    component: Profile
  },
  {
    path: "/:id/collection",
    component: Profile
  },
  {
    path: "/:id/followers",
    component: Profile
  },
  {
    path: "/:id/following",
    component: Profile
  }
];