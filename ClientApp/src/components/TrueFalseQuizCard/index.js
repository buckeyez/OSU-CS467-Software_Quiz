import React, { useEffect, useState } from 'react';
// import QuizQuestionCard from '../QuizQuestionCard';
import { QuizQuestionCard } from '../../components';

export default function TrueFalseQuizCard({ ...props }) {
  const [checked, setChecked] = useState(null);

  const changeRadio = (e) => {
    setChecked(e.target.value);
  };

  useEffect(() => {
    if (props.questionAndAnswerMap.get(props.questionIndex) !== undefined) {
      setChecked(props.questionAndAnswerMap.get(props.questionIndex)[0]);
    }
  }, [props.questionAndAnswerMap, props.questionIndex]);

  const questionCardTitle = () => {
    return (
      <div>
        <QuizQuestionCard.Title>{props.questionTitle}</QuizQuestionCard.Title>
        <QuizQuestionCard.TextSmall>({props.questionType})</QuizQuestionCard.TextSmall>
      </div>
    );
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
            id={answer.id}
            checked={checked === answer.id}
          ></QuizQuestionCard.Input>
          <QuizQuestionCard.Label htmlFor={answer.id}>{answer.value}</QuizQuestionCard.Label>
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
