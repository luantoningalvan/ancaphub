import Home from "../pages/home";
import Feed from "../pages/feed";
import Library from "../pages/library";
import SingeBook from "../pages/library/SingleBook";
import SingleArticle from "../pages/library/SingleArticle";
import SingleVideo from "../pages/library/SingleVideo";
import Groups from "../pages/groups";
import Users from "../pages/users";
import SingleGroup from "../pages/groups/SingleGroup";
import Events from "../pages/events";
import Projects from "../pages/projects";
import Profile from "../pages/profiles";
import Notifications from "../pages/notifications";
import Messages from "../pages/messages";
import Contributions from "../pages/account/Contributions";
import Bookmarks from "../pages/account/Bookmarks";
import Settings from "../pages/account/settings";
import SearchData from "../pages/search/SearchData";
import NearbyUsers from "../pages/search/SearchNearbyUsers";

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
    path: "/library/:type?",
    component: Library
  },
  {
    path: "/library/books/:id",
    component: SingeBook
  },
  {
    path: "/library/articles/:id",
    component: SingleArticle
  },
  {
    path: "/library/videos/:id",
    component: SingleVideo
  },
  {
    exact: true,
    path: "/groups",
    component: Groups
  },
  {
    exact: true,
    path: "/users",
    component: Users
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
    path: "/search",
    component: SearchData
  },
  {
    exact: true,
    path: "/nearby",
    component: NearbyUsers
  },
  {
    exact: true,
    path: "/:id/:page?",
    component: Profile
  },
];