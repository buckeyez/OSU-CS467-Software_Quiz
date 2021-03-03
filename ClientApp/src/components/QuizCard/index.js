import React from 'react';
import { Container, Title, Text, TextSmall, ButtonLink, Button } from './styles/QuizCard';

export default function QuizCard({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

QuizCard.Title = function QuizCardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

QuizCard.Text = function QuizCardText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

QuizCard.TextSmall = function QuizCardTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

QuizCard.ButtonLink = function QuizCardLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

QuizCard.Button = function QuizCardButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};
