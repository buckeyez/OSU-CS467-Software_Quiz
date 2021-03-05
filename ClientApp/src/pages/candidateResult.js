import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';
import queryString from 'query-string';
import { getIndividualQuizResult } from '../utils/getIndividualQuizResult';
import { CandidateResult } from '../components';

export default function CandidateResultPage() {
  const location = useLocation();
  const history = useHistory();
  const queryParams = queryString.parse(location.search);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await getIndividualQuizResult(queryParams.key);
        setResult(r);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  const checkIfAnswerWasCorrect = (userSelection, freeResponse) => {
    let grade = '';

    if (userSelection === null && freeResponse !== null) {
      return (grade = 'Manual Grading Required');
    }

    userSelection.forEach((choice) => {
      if (choice.correct) {
        grade = 'correct';
      } else {
        grade = 'incorrect';
      }
    });

    return grade;
  };

  return (
    <CandidateResult>
      <CandidateResult.Title>
        Quiz Results for {result.user.firstName} {result.user.lastName}
      </CandidateResult.Title>
      <CandidateResult.Text>Score: {result.grade}</CandidateResult.Text>

      <CandidateResult.Text>Email: {result.user.email}</CandidateResult.Text>
      <CandidateResult.Text>Time Taken: {}</CandidateResult.Text>

      {result.questionResults.map((r, index) => {
        return (
          <div key={r.question.id}>
            <p>
              Question {index + 1}: {r.question.value}
            </p>
            <p>Grade: {checkIfAnswerWasCorrect(r.userSelection, r.freeResponse)} </p>
          </div>
        );
      })}
    </CandidateResult>
  );
}
