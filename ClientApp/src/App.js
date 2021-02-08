import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import SoftwareQuiz from './pages/SoftwareQuiz';
import AddQuestions from './pages/addquestions';
import Layout from './components/Layout';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { UserContext } from './context/userContext';

import './custom.css';

export default function App() {
  const [user, setUser] = useState(null);
  // const user = null;

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    //Check to see if there is a userData key in local storage
    //If so, we can use it to set the user
    //This is a very insecure way to tracking a user session. You can fake the userData key/val pair and get access
    //Will have to fix this for real after
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <UserContext.Provider value={value}>
            <Route path={ROUTES.SIGN_IN}>
              <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_IN} exact>
                {<Signin />}
              </IsUserRedirect>
            </Route>

            <Route path={ROUTES.SIGN_UP}>
              <IsUserRedirect user={user} loggedInPath={ROUTES.HOME} path={ROUTES.SIGN_UP} exact>
                {<Signup />}
              </IsUserRedirect>
            </Route>

            <ProtectedRoute user={user} path={ROUTES.HOME} exact>
              <Home />
            </ProtectedRoute>

            <ProtectedRoute user={user} path={ROUTES.SOFTWARE_QUIZ} exact>
              <SoftwareQuiz />
            </ProtectedRoute>

            <Route path="/new-quiz" component={AddQuestions} />
          </UserContext.Provider>
        </Switch>
      </Layout>
    </Router>
  );
}
