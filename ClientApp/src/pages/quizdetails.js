import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome, QuizCard, QuizQuestionCardBuilder, MultipleChoiceQuizCard } from '../components';

export default function QuizDetails() {
  //   const { user } = useContext(UserContext);
  const fakeQuizData = [
    {
      questionType: 'Multiple Choice',
      question: ['First Question'],
      answers: ['First Answer', 'Second Answer'],
    },
    {
      questionType: 'Text',
      question: ['Second Question'],
      answers: ['First Answer'],
    },
  ];

  const history = useHistory();
  //Can use useLocation to get state passed in via react router Link
  const data = useLocation();
  const [questionIndex, setQuestionIndex] = useState(0);
  const questionTitle = fakeQuizData[questionIndex].question;
  const questionAnswers = fakeQuizData[questionIndex].answers;

  console.log(data);

  /*
   <h1>Quiz Details page</h1>
      <QuizQuestionCardBuilder
        qName={'First Qustion'}
        qType={'Multiple Choice'}
      ></QuizQuestionCardBuilder>
  */

  const renderSwitch = (questionType) => {
    switch (questionType) {
      case 'Multiple Choice':
        return (
          <MultipleChoiceQuizCard questionTitle={questionTitle} questionAnswers={questionAnswers} />
        );
    }
  };
  console.log(fakeQuizData.length);
  const getNextQuestion = () => {
    questionIndex < fakeQuizData.length - 1 ? setQuestionIndex(questionIndex + 1) : null;
  };

  const getPrevQuestion = () => {
    questionIndex === 0 ? setQuestionIndex(0) : setQuestionIndex(questionIndex - 1);
  };

  return (
    <>
      <h1>Quiz Details page</h1>
      {renderSwitch('Multiple Choice')}
      <button onClick={getPrevQuestion}>Prev</button>
      <button onClick={getNextQuestion}>Next</button>
    </>
  );
}
