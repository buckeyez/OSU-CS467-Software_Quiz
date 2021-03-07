import styled from 'styled-components/macro';

export const Container = styled.div``;
export const Error = styled.div``;
export const Title = styled.h1`
  font-size: 64px;
  margin-bottom: 25px;
  text-align: center;
`;
export const Text = styled.p``;
export const TextSmall = styled.p``;
export const Link = styled.link``; // styled(ReactRouterLink)``;
export const Card = styled.div``;
export const Button = styled.button`
  background: #81d4fa;
  color: white;
  font-size: 1em;
  margin-top: 10px;
  margin-right: 10px;
  padding: 0.25em 1em;
  border: 2px solid #81d4fa;
  border-radius: 3px;
  font-size: 26px;

  &: disabled {
    opacity: 0.5;
  }
`;
export const TimeArea = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
  font-size: 30px;
`;
