import React from 'react';
import { Container, Error, Title, Text, TextSmall, Link, TakeQuiz } from './styles/welcome';

export default function Welcome({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Welcome.Error = function WelcomeError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

Welcome.Title = function WelcomeTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Welcome.Text = function WelcomeText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Welcome.TextSmall = function WelcomeTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

Welcome.Link = function WelcomeLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Welcome.TakeQuiz = function WelcomeSubmit({ children, ...restProps }) {
  return <Submit {...restProps}>{children}</Submit>;
};
