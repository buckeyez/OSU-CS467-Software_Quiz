import React from 'react';
//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';
import { Submitted } from '../components';

export default function SubmissionComplete() {
  //const history = useHistory();

  return (
    <Submitted>
      <Submitted.Title>Thank you for your submission</Submitted.Title>
    </Submitted>
  );
}
