import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome, QuizCard } from '../components';

export default function CandidateHome() {
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
          <QuizCard.Title>Your awesome quiz</QuizCard.Title>
          <QuizCard.ButtonLink to={ROUTES.QUIZ_DETAILS}>Start Quiz</QuizCard.ButtonLink>
        </QuizCard>
      </Welcome>
    </>
  );
}
