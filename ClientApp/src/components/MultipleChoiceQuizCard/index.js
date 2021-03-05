import React, { useEffect, useState } from 'react';
// import QuizQuestionCard from '../QuizQuestionCard';
import { QuizQuestionCard } from '../../components';

export default function MultipleChoiceQuizCard({ ...props }) {
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (props.questionAndAnswerMap.get(props.questionIndex) !== undefined) {
      setChecked(props.questionAndAnswerMap.get(props.questionIndex)[0]);
    }
  }, [props.questionAndAnswerMap, props.questionIndex]);

  const changeRadio = (e) => {
    console.log('e is: ', e.target.value);
    setChecked(e.target.value);
    console.log('checked is, ', checked);
  };

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
