import React, { useEffect, useState } from 'react';
// import QuizQuestionCard from '../QuizQuestionCard';
import { QuizQuestionCard, Form } from '../../components';

export default function MultipleChoiceQuizCard({ ...props }) {
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    setChecked(props.questionAndAnswerMap.get(props.questionIndex));
  });

  const changeRadio = (e) => {
    console.log('e is: ', e.target.value);
    setChecked(e.target.value);
  };

  const questionCardTitle = () => {
    return <QuizQuestionCard.Title>{props.questionTitle}</QuizQuestionCard.Title>;
  };

  const renderAnswerChoices = () => {
    return props.questionAnswers.map((answer, index) => {
      return (
        <div key={answer.id}>
          <QuizQuestionCard.Input
            value={answer.id}
            type="radio"
            onChange={(e) => {
              changeRadio(e);
              props.updateQuestionAndAnswersMap(answer.id);
            }}
            checked={checked == answer.id}
          ></QuizQuestionCard.Input>
          {answer.value}
        </div>
      );
    });
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
