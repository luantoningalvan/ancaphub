import React, { useEffect } from 'react';
import LoadContent from '../components/loader/loadContent'
import Template from '../components/template'
import { openRoutes, closedRoutes } from './allRoutes'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from '../actions/authActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import setAuthToken from '../utils/setAuthToken';

const Routes = ({ auth, loadUser }) => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    loadUser()
  }, [loadUser])

  const routes = auth.isAuthenticated ? closedRoutes : openRoutes

  return (
    <LoadContent loading={auth.loading}>
      <Router>
        <Switch>
          {routes.map((route, index) =>
            <Route
              exact={route.exact}
              path={route.path}
              key={index}
              component={(props) =>
                <>
                  {route.noTemplate ? (
                    <route.component {...props} />
                  ) : (
                      <Template>
                        <route.component {...props} />
                      </Template>
                    )}
                </>
              }
            />
          )}
        </Switch>
      </Router>
    </LoadContent>
  );
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDisptachToProps = dispatch => bindActionCreators({ loadUser }, dispatch)
export default connect(mapStateToProps, mapDisptachToProps)(Routes)