import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';
import { Submitted } from '../components';
import queryString from 'query-string';

export default function SubmissionComplete() {
  //const history = useHistory();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    localStorage.setItem('quizSubmitted', queryParams.key);
  });

  return (
    <Submitted>
      <Submitted.Title>Thank you for your submission</Submitted.Title>
    </Submitted>
  );
}
