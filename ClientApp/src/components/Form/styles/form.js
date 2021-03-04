import styled from 'styled-components/macro';

export const Container = styled.div``;
export const Error = styled.div``;
export const Base = styled.form``;
export const Question = styled.section`
  border: solid 1px black;
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
`;
export const Title = styled.h1``;
export const Text = styled.p``;
export const TextSmall = styled.p`
  margin-bottom: 0px;
`;
export const Link = styled.link``; // styled(ReactRouterLink)``;
export const Input = styled.input``;
export const Submit = styled.button``;

export const Quizzes = styled.div`
  border: solid 1px black;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  display: inline-block;
  width: 100%;
`;

export const QuestionsNextToQuizzes = styled.div`
  border: solid 1px black;
  width: 75%;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const QuizOuter = styled.div`
  // border: solid 1px black;
  display: flex;
  justify-content: space-between;
`;

export const eachQuiz = styled.span`
  // border: solid 1px black;
  display: flex;
  // justify-content: space-between;
`;

export const AddNewQuestion = styled.button`
  width: 100%;
  background: white;
  border-radius: 10px;
  border: solid 1px lightgrey;
  box-shadow: 0px 0px 5px grey;
  margin-right: 50px;
  margin-top: 30px;
  &:focus {
    outline: none;
    // box-shadow: 0px 0px 2px red;
  };
  &:hover {
    // outline: none;
    box-shadow: 0px 0px 10px #99c2ff;
    border: solid 1px #99c2ff;
    // background: #99c2ff;
  }
  
`;
