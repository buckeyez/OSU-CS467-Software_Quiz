import React from 'react';
import { Container, Error, Title, Text, TextSmall, Link } from './styles/welcome';

export default function Submitted({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Submitted.Error = function SubmittedError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

Submitted.Title = function SubmittedTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Submitted.Text = function SubmittedText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Submitted.TextSmall = function SubmittedTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

Submitted.Link = function SubmittedLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};
