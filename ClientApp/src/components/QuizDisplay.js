import React/*, { Component, useState, useEffect }*/ from 'react';
//import axios from 'axios';
// import Form from 'reactstrap/lib/Form';
//import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';
import { Form } from './';

const QuizDisplay = (props) => {

  var quizPanelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <div onClick={props.clicked}>
      <Form.EachQuiz>
        <form style={quizPanelStyle}>
          <label>
            {props.current && '*  '}
            {props.quiz}
          </label>

          <Form.DeleteButtonSmall type="submit" onClick={props.handleQuizDelete}>
            x
          </Form.DeleteButtonSmall>
        </form>
        {/* {showDetail &&  <QuestionTemplate id={props.question.id} deleteHandle={(id, e) => props.deleteHandle(id, e)}/>} */}
      </Form.EachQuiz>
    </div>
  );
};

export default QuizDisplay;
