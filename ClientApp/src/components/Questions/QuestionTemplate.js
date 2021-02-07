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
      id: '',
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

  handleChangeMultipleChoiceAnswer = (choiceList) => {
    console.log("in multiplr choice: ", choiceList);
    let theAnswer = choiceList;
    this.setState({...this.state, answers: theAnswer})
  }

  handleQuestionSubmit = (event) => {
    //making Axios call
    if(this.state.id == ''){
      console.log("making axios call for ", this.state.questionType);
      event.preventDefault();
      let payload;
     if(this.state.questionType === "Multiple Choice"){
        payload = {
          "Question": {
            "Value": this.state.value,
            "Type": this.state.questionType
          },
          "Answers": this.state.answers
        }
     }else{
        payload = {
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
     }
      console.log("this state answers: ", this.state.answers)
      console.log("payload: ", payload)
      axios.post('https://localhost:5001/Questions/Add', payload) //TODO need to not hardcode the url
      .then(res => {
        console.log("res: ", res, res.data.question.id);
        console.log("the id should be: ", res.data.question.id);
        this.setState({...this.state, id: res.data.question.id});
      })
    }else{
      console.log("item already exist");
    }


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
            <select value={this.state.questionType} onChange={this.handleChange}>
              <option value="selectChoice">Select Question Type</option>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True OR False">True or False</option>
              <option value="Free Response">Free Response</option>
            </select>
          </div>
          <div>
            {this.state.questionType == "Free Response" && <OpenTextQuestion handleOpenTextAnswer={this.handleChangeOpenTextAnswer}/>}
            {this.state.questionType == "True OR False" && <TrueOrFalseQuestion handleTrueOrFalseAnswer={this.handleChangeOpenTextAnswer}/>}
            {this.state.questionType == "Multiple Choice" && <MultipleChoiceQuestion handleMultipleChoiceAnswer={this.handleChangeMultipleChoiceAnswer}/>}
          </div>
          <button type="submit" onClick={this.handleQuestionSubmit}>{this.state.id == '' ? "Submit" : "Update"}</button>
          <button onClick={this.props.deleteHandle}>delete this question</button>
          </Form.Question>
        </Form>
        {/* </form> */}
      </div>
    );
  }
}
