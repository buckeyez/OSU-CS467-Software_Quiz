import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import SoftwareQuiz from './pages/SoftwareQuiz';
import AddQuestions from './pages/addquestions';
import Layout from './components/Layout';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';

import './custom.css';

function App() {
  const user = null;

  return (
    
      <Router>
        <Layout>
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

          <Route path='/software-quiz' component={SoftwareQuiz} />
          <Route path='/new-quiz' component={AddQuestions} />
        </Switch>
        </Layout>
      </Router>
   
  );
}

export default withRouter(App);
