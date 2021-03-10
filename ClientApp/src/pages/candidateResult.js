import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';
import queryString from 'query-string';
import { getIndividualQuizResult } from '../utils/getIndividualQuizResult';
import { CandidateResult, CandidateResultCard } from '../components';

export default function CandidateResultPage() {
  const location = useLocation();
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
  }, [queryParams.key]);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (!result) {
    return <span>Unable to get candidate results. No such candidate exists.</span>;
  }

  const checkIfAnswerWasCorrect = (userSelection, freeResponse, answers) => {
    let grade = <p style={{ backgroundColor: '#DCEDC8' }}>Correct</p>;

    //If its a freeResponse object, then manaul grading is required
    if (userSelection === null && freeResponse !== null) {
      return (grade = <p style={{ backgroundColor: '#FFE0B2' }}>Manual Grading Required</p>);
    }

    //If there is more than 1 userSelection object, we know its a multi select answer
    if (userSelection.length > 1) {
      const trueAnswersArray = [];
      const trueChoicesArray = [];

      //Check how many true answers there should be
      answers.forEach((answer) => {
        if (answer.correct) {
          trueAnswersArray.push(answer);
        }
      });

      //Check how many true answers the user actualy selected
      userSelection.forEach((choice) => {
        if (choice.correct) {
          trueChoicesArray.push(choice);
        }
      });

      //Does the number of true answers there should be,
      //match the number of true answers the user selected?
      //If so, they've selected all corret answers, return Correct
      //else, they've not selected all correct answers, return Incorrect
      if (trueAnswersArray.length === trueChoicesArray.length) {
        grade = <p style={{ backgroundColor: '#DCEDC8' }}>Correct</p>;
      } else {
        grade = <p style={{ backgroundColor: '#ffcdd2' }}>Incorrect</p>;
      }
    } else {
      //If there is only 1 userSelection object
      userSelection.forEach((choice) => {
        if (choice.correct) {
          grade = <p style={{ backgroundColor: '#DCEDC8' }}>Correct</p>;
        } else {
          grade = <p style={{ backgroundColor: '#ffcdd2' }}>Incorrect</p>;
        }
      });
    }

    return grade;
  };

  const generateUserAnswerChoice = (userSelections, freeResponse) => {
    let choiceList = [];

    if (userSelections === null && freeResponse !== null) {
      return (
        <CandidateResultCard.AnswerContainer>
          <div>
            <CandidateResultCard.TextForAnswer>{freeResponse}</CandidateResultCard.TextForAnswer>
          </div>
        </CandidateResultCard.AnswerContainer>
      );
    }

    userSelections.forEach((choice) => {
      choiceList.push(choice);
    });

    if (userSelections !== null && freeResponse === null) {
      return (
        <CandidateResultCard.AnswerContainer>
          {choiceList.map((choice) => {
            return (
              <div key={choice.id}>
                <CandidateResultCard.TextForAnswer>
                  {choice.value}
                </CandidateResultCard.TextForAnswer>
              </div>
            );
          })}
        </CandidateResultCard.AnswerContainer>
      );
    }
  };

  const generateTimeTakeCopy = (time) => {
    if (time === -1) {
      return 'Untimed';
    } else if (time === 0) {
      return 'Under 1 minute';
    } else {
      return `${time} minutes`;
    }
  };

  return (
    <>
      <CandidateResult>
        <CandidateResult.Title>
          Quiz Result for {result.user.firstName} {result.user.lastName}
        </CandidateResult.Title>
        <CandidateResult.ScoreText>Score: {result.grade}</CandidateResult.ScoreText>
        <CandidateResult.QuizTitle>Quiz Name: {result.quizName}</CandidateResult.QuizTitle>

        <CandidateResult.Text>Email: {result.user.email}</CandidateResult.Text>
        <CandidateResult.Text>
          Time Taken: {generateTimeTakeCopy(result.timeTaken)}
        </CandidateResult.Text>
        {result.questionResults.map((r, index) => {
          return (
            <CandidateResultCard key={r.question.id}>
              <CandidateResultCard.Text>
                Question {index + 1}: {r.question.value}{' '}
              </CandidateResultCard.Text>
              <CandidateResultCard.AnswerContainer>
                {r.answers.map((answer) => {
                  return (
                    <div key={answer.id}>
                      <CandidateResultCard.TextForAnswer>
                        {answer.value} {answer.correct ? '(correct)' : null}
                      </CandidateResultCard.TextForAnswer>
                    </div>
                  );
                })}
              </CandidateResultCard.AnswerContainer>

              <CandidateResultCard.UserChoiceText>
                User Choice(s):
              </CandidateResultCard.UserChoiceText>
              {generateUserAnswerChoice(r.userSelection, r.freeResponse)}

              <CandidateResultCard.GradeText>Grade:</CandidateResultCard.GradeText>
              {checkIfAnswerWasCorrect(r.userSelection, r.freeResponse, r.answers)}
            </CandidateResultCard>
          );
        })}
      </CandidateResult>
    </>
  );
}
