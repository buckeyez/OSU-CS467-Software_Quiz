
import React, { Component } from 'react';
import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';



const TrueOrFalseQuestion = (props) =>{
  return (
    <div onChange={props.handleTrueOrFalseAnswer}>
      <input type="radio" name="trueOrFalse" value="true" /> True
      <input type="radio" name="trueOrFalse" value="false" />False
    </div>
  )
}

export default TrueOrFalseQuestion;