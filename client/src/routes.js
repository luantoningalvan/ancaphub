import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Template from "./components/template";

// Telas
import Home from "./pages/home";
import Feed from "./pages/feed";
import Library from "./pages/library";
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
      path: "/library",
      component: Library
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
      path: "/profile",
      component: Profile
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
