import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome, QuizCard } from '../components';
import { QuizDetails } from '../pages/quizdetails';

export default function CandidateHome() {
  const fakeQuizAssignments = [
    {
      id: 5,
      Name: 'Finance Quiz',
    },
    {
      id: 6,
      Name: 'English Quiz',
    },
  ];

  //   const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    //Have API call to pull quizes for candidate after they land on this page from their email
  });

  /*TODO: Refactor this code so that we are dynamically obtaining the number of
   * of quizes assigned to the user. Right now its hard coded. You'd ideally
   * want to map over the number of quizes on the user object, and then render
   * each QuizCard component.
   */

  return (
    <>
      <Welcome>
        <Welcome.Title>Welcome [NAME HERE] </Welcome.Title>
        <Welcome.TextSmall>You have been assigned the following quiz(s). </Welcome.TextSmall>
        <QuizCard>
          {fakeQuizAssignments.map((quiz) => {
            return (
              <div key={quiz.id}>
                <QuizCard.Title>{quiz.Name}</QuizCard.Title>
                <QuizCard.ButtonLink
                  to={{
                    pathname: ROUTES.QUIZ_DETAILS,
                    state: {
                      name:
                        'PASS CANDIDATE ID AND QUIZ ID HERE TO GET QUIIZ QUESTIONS ON QUIZ DETAILS PAGE',
                    },
                  }}
                >
                  Start Quiz
                </QuizCard.ButtonLink>
              </div>
            );
          })}
        </QuizCard>
      </Welcome>
    </>
  );
}
