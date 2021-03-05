import React from 'react';
import { Container, Title, Text, TextSmall, ButtonLink, Button } from './styles/CandidateResults';

export default function CandidateResults({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

CandidateResults.Title = function CandidateResultsTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

CandidateResults.Text = function CandidateResultsText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

CandidateResults.TextSmall = function CandidateResultsTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

CandidateResults.ButtonLink = function CandidateResultsLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

CandidateResults.Button = function CandidateResultsButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};
