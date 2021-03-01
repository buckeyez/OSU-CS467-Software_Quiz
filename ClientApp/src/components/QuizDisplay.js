import React/*, { Component, useState, useEffect }*/ from 'react';
//import axios from 'axios';
// import Form from 'reactstrap/lib/Form';
//import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';
import { Form } from './';

const QuizDisplay = (props) => {
  return (
    <div onClick={props.clicked}>
      <Form>
        <form>
          <label>
            {props.current && '*  '}
            {props.quiz}
          </label>

          <button type="submit" onClick={props.handleQuizDelete}>
            Delete
          </button>
        </form>
        {/* {showDetail &&  <QuestionTemplate id={props.question.id} deleteHandle={(id, e) => props.deleteHandle(id, e)}/>} */}
      </Form>
    </div>
  );
};

export default QuizDisplay;
