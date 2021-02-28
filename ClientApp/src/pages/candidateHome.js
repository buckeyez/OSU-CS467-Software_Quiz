import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome, QuizCard } from '../components';
import { getCandidateInformation } from '../utils/getCandidateInformation';
const queryString = require('query-string');

export default function CandidateHome() {
  const [loading, setLoading] = useState(true);
  const [candidateAndQuizInformation, setCandidateAndQuizInformation] = useState(null);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  //https://localhost:5001/candidate-home/?key=4c64482d-8752-407c-8a43-525f7d5f0c33
  if (!queryParams.key) {
    return <span>Failed to provide key param</span>;
  }

  useEffect(() => {
    const fetchData = async () => {
      const r = await getCandidateInformation(queryParams.key);

      setCandidateAndQuizInformation(r);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (!candidateAndQuizInformation) {
    return <span>There are no quizes for you right now...</span>;
  }

  console.log('canidate info>>>>', candidateAndQuizInformation);
  const quiz = candidateAndQuizInformation.quiz;
  const candidate = candidateAndQuizInformation.user;
  const allotment = candidateAndQuizInformation.timeAllotment;

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
