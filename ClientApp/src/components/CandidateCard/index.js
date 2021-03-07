import React from 'react';
import {
  Container,
  Title,
  Text,
  TextSmall,
  ButtonLink,
  Button,
  GradeText,
  SubmittedText,
} from './styles/CandidateCard';

export default function CandidateCard({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

CandidateCard.Title = function CandidateCardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

CandidateCard.Text = function CandidateCardText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

CandidateCard.TextSmall = function CandidateCardTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

CandidateCard.ButtonLink = function CandidateCardLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

CandidateCard.Button = function CandidateCardButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

CandidateCard.GradeText = function CandidateCardGradeText({ children, ...restProps }) {
  return <GradeText {...restProps}>{children}</GradeText>;
};

CandidateCard.SubmittedText = function CandidateCardSubmittedText({ children, ...restProps }) {
  return <SubmittedText {...restProps}>{children}</SubmittedText>;
};
