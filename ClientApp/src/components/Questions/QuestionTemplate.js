import React, { Component } from 'react';
import axios from 'axios';
//import { withRouter } from 'react-router-dom';
// import history from './history'
// import "./SoftwareQuiz.css"
// import {Button} from 'react-bootstrap';
import { Form } from '../';
import OpenTextQuestion from './OpenTextQuestion';
import TrueOrFalseQuestion from './TrueOrFalseQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import CheckboxQuestion from './CheckboxQuestion';
// import "./QuestionTemplate.css"

export default class QuestionTemplate extends Component {
  // static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      questionType: '',
      value: '',
      answers: [],
      display: true,
      errorMessage: '',
    };
  }

  componentDidMount() {
    console.log('questionTemplate just mounted');
    if (this.props.id) {
      axios.get(`/Questions/${this.props.id}/Entire`).then((response) => {
        console.log('response data: ', response.data);
        this.setState({
          id: response.data.question.id,
          questionType: response.data.question.type,
          value: response.data.question.value,
          answers: response.data.answers,
        });
      });
    }
  }

  clearErrorMessage = () => {
    this.setState({ ...this.state, errorMessage: '' });
  };

  handleChange = (event) => {
    console.log('question type selected on drop down: ', event.target.value);
    // let newState = {...this.state};
    this.setState({ ...this.state, questionType: event.target.value });
  };

  handleQuestionValueChange = (event) => {
    console.log('question value updated: ', event.target.value);
    this.setState({ ...this.state, value: event.target.value });
  };

  handleChangeOpenTextAnswer = (event) => {
    console.log('to update answers for Open Text in parent: ', event.target.value);
    let theAnswer = event.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        answers: [theAnswer],
      };
    });
    // console.log("new state: ", this.state)
  };

  handleChangeMultipleChoiceAnswer = (choiceList) => {
    console.log('in multiplr choice: ', choiceList);
    let theAnswer = choiceList;
    this.setState({ ...this.state, answers: theAnswer });
  };

  handleCheckboxChoiceAnswer = (choiceList) => {
    console.log('in checkbox choice: ', choiceList);
    let theAnswer = choiceList;
    this.setState({ ...this.state, answers: theAnswer });
  };

  handleQuestionDelete = () => {
    console.log('innnnnn delete this question');
    if (!this.state.id) {
      console.log('Item not added yet!');

      this.setState({ ...this.state, errorMessage: 'Question not added yet!' });
      return;
    }
    this.props.deleteHandle(this.state.id);
    this.setState({ ...this.state, deleteButtonValue: 'Click again to confirm delete' });
  };

  handleQuestionSubmit = (event) => {
    //making Axios call
    console.log("this.state.value: ", this.state.value);
    console.log("this.questiontype: ", this.state.questionType)
    if(this.state.value === "" || this.state.questionType === ''){
      console.log("Need to fill in question and question type! ", this.state.value, this.state.questionType)
      this.setState({...this.state, errorMessage: "Question or Question Type cannot be empty!"});
      return;
    }
    if (this.state.id === '') {
      console.log('making axios call for ', this.state.questionType);
      event.preventDefault();
      let payload;
      if (
        this.state.questionType === 'Multiple Choice' ||
        this.state.questionType === 'Select All That Apply'
      ) {
        payload = {
          Question: {
            Value: this.state.value,
            Type: this.state.questionType,
          },
          Answers: this.state.answers,
        };
      } else if (this.state.questionType === 'Free Response') {
        payload = {
          Question: {
            Value: this.state.value,
            Type: this.state.questionType,
          },
          Answers: [
            {
              Value: this.state.answers[0],
              Correct: true,
            },
          ],
        };
      } else if (this.state.questionType === 'True or False') {
        let answer = this.state.answers[0] === 'true' ? 'true' : 'false';
        let notAnswer = answer === 'true' ? 'false' : 'true';
        console.log('answer, notAnswer: ', answer, notAnswer);
        payload = {
          Question: {
            Value: this.state.value,
            Type: this.state.questionType,
          },
          Answers: [
            {
              Value: answer,
              Correct: true,
            },
            {
              Value: notAnswer,
              Correct: false,
            },
          ],
        };
      }
      console.log('this state answers: ', this.state.answers);
      console.log('payload: ', payload);
      axios
        .post('Questions/Add', payload) //TODO need to not hardcode the url
        .then((res) => {
          console.log('res: ', res, res.data.question.id);
          console.log('the id should be: ', res.data.question.id);
          this.setState({ ...this.state, id: res.data.question.id, display: false });
        });
    } else {
      console.log('item already exist, updating it');
      event.preventDefault();
      let payload;
      if (
        this.state.questionType === 'Multiple Choice' ||
        this.state.questionType === 'Select All That Apply'
      ) {
        payload = {
          Question: {
            Value: this.state.value,
            Type: this.state.questionType,
          },
          Answers: this.state.answers,
        };
      } else if (this.state.questionType === 'Free Response') {
        console.log("in update to free response: ", this.state.answers[0], this.state.answers[0].value, typeof(this.state.answers[0]), typeof(this.state.answers[0]) === 'object')
        let theValue = typeof(this.state.answers[0]) === 'object' ? this.state.answers[0].value : this.state.answers[0];
        console.log("theValue: ", theValue)
        payload = {
          Question: {
            Value: this.state.value,
            Type: this.state.questionType,
          },
          Answers: [
            {
              Value: theValue,
              Correct: true,
            },
          ],
        };
      } else if (this.state.questionType === 'True or False') {
        let answer = this.state.answers[0] === 'true' ? 'true' : 'false';
        let notAnswer = answer === 'true' ? 'false' : 'true';
        console.log('answer, notAnswer: ', answer, notAnswer);
        payload = {
          Question: {
            Value: this.state.value,
            Type: this.state.questionType,
          },
          Answers: [
            {
              Value: answer,
              Correct: true,
            },
            {
              Value: notAnswer,
              Correct: false,
            },
          ],
        };
      }
      console.log('this state answers: ', this.state.answers);
      console.log('payload: ', payload);
      let url = 'Questions/Update?id=' + this.state.id;
      axios
        .post(url, payload) //TODO need to not hardcode the url
        .then((res) => {
          console.log('updated');
          // console.log("res: ", res, res.data.question.id);
          // console.log("the id should be: ", res.data.question.id);
          // this.setState({...this.state, id: res.data.question.id});
        });
    }
  };

  render() {
    return (
      <div>
        {/* <form className="question-template"> */}
        {this.state.display && (
          <Form>
            {/* <form onSubmit={this.handleQuestionSubmit}> */}
            <Form.Question>
              <div onClick={this.clearErrorMessage}>
                <Form.QuestionInput
                  type="text"
                  name="questionName"
                  value={this.state.value}
                  placeholder="Type Question Here..."
                  onChange={this.handleQuestionValueChange}
                ></Form.QuestionInput>
                <Form.QuestionSelect value={this.state.questionType} onChange={this.handleChange}>
                  <option value="selectChoice">Select Question Type</option>
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="True or False">True or False</option>
                  <option value="Free Response">Free Response</option>
                  <option value="Select All That Apply">Select All That Apply</option>
                </Form.QuestionSelect>
              </div>
              <div>
                {this.state.questionType === 'Free Response' && (
                  <OpenTextQuestion
                    answers={this.state.answers}
                    handleOpenTextAnswer={this.handleChangeOpenTextAnswer}
                  />
                )}
                {this.state.questionType === 'True or False' && (
                  <TrueOrFalseQuestion
                    answers={this.state.answers}
                    handleTrueOrFalseAnswer={this.handleChangeOpenTextAnswer}
                  />
                )}
                {this.state.questionType === 'Multiple Choice' && (
                  <MultipleChoiceQuestion
                    answers={this.state.answers}
                    handleMultipleChoiceAnswer={this.handleChangeMultipleChoiceAnswer}
                  />
                )}
                {this.state.questionType === 'Select All That Apply' && (
                  <CheckboxQuestion
                    answers={this.state.answers}
                    handleCheckboxChoiceAnswer={this.handleCheckboxChoiceAnswer}
                  />
                )}
              </div>
              {this.state.errorMessage && <Form.ErrorMessage>{this.state.errorMessage}</Form.ErrorMessage>}
              <Form.Submit type="submit" onClick={this.handleQuestionSubmit}>
                {this.state.id === '' ? 'Submit' : 'Update'}
              </Form.Submit>
              {/* <button onClick={() => this.props.deleteHandle(this.state.id)}>delete this question</button> */}
              <Form.DeleteButton onClick={this.handleQuestionDelete}>Delete</Form.DeleteButton>
            </Form.Question>
          </Form>
        )}
        {/* </form> */}
      </div>
    );
  }
}
