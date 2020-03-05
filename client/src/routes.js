import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Template from "./components/template";

// Telas
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

export default ({ auth }) => {
  const allRoutes = [
    {
      exact: true,
      path: "/",
      component: true ? Feed : Home
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

  return (
    <Router>
      <Switch>
        {allRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={props => {
                return (
                  <Template {...props}>
                    <route.component {...props} />
                  </Template>
                );
              }}
            />
          );
        })}
      </Switch>
    </Router>
  );
};
