import React from 'react';

import {
  Container,
  Error,
  Title,
  Text,
  TextSmall,
  Link,
  Input,
  Submit,
  Base,
  Question,
  Quizzes,
  QuestionsNextToQuizzes,
  QuizOuter,
  eachQuiz,
  AddNewQuestion,
} from './styles/form';

export default function Form({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Form.Error = function FormError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

Form.Base = function FormBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

Form.Question = function FormQuestion({ children, ...restProps }) {
  return <Question {...restProps}>{children}</Question>;
};

Form.Title = function FormTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Form.Text = function FormText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Form.TextSmall = function FormTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

Form.Link = function FormLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Form.Input = function FormInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
  return <Submit {...restProps}>{children}</Submit>;
};

Form.Quizzes = function FormQuestion({ children, ...restProps }) {
  return <Quizzes {...restProps}>{children}</Quizzes>;
};

Form.QuestionsNextToQuizzes = function FormQuestion({ children, ...restProps }) {
  return <QuestionsNextToQuizzes {...restProps}>{children}</QuestionsNextToQuizzes>;
};

Form.QuizOuter = function FormQuestion({ children, ...restProps }) {
  return <QuizOuter {...restProps}>{children}</QuizOuter>;
};

Form.eachQuiz = function FormQuestion({ children, ...restProps }) {
  return <eachQuiz {...restProps}>{children}</eachQuiz>;
};

Form.AddNewQuestion = function FormAddNewQuestion({ children, ...restProps }) {
  return <AddNewQuestion {...restProps}>{children}</AddNewQuestion>;
};
