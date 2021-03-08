import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Form } from '../components/';
//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';

export default function Home() {
  const { user } = useContext(UserContext);
  const [question, setQuestion] = useState(false);
  const [candidate, setCandidate] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [report, setReport] = useState(false);
  //const history = useHistory();

  const toggleInstructions = (item) => {
    var current;
    if (item === 'question') {
      current = question;
      setQuestion(!current);
    } else if (item === 'quiz') {
      current = quiz;
      setQuiz(!current);
    } else if (item === 'report') {
      current = report;
      setReport(!current);
    } else if (item === 'candidate') {
      current = candidate;
      setCandidate(!current);
    }
  };

  return (
    <>
      <h1>Welcome {user.firstName}!</h1>
      <br></br>
      <br></br>
      <h4>Insturctions on general workflow: </h4>
      <br></br>

      <div onClick={() => toggleInstructions('question')}>
        {/* <h4>Instructions</h4> */}
        <Form.Submit>{question ? 'Hide Add Questions' : '1. Add Questions'}</Form.Submit>
        {question && (
          <Form.Question>
            <p>
              <b>To add a question</b>
            </p>
            <ul>
              <li>
                Go to the <b>Question</b> tab in Navbar
              </li>
              <li>
                Click on the <b>+</b> under <b>Add More Questions</b>
              </li>
              <li>Supported question types: </li>
              <ul>
                <li>Mutiple Choice</li>
                <li>True or False</li>
                <li>Free Response</li>
                <li>Check All that Apply</li>
              </ul>
            </ul>
            <p>
              <b>Existing questions</b>
            </p>
            <ul>
              <li>
                Can be found under <b>Question Pool</b>{' '}
              </li>
              <li>Can be updated and deleted</li>
              <li>
                If a question has already been assigned to a quiz, then it cannot be updated or
                deleted
              </li>
            </ul>
          </Form.Question>
        )}
      </div>

      <div onClick={() => toggleInstructions('candidate')}>
        <Form.Submit>{quiz ? 'Hide Add Candidates' : '2. Add Candidates'}</Form.Submit>
        {candidate && (
          <Form.Question>
            <p>
              <b>To add a candidate</b>
            </p>
            <ul>
              <li>
                Go to the <b>Candidates</b> tab in Navbar
              </li>
              <li>Fill in all input fields</li>
              <li>
                Click <b>Submit</b>
              </li>
            </ul>
          </Form.Question>
        )}
      </div>

      <div onClick={() => toggleInstructions('quiz')}>
        <Form.Submit>
          {quiz ? 'Hide Create and Assign Quizzes' : '2. Create and Assign Quizzes'}
        </Form.Submit>
        {quiz && (
          <Form.Question>
            <p>
              <b>Prerequisites</b>
            </p>
            <ol>
              <li>Question pool has existing questions</li>
              <li>Candidates exists</li>
            </ol>

            <p>
              <b>Create and assign quizzes</b>
            </p>
            <ol>
              <li>
                Go to the <b>Quizzes</b> tab in Navbar
              </li>
              <li>
                <b>Select the quiz</b> - Find the quiz under <b>Quiz Pool</b> and click on it
              </li>
              <li>
                <b>Select/Update question list for the quiz </b>- Now that the quiz is selected,
                under <b>Question Pool</b>, add/delete questions to assign to the quiz by
                selecting/unselecting them with <b>Toggle</b>, then click <b>Update</b>. If a quiz
                has already been assigned to a candidate, then it cannot be updated
              </li>
              <li>
                <b>Assign the quiz </b>- With the quiz selected, pick the Timer and Candidate and
                click <b>Send Quiz</b>
              </li>
            </ol>
          </Form.Question>
        )}
      </div>

      <div onClick={() => toggleInstructions('report')}>
        <Form.Submit>{report ? 'Hide View Quiz Reports' : '3. View Quiz Reports'}</Form.Submit>
        {report && (
          <Form.Question>
            <p>
              <b>To view quiz reports</b>
            </p>
            <ul>
              <li>
                Go to the <b>Quiz Reports</b> tab in Navbar
              </li>
              <li>Quiz are ranked from higest score to lowest</li>
              <li>
                Click on <b>View Candidate </b> to see report details
              </li>
            </ul>
          </Form.Question>
        )}
        <br></br>
        <br></br>
      </div>
    </>
  );
}
