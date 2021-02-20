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

  console.log('abnswers---->', props.questionAnswers);
  const questionCardTitle = () => {
    return <QuizQuestionCard.Title>{props.questionTitle}</QuizQuestionCard.Title>;
  };

  //Future: You can have hash map keep track of [question id] :[answer id]
  //Then have a terinary operator on the selected val on radio button
  // if answer is in hash map, then you can select the radio button
  //This can be used for persistance
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
