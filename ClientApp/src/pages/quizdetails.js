import React, { useEffect, useState, useCallback } from 'react';
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
import queryString from 'query-string';
import { getCandidateInformation } from '../utils/getCandidateInformation';

export default function QuizDetails() {
  //Can use useLocation to get state passed in via react router Link
  const data = useLocation();
  const history = useHistory();
  const [candidateAndQuizInformation, setCandidateAndQuizInformation] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionAndAnswerMap, setQuestionAndAnswerMap] = useState(new Map());
  const [minutesRemain, setMinutesRemain] = useState(null);
  const [secondsRemain, setSecondsRemain] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [error, setError] = useState(false);
  const [candidateTimeUp, setCandidateTimeUp] = useState(false);
  const [quizAlreadySubmitted, setQuizAlreadySubmitted] = useState(false);

  const queryParams = queryString.parse(data.search);

  //   console.log('Data from candidate-home route:', data);

  //Callback is used bcause reference to submitQuiz can change ever render
  //With callBack, react will only update the function if any of the dependencies are updated
  const submitQuiz = useCallback(async () => {
    console.log('submitQuiz is called!');

    if (quizData === null) {
      return;
    }

    //Exit early until we have both candidateQuizInformation and userSelections data
    if (candidateAndQuizInformation === null) {
      return;
    }
    const userSelections = generateAnswersArrayForSubmission(questionAndAnswerMap, quizData);

    try {
      const submission = await submitQuizToBackend(
        candidateAndQuizInformation.id,
        minutesRemain,
        userSelections
      );
      if (submission) {
        console.log('submission returned>>>');
        console.log(submission);
        history.push(`${ROUTES.SUBMITTED}/?key=${queryParams.key}`);
      }
    } catch (e) {
      console.log('Error submititon quiz: ', e);
    }
  }, [
    candidateAndQuizInformation,
    history,
    minutesRemain,
    queryParams.key,
    questionAndAnswerMap,
    quizData,
  ]);

  useEffect(() => {
    console.log('firing inital data fetch useeffect');
    const fetchData = async () => {
      //Grabs candidate and quiz info to help us grab the actual quiz
      //data later on with getQuizQuestions
      const candidate = await getCandidateInformation(queryParams.key);
      const quizID = candidate.quiz.id;
      setCandidateAndQuizInformation(candidate);
      setMinutesRemain(candidate.timeAllotment);

      const r = await getQuizQuestions(quizID);
      setQuizData(r);
      if (r.questions.length === 1) {
        setShowSubmitButton(true);
      } else {
        setShowSubmitButton(false);
      }
      setLoading(false);
    };

    //Precents user from being able to hit back button and edit quiz after submission
    if (localStorage.getItem('quizSubmitted') === queryParams.key) {
      console.log('Quiz Taken!!');
      setQuizAlreadySubmitted(true);
    }

    fetchData();
  }, [queryParams.key]);

  useEffect(() => {
    if (candidateTimeUp === false) {
      return;
    }
    submitQuiz();
  }, [candidateTimeUp, submitQuiz]);

  if (loading) {
    return <span>Loading...</span>;
  }

  //This is front end protection only, easy to evade :(
  if (quizAlreadySubmitted) {
    return <span>This quiz has already been submitted.</span>;
  }

  //   console.log('Information about loaded Quiz:', quizData);
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

  //Handles tracking candidate answer choices for Select Multiple question type
  //This requires more work becase multiple answers can be selected by user per question
  //Handles adding/removing multiple answer choices as user checks/unchecks checkboxes
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
    setMinutesRemain(minutes);
    setSecondsRemain(seconds);

    if (minutesRemain === 0 && secondsRemain === 0) {
      setCandidateTimeUp(true);
    }
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
            questionType={questionType}
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
            questionType={questionType}
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
            questionType={questionType}
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
            questionType={questionType}
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

  const handleSubmit = async () => {
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
      console.log(`Quiz took ${minutesRemain} min to complete`);

      submitQuiz();

      //Call this when user is pushed to the Thanks for Submitting Quiz Screen
      //   history.replace('/quiz-details', null);
    }
  };

  //TODO: Handle case for timer if minuetsRemain === -1
  return (
    <MainQuiz>
      <MainQuiz.Title>You are taking {quizData.name} Quiz</MainQuiz.Title>
      <MainQuiz.TimeArea>
        {<Timer handleQuizTimeUp={handleQuizTimeUp} quizStartTime={minutesRemain}></Timer>}
      </MainQuiz.TimeArea>

      <MainQuiz.Card>{renderSwitch(questionType)}</MainQuiz.Card>
      <MainQuiz.Button disabled={numberOfQuestions === 1 ? true : false} onClick={getPrevQuestion}>
        Prev
      </MainQuiz.Button>

      {showSubmitButton === false ? (
        <MainQuiz.Button onClick={getNextQuestion}>Next</MainQuiz.Button>
      ) : (
        <MainQuiz.Button onClick={handleSubmit}>Submit</MainQuiz.Button>
      )}
      <MainQuiz.Error>
        {error === false ? null : <p>Not all quiz questions have been answered</p>}
      </MainQuiz.Error>
    </MainQuiz>
  );
}
