import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome, QuizCard } from '../components';
import { getCandidateInformation } from '../utils/getCandidateInformation';
// import { Button } from '../components/QuizQuestionCard/styles/QuizQuestionCard';
// import { CandidateContext } from '../context/candidateContext';
const queryString = require('query-string');

export default function CandidateHome() {
  const [loading, setLoading] = useState(true);
  const [candidateAndQuizInformation, setCandidateAndQuizInformation] = useState(null);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      //https://localhost:5001/candidate-home/?key=4c64482d-8752-407c-8a43-525f7d5f0c33
      if (!queryParams.key) {
        //pass
      } else {
        const r = await getCandidateInformation(queryParams.key);
        setCandidateAndQuizInformation(r);
        setLoading(false);
      }
    };
    fetchData();
  }, [queryParams.key]);
  // const { setCandidateUser } = useContext(CandidateContext);

  //   if (!candidateAndQuizInformation) {
  //     return <span>There are no quizes for you right now...</span>;
  //   }

  if (loading || !candidateAndQuizInformation) {
    return <span>Loading...</span>;
  }

  console.log('canidate info>>>>', candidateAndQuizInformation);
  const quiz = candidateAndQuizInformation.quiz;
  const candidate = candidateAndQuizInformation.user;
  const allotment = candidateAndQuizInformation.timeAllotment;
  const quizAssignment = candidateAndQuizInformation.id;
  console.log('allotment is', allotment);

  return (
    <div style={{ marginTop: '5%', display: 'flex', justifyContent: 'center', minHeight: '800px' }}>
      <Welcome>
        <Welcome.Title>Welcome {candidate.firstName}</Welcome.Title>
        <Welcome.TextSmall>You have been assigned the following quiz(s): </Welcome.TextSmall>
        <QuizCard>
          {
            <div key={quiz.id}>
              <QuizCard.Title>{quiz.name}</QuizCard.Title>

              <QuizCard.Button
                onClick={() => {
                  history.push(`${ROUTES.QUIZ_DETAILS}/?key=${queryParams.key}`, {
                    candidate: candidate,
                    quiz: quiz,
                    allotment: allotment,
                    quizAssignment: quizAssignment,
                  });
                }}
              >
                START QUIZ
              </QuizCard.Button>
            </div>
          }
        </QuizCard>
      </Welcome>
    </div>
  );
}
