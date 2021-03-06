import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
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
import SubmissionComplete from './pages/submissionComplete';
import CandidateRankingsPage from './pages/quizResults.js';
import CandidateResultPage from './pages/candidateResult.js';

import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute, CandidateProtectedRoute } from './helpers/routes';
import { UserContext } from './context/userContext';
import { CandidateContext } from './context/candidateContext';
import queryString from 'query-string';

import './custom.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [candidateUser, setCandidateUser] = useState(null);
  // const user = null;

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const candidateValue = useMemo(() => ({ candidateUser, setCandidateUser }), [
    candidateUser,
    setCandidateUser,
  ]);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const isCandidate = queryParams.key ? true : false;

  useEffect(() => {
    if (queryParams.key) {
      setCandidateUser(true);
    }

    //Check to see if there is a userData key in local storage
    //If so, we can use it to set the user
    //This is a very insecure way to tracking a user session. You can fake the userData key/val pair and get access
    //Will have to fix this for real after
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUser(userData);
    }
  }, [queryParams.key]);

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

            <ProtectedRoute user={user} path={ROUTES.QUIZ_RESULTS} exact>
              <CandidateRankingsPage />
            </ProtectedRoute>

            <ProtectedRoute user={true} path={ROUTES.CANDIDATE_RESULT} exact>
              <CandidateResultPage />
            </ProtectedRoute>

            {/*Need a better way to verify if user is candidate quiz taker
             *Can likely use the user object to check if quizes are avaliable
             *Will need a custom implementation of CandidateProductedRoute
             */}

            <CandidateContext.Provider value={candidateValue}>
              <CandidateProtectedRoute user={isCandidate} path={ROUTES.CANDIDATE_HOME} exact>
                <CandidateHome />
              </CandidateProtectedRoute>

              <CandidateProtectedRoute user={isCandidate} path={ROUTES.QUIZ_DETAILS} exact>
                <QuizDetails />
              </CandidateProtectedRoute>

              <CandidateProtectedRoute user={isCandidate} path={ROUTES.SUBMITTED} exact>
                <SubmissionComplete />
              </CandidateProtectedRoute>
            </CandidateContext.Provider>

            {/* {candidateUser && (
              <CandidateContext.Provider value={candidateValue}>
                <CandidateProtectedRoute user={candidateUser} path={ROUTES.CANDIDATE_HOME} exact>
                  <CandidateHome />
                </CandidateProtectedRoute>

                <Route path={ROUTES.QUIZ_DETAILS} component={QuizDetails} />
              </CandidateContext.Provider>
            )} */}

            <Route path="/new-quiz" component={AddQuestions} />

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
