import React, { useEffect, useState } from 'react';
// import QuizQuestionCard from '../QuizQuestionCard';
import { QuizQuestionCard } from '../../components';

export default function TrueFalseQuizCard({ ...props }) {
  const [checked, setChecked] = useState(null);

  const changeRadio = (e) => {
    setChecked(e.target.value);
  };

  useEffect(() => {
    setChecked(props.questionAndAnswerMap.get(props.questionIndex));
  }, [props.questionAndAnswerMap, props.questionIndex]);

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
            checked={checked === answer.id}
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
