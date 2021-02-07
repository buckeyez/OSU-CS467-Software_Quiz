import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { UserContext } from './context/userContext';

import './custom.css';

export default function App() {
  const [user, setUser] = useState(null);
  // const user = null;

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={value}>
          <Route path={ROUTES.SIGN_IN}>
            <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_IN} exact>
              {user && <Signin />}
            </IsUserRedirect>
          </Route>

          <Route path={ROUTES.SIGN_UP}>
            <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_UP} exact>
              {user && <Signup />}
            </IsUserRedirect>
          </Route>

          <ProtectedRoute user={user} path={ROUTES.HOME} exact>
            <Home />
          </ProtectedRoute>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}
