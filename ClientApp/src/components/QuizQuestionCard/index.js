import React from 'react';
import {
  Container,
  Title,
  Text,
  TextSmall,
  Button,
  TextArea,
  Input,
} from './styles/QuizQuestionCard';

export default function QuizQuestionCard({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

QuizQuestionCard.Title = function QuizQuestionCardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

QuizQuestionCard.Text = function QuizQuestionCardText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

QuizQuestionCard.TextSmall = function QuizQuestionCardTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

QuizQuestionCard.Button = function QuizQuestionCardButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

QuizQuestionCard.TextArea = function QuizQuestionCardTextArea({ children, ...restProps }) {
  return <TextArea {...restProps}>{children}</TextArea>;
};

QuizQuestionCard.Input = function QuizQuestionCardInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};
