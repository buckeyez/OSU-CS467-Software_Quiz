import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
// import Form from 'reactstrap/lib/Form';
import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';
import { Form } from './';




const QuizDisplay = (props) =>{

  // const [quizzes, setQuizzes] =  useState([])

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   console.log("in QuizDisplay");
  //   axios.get(`/Quizzes`)
  //   .then(response => {
  //     console.log("response: ", response);
  //     setQuizzes(response.data);

  //   })
  // }, []);

  // const handleClick = () => {
  //     console.log("clicked question with id: ", props.question.id, showDetail, props.type)
      
  //     setShowDetail(!showDetail);
  // }


  // const handleChangeOpenTextAnswer = (event) => {
  //   console.log("to update answers for Open Text in parent: ", event.target.value)

  // }

  // const handleChangeMultipleChoiceAnswer = (choiceList) => {
  //   console.log("in multiplr choice: ", choiceList);
  // }

  return (
    <div onClick={props.clicked}>
    <Form >
      <form>
            <label>{props.current && "*  "}{props.quiz}</label>
            
            <button type="submit" onClick={props.handleQuizDelete}>Delete</button>
          </form>
      {/* {showDetail &&  <QuestionTemplate id={props.question.id} deleteHandle={(id, e) => props.deleteHandle(id, e)}/>} */}
    </Form>
    
    
    </div>
  )
}

export default QuizDisplay;
