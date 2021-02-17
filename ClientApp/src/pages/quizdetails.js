import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome, QuizCard } from '../components';

export default function CandidateHome() {
  //   const { user } = useContext(UserContext);
  const history = useHistory();

  const [questionIndex, setQuestionIndex] = useState(0);

  return (
    <>
      <h1>Quiz Details page</h1>
    </>
  );
}
