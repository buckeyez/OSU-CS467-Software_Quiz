import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {
  MultipleChoiceQuizCard,
  OpenTextQuizCard,
  TrueFalseQuizCard,
  Timer,
  MainQuiz,
} from '../components';
import { getQuizQuestions } from '../utils/getQuizQuestions';
//import { submitQuiz } from '../utils/submitQuiz';
import { generateAnswersArrayForSubmission } from '../utils/generateAnswersArray';

export default function QuizDetails() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionAndAnswerMap, setQuestionAndAnswerMap] = useState(new Map());
  //const [timeToCompleteQuiz, setTimeToCompleteQuiz] = useState('');
  //   const [quizTimeUp, setQuizTimeUp] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [error, setError] = useState(false);

  //Can use useLocation to get state passed in via react router Link
  const data = useLocation();
  console.log('dat>>>>', data);

  //Handles loading quiz questions from the API
  useEffect(() => {
    const fetchData = async () => {
      if (!data.state) {
        //pass
      } else {
        console.log('in hereee!!');
        const quizToGrab = data.state.quiz;

        //Takes a temporary param right now as quizID
        const r = await getQuizQuestions(quizToGrab.id);
        setQuizData(r);
        if (r.questions.length === 1) {
          setShowSubmitButton(true);
        } else {
          setShowSubmitButton(false);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [data.state]);

  const history = useHistory();

  if (!data.state) {
    return <span>No quiz data to load...</span>;
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  const timeAllotment = data.state.allotment;

  const handleQuizTimeUp = (minutes, seconds) => {
    // setQuizTimeUp(true);
    // setTimeToCompleteQuiz(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
    console.log('TIMES UPP!!!!');
    let t = new Date(minutes, seconds);
    console.log('time is:', t);
  };

  console.log(quizData);
  let questionType = quizData.questions[questionIndex].question.type;
  let questionTitle = quizData.questions[questionIndex].question.value;
  let questionAnswers = quizData.questions[questionIndex].answers;
  let numberOfQuestions = quizData.questions.length;

  const updateQuestionAndAnswersMap = (answerID) => {
    setQuestionAndAnswerMap(new Map(questionAndAnswerMap.set(questionIndex, answerID)));
    console.log('map of Q:A ', questionAndAnswerMap);
  };

  const updateQuestionAndAnswersMapFreeResponse = (e) => {
    setQuestionAndAnswerMap(new Map(questionAndAnswerMap.set(questionIndex, e.target.value)));
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
      case 'True or False':
        return (
          <TrueFalseQuizCard
            questionTitle={questionTitle}
            questionAnswers={questionAnswers}
            updateQuestionAndAnswersMap={updateQuestionAndAnswersMap}
            questionAndAnswerMap={questionAndAnswerMap}
            questionIndex={questionIndex}
          />
        );
      default:
        return;
    }
  };
  console.log(numberOfQuestions);
  const getNextQuestion = () => {
    if (questionIndex < numberOfQuestions - 1) {
      setQuestionIndex(questionIndex + 1);
    }

    if (questionIndex === numberOfQuestions - 2) {
      setShowSubmitButton(true);
    }
  };

  const getPrevQuestion = () => {
    if (questionIndex === 0) {
      setQuestionIndex(0);
    } else {
      setQuestionIndex(questionIndex - 1);
    }

    if (showSubmitButton) {
      setShowSubmitButton(false);
    }
    if (error) {
      setError(false);
    }
  };

  const submitQuiz = async () => {
    if (questionAndAnswerMap.size !== numberOfQuestions) {
      setError(true);
    } else {
      setError(false);

      //Need to generate user selections array
      console.log('ANSWES ARRY', generateAnswersArrayForSubmission(questionAndAnswerMap, quizData));

      //Need to pass quiz assignment id

      //Need to pass time taken (as int??)

      //Need to make call to /submit api to save results

      //Need to make call to E-mail API to send email to employer

      //Can either route to home, or show quiz completion page.
      //If route to home, we can show banner or drop confetti
      //Need to pass key in redirect, else candidate-home stuck on 'loading...'
      history.push(ROUTES.CANDIDATE_HOME);
    }
  };

  return (
    <MainQuiz>
      <MainQuiz.Title>You are taking {quizData.name} Quiz</MainQuiz.Title>
      <MainQuiz.TimeArea>
        {<Timer handleQuizTimeUp={handleQuizTimeUp} quizStartTime={timeAllotment}></Timer>}
      </MainQuiz.TimeArea>

      <MainQuiz.Card>{renderSwitch(questionType)}</MainQuiz.Card>
      <MainQuiz.Button disabled={numberOfQuestions === 1 ? true : false} onClick={getPrevQuestion}>
        Prev
      </MainQuiz.Button>

      {showSubmitButton === false ? (
        <MainQuiz.Button onClick={getNextQuestion}>Next</MainQuiz.Button>
      ) : (
        <MainQuiz.Button onClick={submitQuiz}>Submit</MainQuiz.Button>
      )}
      <MainQuiz.Error>
        {error === false ? null : <p>Not all quiz questions have been answered</p>}
      </MainQuiz.Error>
    </MainQuiz>
  );
}
