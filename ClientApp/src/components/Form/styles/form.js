import styled from 'styled-components/macro';

export const Container = styled.div``;
export const Error = styled.div``;
export const Base = styled.form``;
export const Question = styled.section`
  // border: solid 1px black;
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  border: solid 1px lightgrey;
  box-shadow: 0px 0px 5px grey;
  &:hover {
    box-shadow: 0px 0px 10px #99c2ff;
    border: solid 1px #99c2ff;
    cursor: pointer;
  }
`;

export const QuestionInput = styled.input`
  width: 95%;
  border: none;
  border-bottom: solid 1px lightgrey;
  margin-bottom: 8px;
  &:focus {
    outline: none;
    box-shadow: 0 4px 2px -2px lightgray;
  };
  
`;

export const QuestionSelect = styled.select`
  margin-bottom: 8px;
  border: none;
  border-bottom: solid 1px lightgrey;
  width: 30%;

  &:focus {
    outline: none;
  };

  option {
    color: red;
    // color: black;
    // background: trans;
    // font-weight: small;
    // display: flex;
    // white-space: pre;
    // min-height: 20px;
    // padding: 0px 2px 1px;
  }
`;

export const QuestionOption = styled.option`
  background-color: #FFFFFF;
`;


export const MCInput = styled.input`
  width: 50%;
  border: none;
  border-bottom: solid 1px lightgrey;
  margin-bottom: 8px;
  &:focus {
    outline: none;
    box-shadow: 0 4px 2px -2px lightgray;
  };
  
`;

export const Title = styled.h1``;
export const Text = styled.p``;
export const TextSmall = styled.p`
  margin-bottom: 0px;
`;

export const ErrorMessage = styled.p`
  color: red;
  opacity: 0.5s;
  // transition: visibility 0s, opacity 1s linear;
`;
export const Link = styled.link``; // styled(ReactRouterLink)``;
export const Input = styled.input``;

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
  box-shadow: 0px 0px 10px darkgrey;
  margin-right: 50px;
  margin-top: 30px;
  &:focus {
    outline: none;
  };
  &:hover {
    // outline: none;
    box-shadow: 0px 0px 15px #99c2ff;
    border: solid 1px #99c2ff;
    // background: #99c2ff;
  }
  
`;


export const Submit = styled.button`
  
  background: white;
  border-radius: 10px;
  border: solid 1px lightgrey;
  box-shadow: 0px 0px 10px lightgreen;
  margin: 20px;
  margin-left: 0px;
  padding: 5px 15px;

  &:hover {
    // outline: none;
    box-shadow: 0px 0px 15px green;
    border: solid 1px lightgreen;
    // background: #99c2ff;
  }
  &:focus {
    outline: none;
  };
  
`;

export const DeleteButton = styled.button`
  
  background: white;
  border-radius: 10px;
  border: solid 1px #f5a2aa;
  box-shadow: 0px 0px 10px #f77986;
  margin: 20px;
  margin-left: 0px;
  padding: 5px 15px;

  &:hover {
    box-shadow: 0px 0px 15px red;
    border: solid 1px lightred;
  }
  &:focus {
    outline: none;
  };
  
`;


