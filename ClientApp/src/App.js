import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';

import './custom.css';

export default function App() {
  const user = null;

  return (
    <Router>
      <Switch>
        <Route path={ROUTES.SIGN_IN}>
          <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_IN} exact>
            <Signin />
          </IsUserRedirect>
        </Route>

        <Route path={ROUTES.SIGN_UP}>
          <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_UP} exact>
            <Signup />
          </IsUserRedirect>
        </Route>

        <ProtectedRoute user={user} path={ROUTES.HOME} exact>
          <Home />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}
