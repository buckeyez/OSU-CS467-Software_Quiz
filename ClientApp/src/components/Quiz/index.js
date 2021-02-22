import React from 'react';
import {
  Container,
  Error,
  Title,
  Text,
  TextSmall,
  Link,
  Button,
  Card,
  TimeArea,
} from './styles/Quiz';

export default function Quiz({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Quiz.Error = function QuizError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

Quiz.Title = function QuizTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Quiz.Text = function QuizText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Quiz.TextSmall = function QuizTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

Quiz.Link = function QuizLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Quiz.Card = function QuizCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};

Quiz.Button = function QuizButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Quiz.TimeArea = function QuizTimeArea({ children, ...restProps }) {
  return <TimeArea {...restProps}>{children}</TimeArea>;
};
