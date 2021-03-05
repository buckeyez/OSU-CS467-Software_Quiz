import React, { /*Component,*/ useState } from 'react';
// import Form from 'reactstrap/lib/Form';

import { Form } from '../';
import QuestionTemplate from './QuestionTemplate';

const QuestionDisplay = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    console.log('clicked question with id: ', props.question.id, showDetail, props.type);

    setShowDetail(!showDetail);
  };

  // const handleChangeOpenTextAnswer = (event) => {
  //   console.log('to update answers for Open Text in parent: ', event.target.value);
  // };

  // const handleChangeMultipleChoiceAnswer = (choiceList) => {
  //   console.log('in multiplr choice: ', choiceList);
  // };
  var boldStyle = {
    fontWeight: 'bold'
  };

  return (
    <div>
      <Form.Question>
        <div onClick={handleClick}>
          <p><span style={boldStyle}>Question: &nbsp;</span>{props.question.value}</p>
          <p><span style={boldStyle}>Type: &nbsp;</span> {props.question.type}</p>
        </div>
        {showDetail && (
          <QuestionTemplate
            id={props.question.id}
            deleteHandle={(id, e) => props.deleteHandle(id, e)}
          />
        )}
      </Form.Question>
    </div>
  );
};

export default QuestionDisplay;
