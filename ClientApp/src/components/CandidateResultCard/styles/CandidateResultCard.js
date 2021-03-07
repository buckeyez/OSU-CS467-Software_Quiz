import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.div`
  dsiplay: flex;
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  border: solid 1px lightgrey;
  box-shadow: 0px 0px 5px grey;
  //   &:hover {
  //     box-shadow: 0px 0px 10px #99c2ff;
  //     border: solid 1px #99c2ff;
  //     cursor: pointer;
  //   }
`;
export const AnswerContainer = styled.div``;
export const Title = styled.h4``;
export const Text = styled.p`
  font-size: 26px;
`;
export const TextSmall = styled.p``;
export const TextForAnswer = styled.p`
  font-size: 18px;
  margin-bottom: 1px;
`;
export const ButtonLink = styled(ReactRouterLink)``; // styled(ReactRouterLink)``;
export const Button = styled.button``;
export const UserChoiceText = styled.p`
  margin-top: 25px;
  margin-bottom: 0px;
  font-size: 20px;
  font-weight: bold;
`;

export const GradeText = styled.p`
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 20px;
  font-weight: bold;
`;
