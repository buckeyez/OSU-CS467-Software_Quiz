
import React, { Component, useState } from 'react';
import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';



const TrueOrFalseQuestion = (props) =>{

  const [answer, setAnswer] = useState(props.answers[0].value)
  const handleUpdate = (e) => {
    if(answer === "true"){
      setAnswer("false")
    }else{
      setAnswer("true")
    }
    props.handleTrueOrFalseAnswer(e);

  }
  return (
    <div onChange={(e) => handleUpdate(e)}>
      {console.log("answer is ", props.answers[0].value, answer)}
      <input type="radio" name="trueOrFalse" value="true" checked={answer==="true"}/> True
      <input type="radio" name="trueOrFalse" value="false"checked={answer==="false"}/>False
    </div>
  )
}

export default TrueOrFalseQuestion;