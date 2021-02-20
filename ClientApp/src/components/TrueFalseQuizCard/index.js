import React, { useEffect, useState } from 'react';
// import QuizQuestionCard from '../QuizQuestionCard';
import { QuizQuestionCard, Form } from '../../components';

export default function TrueFalseQuizCard({ ...props }) {
  const [checkedTrue, setCheckedTrue] = useState(null);
  const [checkedFalse, setCheckedFalse] = useState(null);
  const [checked, setChecked] = useState(null);

  const changeRadio = (e) => {
    setChecked(e.target.value);
  };

  useEffect(() => {
    const answerExists = props.questionAndAnswerMap.get(props.questionIndex);
    if (answerExists == true) {
      setChecked('true');
    } else if (answerExists == false) {
      setChecked('false');
    }
  });

  const questionCardTitle = () => {
    return <QuizQuestionCard.Title>{props.questionTitle}</QuizQuestionCard.Title>;
  };

  const renderAnswerChoices = () => {
    return (
      <div>
        <QuizQuestionCard.Input
          type="radio"
          value={'true'}
          onChange={(e) => {
            // setCheckedFalse(false);
            changeRadio(e);
            props.updateQuestionAndAnswersMapTF(true);
          }}
          checked={checked == 'true'}
        ></QuizQuestionCard.Input>{' '}
        True
        <div></div>
        <QuizQuestionCard.Input
          type="radio"
          value={'false'}
          onChange={(e) => {
            changeRadio(e);
            // setCheckedTrue(false);
            props.updateQuestionAndAnswersMapTF(false);
          }}
          checked={checked == 'false'}
        ></QuizQuestionCard.Input>{' '}
        False
      </div>
    );
  };

  return (
    <>
      <QuizQuestionCard>
        {questionCardTitle()}
        {renderAnswerChoices()}
      </QuizQuestionCard>
    </>
  );
}
