import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Template from "../components/template";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import routeList from './routeList'
import LoadScreen from "../components/template/LoadScreen";

export default () => {
  const {isAuthenticated, loading} = useSelector(state => state.auth);

  return (
    <>
      {isAuthenticated !== null && !loading ? (
        <Router>
          <Switch>
            {routeList.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={props => {
                  if (!route.isOpen) {
                    if (!isAuthenticated) useHistory().push("/");

                    return (
                      <Template {...props}>
                        <route.component {...props} />
                      </Template>
                    );
                  }
                  if (isAuthenticated) useHistory().push("/home");

                  return <route.component {...props} />;
                }}
              />
            ))}
          </Switch>
        </Router>
      ) : (
        <LoadScreen />
      )}
    </>
  );
};
