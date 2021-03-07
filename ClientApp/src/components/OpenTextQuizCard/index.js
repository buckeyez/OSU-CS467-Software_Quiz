import React from 'react';

import { QuizQuestionCard } from '../../components';

export default function MultipleChoiceQuizCard(props) {
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
      const curAns = props.questionAndAnswerMap.get(props.questionIndex);

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
