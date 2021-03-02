import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {
  MultipleChoiceQuizCard,
  OpenTextQuizCard,
  TrueFalseQuizCard,
  SelectAllQuizCard,
  Timer,
  MainQuiz,
} from '../components';
import { getQuizQuestions } from '../utils/getQuizQuestions';
import { submitQuizToBackend } from '../utils/submitQuiz';
import { generateAnswersArrayForSubmission } from '../utils/generateAnswersArray';
import { areAllQuestionsAnswered } from '../utils/checkIfAllQuestionsAnswered';
import { checkAnswersIfOutOfTime } from '../utils/checkAnswersIfOutOfTime';

export default function QuizDetails() {
  //Can use useLocation to get state passed in via react router Link
  const data = useLocation();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionAndAnswerMap, setQuestionAndAnswerMap] = useState(new Map());
  const [timeToCompleteQuiz, setTimeToCompleteQuiz] = useState(data.state.allotment);
  //   const [quizTimeUp, setQuizTimeUp] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [error, setError] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  //   console.log('Data from candidate-home route:', data);

  //Handles loading quiz questions from the API
  useEffect(() => {
    const fetchData = async () => {
      if (!data.state) {
        //pass
      } else {
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

  useEffect(() => {
    const submit = async () => {
      if (quizData !== null) {
        const userSelections = generateAnswersArrayForSubmission(questionAndAnswerMap, quizData);

        try {
          const submission = await submitQuizToBackend(
            data.state.quizAssignment,
            timeToCompleteQuiz,
            userSelections
          );
          if (submission) {
            console.log('submission returned>>>');
            console.log(submission);
          }
        } catch (e) {
          console.log('Error submititon quiz: ', e);
        }
      }
    };
    submit();
  }, [quizSubmitted]);

  const history = useHistory();

  if (!data.state) {
    return <span>No quiz data to load...</span>;
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  const timeAllotment = data.state.allotment;

  //   console.log(Information about loaded Quiz: quizData);
  let questionType = quizData.questions[questionIndex].question.type;
  let questionTitle = quizData.questions[questionIndex].question.value;
  let questionAnswers = quizData.questions[questionIndex].answers;
  let numberOfQuestions = quizData.questions.length;

  const updateQuestionAndAnswersMap = (answerID) => {
    setQuestionAndAnswerMap(new Map(questionAndAnswerMap.set(questionIndex, [answerID])));
    console.log('map of Q:A ', questionAndAnswerMap);
  };

  const updateQuestionAndAnswersMapFreeResponse = (e) => {
    setQuestionAndAnswerMap(new Map(questionAndAnswerMap.set(questionIndex, e.target.value)));
    console.log('map of Q:A ', questionAndAnswerMap);
  };

  //   console.log(
  //     'IF OUT OF TIME QuestionANSWERS MAP',
  //     checkAnswersIfOutOfTime(questionAndAnswerMap, numberOfQuestions)
  //   );

  const updateQuestionAndAnswersMapSelectMultiple = (answerID) => {
    // console.log('CALLING MULTI SELECT MAP');
    let currentAnswersIds = questionAndAnswerMap.get(questionIndex);
    let arrayOfAnswersIds = [];
    //The first time, there is no array present at key=questionIndex
    if (currentAnswersIds === undefined) {
      arrayOfAnswersIds = [answerID];
    } else if (currentAnswersIds.includes(answerID)) {
      //   console.log('Removing exisitn value');

      arrayOfAnswersIds = currentAnswersIds.filter((item) => {
        return item !== answerID;
      });
    } else {
      //   console.log('Adding another value');
      arrayOfAnswersIds = currentAnswersIds;
      arrayOfAnswersIds.push(answerID);
    }
    setQuestionAndAnswerMap(new Map(questionAndAnswerMap.set(questionIndex, arrayOfAnswersIds)));
    console.log('map of Q:A ', questionAndAnswerMap);
  };

  const handleQuizTimeUp = (minutes, seconds) => {
    // setQuizTimeUp(true);
    // setTimeToCompleteQuiz(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
    console.log('TIMES UPP!!!!');
    console.log(`Min=${minutes} and Sec=${seconds}`);
    let t = new Date(0, minutes, seconds);
    console.log('time is:', t);
    setTimeToCompleteQuiz(minutes);
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
      case 'Select All That Apply':
        return (
          <SelectAllQuizCard
            questionTitle={questionTitle}
            questionAnswers={questionAnswers}
            updateQuestionAndAnswersMapSelectMultiple={updateQuestionAndAnswersMapSelectMultiple}
            questionAndAnswerMap={questionAndAnswerMap}
            questionIndex={questionIndex}
          />
        );
      default:
        return;
    }
  };
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
    // let isNotAllQuestionsAnswered = false;

    // if (questionAndAnswerMap.size !== numberOfQuestions) {
    //   isNotAllQuestionsAnswered = true;
    // }

    // for (let [k, v] of questionAndAnswerMap) {
    //   const value = questionAndAnswerMap.get(k);
    //   //check if string
    //   if (typeof value === String) {
    //     if (value === '') {
    //       isNotAllQuestionsAnswered = true;
    //     }
    //   }

    //   if (Array.isArray(v)) {
    //     if (questionAndAnswerMap.get(k).length === 0) {
    //       isNotAllQuestionsAnswered = true;
    //     }
    //   }
    // }

    if (areAllQuestionsAnswered(questionAndAnswerMap, numberOfQuestions)) {
      //   console.log('ALL Qs NOT ANSWERED');
      setError(true);
    } else {
      setError(false);
      //   console.log('ALL QS ANSWRED');
      //Need to generate user selections array
      console.log(
        'userSelections Array:',
        generateAnswersArrayForSubmission(questionAndAnswerMap, quizData)
      );
      console.log(`Quiz took ${timeToCompleteQuiz} min to complete`);
      setQuizSubmitted(true);

      //Call this when user is pushed to the Thanks for Submitting Quiz Screen
      //   history.replace('/quiz-details', null);

      //Can either route to home, or show quiz completion page.
      //If route to home, we can show banner or drop confetti
      //Need to pass key in redirect, else candidate-home stuck on 'loading...'
      //   history.push(ROUTES.CANDIDATE_HOME);
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
