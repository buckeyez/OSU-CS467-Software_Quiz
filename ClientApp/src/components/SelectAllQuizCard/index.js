import React from 'react';
import { QuizQuestionCard } from '../../components';

export default function SelectAllQuizCard({ ...props }) {
  const changeChecked = (answerId) => {
    const answerIdArrays = props.questionAndAnswerMap.get(props.questionIndex);

    if (answerIdArrays === undefined) {
      return false;
    } else if (answerIdArrays.includes(answerId)) {
      return true;
    }
    return false;
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
            type="checkbox"
            onChange={(e) => {
              props.updateQuestionAndAnswersMapSelectMultiple(answer.id);
            }}
            checked={changeChecked(answer.id)}
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
