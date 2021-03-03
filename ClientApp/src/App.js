import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import SoftwareQuiz from './pages/SoftwareQuiz';
import AddQuestions from './pages/addquestions';
import CandidateHome from './pages/candidateHome';
import QuizDetails from './pages/quizdetails';
import Layout from './components/Layout';
import Quiz from './components/Quiz';
import AddCandidates from './pages/addCandidates';
import EditProfile from './pages/editProfile';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute, CandidateProtectedRoute } from './helpers/routes';
import { UserContext } from './context/userContext';

import './custom.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [quizTaker /*, setQuizTaker*/] = useState(true);
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

  //Need to fix nav bar so it does not show up on Canadidate view
  //Can use something like this to fix it {quizTaker && <Layout> </Layout>}
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

            <ProtectedRoute user={user} path={ROUTES.EDIT_PROFILE} exact>
              <EditProfile />
            </ProtectedRoute>

            <ProtectedRoute user={user} path={ROUTES.SOFTWARE_QUIZ} exact>
              <SoftwareQuiz />
            </ProtectedRoute>

            {/*Need a better way to verify if user is candidate quiz taker
             *Can likely use the user object to check if quizes are avaliable
             *Will need a custom implementation of CandidateProductedRoute
             */}
            <CandidateProtectedRoute user={quizTaker} path={ROUTES.CANDIDATE_HOME} exact>
              <CandidateHome />
            </CandidateProtectedRoute>

            <Route path="/new-quiz" component={AddQuestions} />
            <Route path={ROUTES.QUIZ_DETAILS} component={QuizDetails} />

            <ProtectedRoute user={user} path={ROUTES.QUESTIONS} exact>
              <AddQuestions />
            </ProtectedRoute>

            <ProtectedRoute user={user} path={ROUTES.QUIZZES} exact>
              <Quiz />
            </ProtectedRoute>

            <ProtectedRoute user={user} path={ROUTES.CANDIDATES} exact>
              <AddCandidates />
            </ProtectedRoute>

            {/* <Route path="/new-quiz" component={AddQuestions} /> */}
            {/* <Route path="/quiz" component={Quiz} /> */}
          </UserContext.Provider>
        </Switch>
      </Layout>
    </Router>
  );
}
