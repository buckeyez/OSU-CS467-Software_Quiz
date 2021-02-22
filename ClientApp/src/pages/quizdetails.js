import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {
  MultipleChoiceQuizCard,
  OpenTextQuizCard,
  TrueFalseQuizCard,
  Timer,
  Quiz,
} from '../components';
import { getQuizQuestions } from '../utils/getQuizQuestions';

export default function QuizDetails() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionAndAnswerMap, setQuestionAndAnswerMap] = useState(new Map());
  const [timeToCompleteQuiz, setTimeToCompleteQuiz] = useState('');
  const [quizTimeUp, setQuizTimeUp] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [error, setError] = useState(false);

  //Handles loading quiz questions from the API
  useEffect(() => {
    const fetchData = async () => {
      const r = await getQuizQuestions(5);
      setQuizData(r);

      setLoading(false);
    };
    fetchData();
  }, []);

  const history = useHistory();
  //Can use useLocation to get state passed in via react router Link
  const data = useLocation();
  //   console.log(data);

  if (loading) {
    return <span>Loading...</span>;
  }

  const handleQuizTimeUp = (minutes, seconds) => {
    setQuizTimeUp(true);
    // setTimeToCompleteQuiz(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
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
            updateQuestionAndAnswersMap={updateQuestionAndAnswersMap}
            questionAndAnswerMap={questionAndAnswerMap}
            questionIndex={questionIndex}
          />
        );
    }
  };
  console.log(numberOfQuestions);
  const getNextQuestion = () => {
    questionIndex < numberOfQuestions - 1 ? setQuestionIndex(questionIndex + 1) : null;

    if (questionIndex === numberOfQuestions - 2) {
      setShowSubmitButton(true);
    }

    //Handle check to see if all questions have been asnwered
    //size of questionAndAnswerMap === numberOfQuestions

    //Handle check to see if this is last question, if so, show Submut button
    //Submit button should route to quiz submission page
  };

  const getPrevQuestion = () => {
    questionIndex === 0 ? setQuestionIndex(0) : setQuestionIndex(questionIndex - 1);
    if (showSubmitButton) {
      setShowSubmitButton(false);
    }
    if (error) {
      setError(false);
    }
  };

  const submitQuiz = () => {
    if (questionAndAnswerMap.size !== numberOfQuestions) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Quiz>
      <Quiz.Title>You are taking {quizData.name} Quiz</Quiz.Title>
      <Quiz.TimeArea>
        {<Timer handleQuizTimeUp={handleQuizTimeUp} quizStartTime={10}></Timer>}
      </Quiz.TimeArea>

      <Quiz.Card>{renderSwitch(questionType)}</Quiz.Card>
      <Quiz.Button onClick={getPrevQuestion}>Prev</Quiz.Button>

      {showSubmitButton === false ? (
        <Quiz.Button onClick={getNextQuestion}>Next</Quiz.Button>
      ) : (
        <Quiz.Button onClick={submitQuiz}>Submit</Quiz.Button>
      )}
      <Quiz.Error>
        {error === false ? null : <p>Not all quiz questions have been answered</p>}
      </Quiz.Error>
    </Quiz>

    // <>
    //   <h1>You are taking the {quizData.name} Quiz</h1>
    //   <h4>
    //     Time Remaining: {<Timer handleQuizTimeUp={handleQuizTimeUp} quizStartTime={10}></Timer>}
    //   </h4>
    //   {renderSwitch(questionType)}
    //   <button onClick={getPrevQuestion}>Prev</button>
    //   {showSubmitButton === false ? (
    //     <button onClick={getNextQuestion}>Next</button>
    //   ) : (
    //     <button onClick={submitQuiz}>Submit</button>
    //   )}
    //   {error === false ? null : <p>Not all quiz questions have been answered</p>}
    // </>
  );
}
