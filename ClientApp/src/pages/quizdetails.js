import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {
  Welcome,
  QuizCard,
  QuizQuestionCardBuilder,
  MultipleChoiceQuizCard,
  OpenTextQuizCard,
} from '../components';
import { getQuizQuestions } from '../utils/getQuizQuestions';

export default function QuizDetails() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const r = await getQuizQuestions(4);
      setQuizData(r);
      setLoading(false);
    };
    fetchData();
  }, [questionIndex]);

  const history = useHistory();
  //Can use useLocation to get state passed in via react router Link
  const data = useLocation();
  //   console.log(data);

  if (loading) {
    return <span>Loading...</span>;
  }

  console.log(quizData);
  let questionType = quizData.questions[questionIndex].question.type;
  let questionTitle = quizData.questions[questionIndex].question.value;
  let questionAnswers = quizData.questions[questionIndex].answers;
  let numberOfQuestions = quizData.questions.length;

  const renderSwitch = (questionType) => {
    switch (questionType) {
      case 'Multiple Choice':
        return (
          <MultipleChoiceQuizCard questionTitle={questionTitle} questionAnswers={questionAnswers} />
        );
      case 'Free Response':
        return <OpenTextQuizCard questionTitle={questionTitle} questionAnswers={questionAnswers} />;
    }
  };
  console.log(numberOfQuestions);
  const getNextQuestion = () => {
    questionIndex < numberOfQuestions - 1 ? setQuestionIndex(questionIndex + 1) : null;
  };

  const getPrevQuestion = () => {
    questionIndex === 0 ? setQuestionIndex(0) : setQuestionIndex(questionIndex - 1);
  };

  return (
    <>
      <h1>Quiz Details page</h1>
      {renderSwitch(questionType)}
      <button onClick={getPrevQuestion}>Prev</button>
      <button onClick={getNextQuestion}>Next</button>
    </>
  );
}
