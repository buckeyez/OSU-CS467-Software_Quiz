import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
export const Title = styled.h4`
  text-align: center;
  font-size: 28px;
`;
export const Text = styled.p``;
export const TextSmall = styled.p``;
export const ButtonLink = styled(ReactRouterLink)``; // styled(ReactRouterLink)``;
export const Button = styled.button`
  background: #81d4fa;
  color: white;
  font-size: 1em;
  margin-top: 25px;
  //   margin-right: 10px;
  padding: 0.25em 1em;
  border: 2px solid #81d4fa;
  border-radius: 3px;
  font-size: 26px;
`;
