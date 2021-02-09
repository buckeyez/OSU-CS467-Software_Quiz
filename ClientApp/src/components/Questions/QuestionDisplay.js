import React, { Component, useState } from 'react';
// import Form from 'reactstrap/lib/Form';
import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';
import { Form } from '../';
import OpenTextQuestion from "./OpenTextQuestion";
import TrueOrFalseQuestion from "./TrueOrFalseQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import QuestionTemplate from "./QuestionTemplate";



const QuestionDisplay = (props) =>{

  const [showDetail, setShowDetail] =  useState(false)

  const handleClick = () => {
      console.log("clicked question with id: ", props.question.id, showDetail, props.type)
      
      setShowDetail(!showDetail);
  }


  const handleChangeOpenTextAnswer = (event) => {
    console.log("to update answers for Open Text in parent: ", event.target.value)

  }

  const handleChangeMultipleChoiceAnswer = (choiceList) => {
    console.log("in multiplr choice: ", choiceList);
  }

  return (
    <div >
    <Form.Question >
        <div onClick={handleClick}>
      <p>Question: {props.question.value}</p>
      <p>Type: {props.question.type}</p>
      </div>
      {showDetail &&  <QuestionTemplate id={props.question.id}/>}
    </Form.Question>
    
    
    </div>
  )
}

export default QuestionDisplay;