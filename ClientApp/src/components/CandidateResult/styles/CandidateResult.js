import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.div`
  dsiplay: flex;
  padding: 15px;
  margin: 15px;
`;
export const Title = styled.h4`
  text-align: center;
  font-size: 36px;
`;
export const Text = styled.p`
  text-align: center;
`;
export const TextSmall = styled.p``;
export const ButtonLink = styled(ReactRouterLink)``; // styled(ReactRouterLink)``;
export const Button = styled.button``;

export const ScoreText = styled.p`
  text-align: center;
  font-size: 26px;
`;
export const QuizTitle = styled.p`
  text-align: center;
  font-size: 20px;
`;
