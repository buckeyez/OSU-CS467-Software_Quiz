import React from 'react';
import {
  Container,
  Title,
  Text,
  TextSmall,
  ButtonLink,
  Button,
  TextForAnswer,
  AnswerContainer,
} from './styles/CandidateResultCard';

export default function CandidateResultCard({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

CandidateResultCard.Title = function CandidateResultCardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

CandidateResultCard.Text = function CandidateResultCardText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

CandidateResultCard.TextSmall = function CandidateResultCardTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

CandidateResultCard.ButtonLink = function CandidateResultCardLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

CandidateResultCard.Button = function CandidateResultCardButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

CandidateResultCard.TextForAnswer = function CandidateResultCardTextForAnswer({
  children,
  ...restProps
}) {
  return <TextForAnswer {...restProps}>{children}</TextForAnswer>;
};

CandidateResultCard.AnswerContainer = function CandidateResultCardAnswerContainer({
  children,
  ...restProps
}) {
  return <AnswerContainer {...restProps}>{children}</AnswerContainer>;
};
