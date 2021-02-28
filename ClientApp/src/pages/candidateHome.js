import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome, QuizCard } from '../components';
import { QuizDetails } from '../pages/quizdetails';

export default function CandidateHome() {
  const fakeQuizAssignment = {
    id: 99,
    quiz: {
      id: 1,
      name: 'Quiz 1',
    },
    user: {
      id: '81e13701-d3d7-4e0c-a82d-fb5b558f94cf',
      name: 'panmi',
      firstName: 'miao',
      lastName: 'pan',
      email: 'michellepana@gmail.com',
    },
    timeAllotment: 5,
  };

  //   const fakeQuizAssignments = [
  //     {
  //       id: 5,
  //       Name: 'Finance Quiz',
  //     },
  //     {
  //       id: 6,
  //       Name: 'English Quiz',
  //     },
  //   ];

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

  const quiz = fakeQuizAssignment.quiz;
  const candidate = fakeQuizAssignment.user;
  const allotment = fakeQuizAssignment.timeAllotment;

  return (
    <>
      <Welcome>
        <Welcome.Title>Welcome {candidate.name}</Welcome.Title>
        <Welcome.TextSmall>You have been assigned the following quiz(s). </Welcome.TextSmall>
        <QuizCard>
          {
            <div key={quiz.id}>
              <QuizCard.Title>{quiz.name}</QuizCard.Title>
              <QuizCard.ButtonLink
                to={{
                  pathname: ROUTES.QUIZ_DETAILS,
                  state: {
                    candidate: candidate,
                    quiz: quiz,
                    allotment: allotment,
                  },
                }}
              >
                Start Quiz
              </QuizCard.ButtonLink>
            </div>
          }
        </QuizCard>
      </Welcome>
    </>
  );
}
