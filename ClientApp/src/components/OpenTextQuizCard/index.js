import React, { useEffect, useState } from 'react';
// import QuizQuestionCard from '../QuizQuestionCard';
import { QuizQuestionCard, Form } from '../../components';

export default function MultipleChoiceQuizCard({ ...props }) {
  const [freeResponseAnswer, setFreeResponseAnswer] = useState('');

  useEffect(() => {
    setFreeResponseAnswer(props.questionAndAnswerMap.get(props.questionIndex));
  });

  const questionCardTitle = () => {
    return <QuizQuestionCard.Title>{props.questionTitle}</QuizQuestionCard.Title>;
  };

  const renderAnswerChoices = () => {
    return props.questionAnswers.map((answer, index) => {
      return (
        <div key={answer.id}>
          <QuizQuestionCard.TextArea
            onChange={() => {
              props.updateQuestionAndAnswersMapFreeResponse(event);
            }}
            value={freeResponseAnswer}
          ></QuizQuestionCard.TextArea>
        </div>
      );
    });
  };

  //   const questionCardQuestion = () => {
  //     return (
  //       <>
  //         <QuizQuestionCard.Input type="radio"></QuizQuestionCard.Input> asd
  //         <QuizQuestionCard.Input type="radio"></QuizQuestionCard.Input> asdasd
  //       </>
  //     );
  //   };

  return (
    <>
      <QuizQuestionCard>
        {questionCardTitle()}
        {renderAnswerChoices()}
      </QuizQuestionCard>
    </>
  );
}
