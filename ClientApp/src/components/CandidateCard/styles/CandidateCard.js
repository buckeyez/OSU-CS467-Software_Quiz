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
export const Title = styled.h4``;
export const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
export const TextSmall = styled.p`
  font-size: 26px;
`;
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
  font-size: 18px;

  &:disabled {
    background: #e0e0e0;
    border: 2px solid #e0e0e0;
    color: black;
  }
`;

export const GradeText = styled.p`
  font-size: 20px;
  margin-bottom: 5px;
`;
export const SubmittedText = styled.p``;
