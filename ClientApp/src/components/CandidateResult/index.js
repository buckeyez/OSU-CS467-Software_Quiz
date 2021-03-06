import React from 'react';
import {
  Container,
  Title,
  Text,
  TextSmall,
  ButtonLink,
  Button,
  QuizTitle,
  ScoreText,
} from './styles/CandidateResult';

export default function CandidateResult({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

CandidateResult.Title = function CandidateResultTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

CandidateResult.Text = function CandidateResultText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

CandidateResult.TextSmall = function CandidateResultTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

CandidateResult.ButtonLink = function CandidateResultLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

CandidateResult.Button = function CandidateResultButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

CandidateResult.QuizTitle = function CandidateResultQuizTitle({ children, ...restProps }) {
  return <QuizTitle {...restProps}>{children}</QuizTitle>;
};

CandidateResult.ScoreText = function CandidateResultScoreText({ children, ...restProps }) {
  return <ScoreText {...restProps}>{children}</ScoreText>;
};
