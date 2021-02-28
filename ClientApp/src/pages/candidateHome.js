import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome, QuizCard } from '../components';
import { getCandidateInformation } from '../utils/getCandidateInformation';

export default function CandidateHome() {
  const [loading, setLoading] = useState(true);
  const [candidateAndQuizInformation, setCandidateAndQuizInformation] = useState(null);

  //   const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const r = await getCandidateInformation('4c64482d-8752-407c-8a43-525f7d5f0c33');

      setCandidateAndQuizInformation(r);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <span>Loading...</span>;
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
