import React, { /*Component,*/ useState } from 'react';
// import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';

const TrueOrFalseQuestion = (props) => {
  let starterAnswer = props.answers[0] ? props.answers[0].value : 0;
  const [answer, setAnswer] = useState(starterAnswer);
  const handleUpdate = (e) => {
    if (answer === 'true') {
      setAnswer('false');
    } else {
      setAnswer('true');
    }
    props.handleTrueOrFalseAnswer(e);
  };
  return (
    <div onChange={(e) => handleUpdate(e)}>
      {/* {console.log("answer is ", props.answers[0].value, answer)} */}
      <input
        type="radio"
        name="trueOrFalse"
        value="true"
        checked={answer === 'true'}
        readOnly
      />{' '}
      True
      <input type="radio" name="trueOrFalse" value="false" checked={answer === 'false'} readOnly />
      False
    </div>
  );
};

export default TrueOrFalseQuestion;
