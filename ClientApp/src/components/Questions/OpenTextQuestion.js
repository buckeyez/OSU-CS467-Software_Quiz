import React/*, { Component }*/ from 'react';
import { Form } from '../';
//import { withRouter } from 'react-router-dom';
//import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';
// import history from './history'
// import "./SoftwareQuiz.css"
// import {Button} from 'react-bootstrap';

// import "./QuestionTemplate.css"

const OpenTextQuestion = (props) => {
  return (
    <div>
      <Form.QuestionInput
        type="text"
        placeholder="Type preferred response here..."
        value={props.answers[0] ? props.answers[0].value : ''}
        onChange={props.handleOpenTextAnswer}
      />
    </div>
  );
};

export default OpenTextQuestion;
