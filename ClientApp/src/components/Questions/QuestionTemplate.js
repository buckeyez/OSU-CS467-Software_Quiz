import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import history from './history'
// import "./SoftwareQuiz.css"
// import {Button} from 'react-bootstrap';
import { Form } from '../';
import OpenTextQuestion from "./OpenTextQuestion";
import TrueOrFalseQuestion from "./TrueOrFalseQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
// import "./QuestionTemplate.css"



export default class QuestionTemplate extends Component {
  // static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { 
      questionType: '',
      value: '',
      answers: []
    };
  }

  handleChange = (event) => {
    console.log("question type selected on drop down: ", event.target.value);
    // let newState = {...this.state};
    this.setState({...this.state, questionType: event.target.value});
  }

  handleQuestionValueChange = (event) => {
    console.log("question value updated: ", event.target.value);
    this.setState({...this.state, value: event.target.value});
  }

  handleChangeOpenTextAnswer = (event) => {
    console.log("to update answers for Open Text in parent: ", event.target.value)
    let theAnswer = event.target.value
    this.setState(prevState => {
      return{
        ...prevState,
        answers: [theAnswer]
      }
    })
    // console.log("new state: ", this.state)

  }

  handleQuestionSubmit = (event) => {
    //making Axios call
    console.log("making axios call for ", this.state.questionType);
    event.preventDefault();
   
    const payload = {
      "Question": {
        "Value": this.state.value,
        "Type": this.state.questionType
      },
      "Answers": [
        {
          "Value": this.state.answers[0],
          "Correct": true
        }
      ]
    }

    axios.post('https://localhost:5001/Questions/Add', payload)
    .then(res => {
      console.log("res: ", res, res.data);
    })

  }

  render() {
    return (
      <div>
        {/* <form className="question-template"> */}
        <Form>
        {/* <form onSubmit={this.handleQuestionSubmit}> */}
          <Form.Question>
          <div>
            <input type="text" name="questionName" placeholder="Type Question Here..." onChange={this.handleQuestionValueChange}></input>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="selectChoice">Select Question Type</option>
              <option value="multipleChoice">Multiple Choice</option>
              <option value="trueOrFalse">True or False</option>
              <option value="Free Response">Free Response</option>
            </select>
          </div>
          <div>
            {this.state.questionType == "Free Response" && <OpenTextQuestion handleOpenTextAnswer={this.handleChangeOpenTextAnswer}/>}
            {this.state.questionType == "trueOrFalse" && <TrueOrFalseQuestion />}
            {this.state.questionType == "multipleChoice" && <MultipleChoiceQuestion />}
          </div>
          <button type="submit" onClick={this.handleQuestionSubmit}>Submit</button>
          <button onClick={this.props.deleteHandle}>delete this question</button>
          </Form.Question>
        </Form>
        {/* </form> */}
      </div>
    );
  }
}
