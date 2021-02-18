import React from 'react';
// import QuizQuestionCard from '../QuizQuestionCard';
import { QuizQuestionCard, Form } from '../../components';
export default function QuizQuestionCardBuilder({ ...props }) {
  const questionCardTitle = () => {
    return <QuizQuestionCard.Title>{props.qName}</QuizQuestionCard.Title>;
  };

  const questionCardQuestions = () => {
    if (props.qType === 'Multiple Choice') {
      //   return <QuizQuestionCard.RadioButton type="text"></QuizQuestionCard.RadioButton>;
      return (
        <>
          <QuizQuestionCard.Input type="radio"></QuizQuestionCard.Input> asd
          <QuizQuestionCard.Input type="radio"></QuizQuestionCard.Input> asdasd
        </>
      );
    }
  };
  return (
    <>
      <QuizQuestionCard>
        {questionCardTitle()}
        {questionCardQuestions()}
      </QuizQuestionCard>
    </>
  );
}
