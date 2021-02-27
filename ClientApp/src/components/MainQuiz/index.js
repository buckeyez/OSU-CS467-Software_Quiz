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
} from './styles/MainQuiz';

export default function MainQuiz({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

MainQuiz.Error = function MainQuizError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

MainQuiz.Title = function MainQuizTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

MainQuiz.Text = function MainQuizText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

MainQuiz.TextSmall = function MainQuizTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

MainQuiz.Link = function MainQuizLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

MainQuiz.Card = function MainQuizCard({ children, ...restProps }) {
  return <Card {...restProps}>{children}</Card>;
};

MainQuiz.Button = function MainQuizButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

MainQuiz.TimeArea = function MainQuizTimeArea({ children, ...restProps }) {
  return <TimeArea {...restProps}>{children}</TimeArea>;
};
