import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { MultipleChoiceQuizCard, OpenTextQuizCard, TrueFalseQuizCard, Timer } from '../components';
import { getQuizQuestions } from '../utils/getQuizQuestions';

export default function QuizDetails() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionAndAnswerMap, setQuestionAndAnswerMap] = useState(new Map());
  const [quizTimeUp, setQuizTimeUp] = useState(false);

  //Handles loading quiz questions from the API
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

  const handleQuizTimeUp = () => {
    setQuizTimeUp(true);
    console.log('TIMES UPP!!!!');
  };

  console.log(quizData);
  let questionType = quizData.questions[questionIndex].question.type;
  let questionTitle = quizData.questions[questionIndex].question.value;
  let questionAnswers = quizData.questions[questionIndex].answers;
  let numberOfQuestions = quizData.questions.length;

  const updateQuestionAndAnswersMap = (answerID) => {
    setQuestionAndAnswerMap(questionAndAnswerMap.set(questionIndex, answerID));
    console.log('map of Q:A ', questionAndAnswerMap);
  };

  const updateQuestionAndAnswersMapFreeResponse = (e) => {
    setQuestionAndAnswerMap(questionAndAnswerMap.set(questionIndex, e.target.value));
    console.log('map of Q:A ', questionAndAnswerMap);
  };

  const updateQuestionAndAnswersMapTF = (answerTF) => {
    setQuestionAndAnswerMap(questionAndAnswerMap.set(questionIndex, answerTF));
    console.log('map of Q:A ', questionAndAnswerMap);
  };

  const renderSwitch = (questionType) => {
    switch (questionType) {
      case 'Multiple Choice':
        return (
          <MultipleChoiceQuizCard
            questionTitle={questionTitle}
            questionAnswers={questionAnswers}
            updateQuestionAndAnswersMap={updateQuestionAndAnswersMap}
            questionAndAnswerMap={questionAndAnswerMap}
            questionIndex={questionIndex}
          />
        );
      case 'Free Response':
        return (
          <OpenTextQuizCard
            questionTitle={questionTitle}
            questionAnswers={questionAnswers}
            updateQuestionAndAnswersMapFreeResponse={updateQuestionAndAnswersMapFreeResponse}
            questionAndAnswerMap={questionAndAnswerMap}
            questionIndex={questionIndex}
          />
        );
      case 'True OR False':
        return (
          <TrueFalseQuizCard
            questionTitle={questionTitle}
            questionAnswers={questionAnswers}
            updateQuestionAndAnswersMapTF={updateQuestionAndAnswersMapTF}
            questionAndAnswerMap={questionAndAnswerMap}
            questionIndex={questionIndex}
          />
        );
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
      <h1>You are taking the {quizData.name} Quiz</h1>
      <h4>Time Remaining: {<Timer handleQuizTimeUp={handleQuizTimeUp}></Timer>}</h4>
      {renderSwitch(questionType)}
      <button onClick={getPrevQuestion}>Prev</button>
      <button onClick={getNextQuestion}>Next</button>
    </>
  );
}
