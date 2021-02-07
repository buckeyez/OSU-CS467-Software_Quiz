import React, { Component } from 'react';
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
    this.state = { questionType: '' };
  }

  handleChange = (event) => {
    console.log("question type selected on drop down: ", event.target.value);
    this.setState({questionType: event.target.value});
  }

  render() {
    return (
      <div>
        {/* <form className="question-template"> */}
        <Form>
          <Form.Question>
          <div>
            <input type="text" name="questionName" placeholder="Type Question Here..."></input>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="selectChoice">Select Question Type</option>
              <option value="multipleChoice">Multiple Choice</option>
              <option value="trueOrFalse">True or False</option>
              <option value="openText">Open Text</option>
            </select>
          </div>
          <div>
            {this.state.questionType == "openText" && <OpenTextQuestion />}
            {this.state.questionType == "trueOrFalse" && <TrueOrFalseQuestion />}
            {this.state.questionType == "multipleChoice" && <MultipleChoiceQuestion />}
          </div>
          <button onClick={this.props.deleteHandle}>delete this question</button>
          </Form.Question>
        </Form>
        {/* </form> */}
      </div>
    );
  }
}
