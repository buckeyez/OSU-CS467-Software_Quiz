import React, { useEffect, useState } from 'react';
// import QuizQuestionCard from '../QuizQuestionCard';
import { QuizQuestionCard } from '../../components';

export default function MultipleChoiceQuizCard(props) {
  const questionCardTitle = () => {
    return <QuizQuestionCard.Title>{props.questionTitle}</QuizQuestionCard.Title>;
  };

  const renderAnswerChoices = () => {
    return props.questionAnswers.map((answer, index) => {
      const curAns = props.questionAndAnswerMap.get(props.questionIndex);

      if (props.questionIndex === 3) {
        console.log('from if statement:', props.questionAndAnswerMap.get(props.questionIndex));
      }
      return (
        <div key={answer.id}>
          <QuizQuestionCard.TextArea
            onChange={props.updateQuestionAndAnswersMapFreeResponse}
            value={curAns}
          ></QuizQuestionCard.TextArea>
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
