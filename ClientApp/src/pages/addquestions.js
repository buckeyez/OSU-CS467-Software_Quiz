import axios from 'axios';
import React, { Component } from 'react';

import Switch from "react-switch";

// import "./SoftwareQuiz.css"
// import "./NewQuiz.css"
import QuestionTemplate from "../components/Questions/QuestionTemplate"
import QuestionDisplay from "../components/Questions/QuestionDisplay"

export default class AddQuestions extends Component {
  // static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { 
      QuizTitle: "Quiz Title",
      timerChecked: false,
      count: 0,
      display: true,
      inputAtTop: true,
      questionTemplate: [],
      questionPool: [] };
    this.incrementCounter = this.incrementCounter.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
      console.log("AddQuestions just mounted");
      axios.get(`/Questions`)
      .then(response => {
        this.setState({...this.state, questionPool: response.data });
      })
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  addGeneralQuestionTemplate = (inputLocation = true)=>{
    console.log("clicked add button");
    const questions = [...this.state.questionTemplate]
    let newCount = this.state.count;
    newCount = newCount + 1;
    questions.push({id: newCount})
    this.setState(prevState => {
      return {...prevState, count: newCount, questionTemplate: questions, inputAtTop: inputLocation}
    })
    console.log("questionTemplate: ", this.state.questionTemplate);
  }

  deleteGeneralQuestion = (id, e) => {
    console.log("in deleteGeneralQuestion: index: ", id, this.state);
    e.preventDefault();
    const oldQuestionList = [...this.state.questionTemplate];
    // console.log("newQuestionList: ", newQuestionList);
    const newQuestionList = oldQuestionList.filter( question => question.id != id);
    this.setState({...this.state, questionTemplate: newQuestionList});
    console.log("after resetting state: ", this.state);
  }

  onChange = (event) =>{
    this.setState({...this.state, QuizTitle: event.target.value})
    console.log("on change ", event.target.value);
    console.log("state: ", this.state.QuizTitle)
  }

  timerSwitchHandle = () => {
    this.setState(prevState => {
      return {...prevState, timerChecked: !prevState.timerChecked}
    })
    // console.log("switch check: ", this.state.timerChecked)
  }

  render() {
    return (
      <div>
        {console.log("hiiiiii")}
        {console.log(this.props.history)}
        <h1>Add More Questions to the Question Pool</h1>

        <div >
          <form id="quizTitleBlock">
            {/* <input id="quizTitle" value={this.state.QuizTitle} */}
            {/* onChange={this.onChange}></input> */}
            {/* <label id="timer">Timer: 
              <select>
                <option value="10">10 min</option>
                <option value="10">30 min</option>
                <option value="10">60 min</option>
                <option value="10">90 min</option>
                <option value="10">120 min</option>
              </select>
            </label>
            <label id="timerSwitch">Timed Quiz
              <Switch onChange={this.timerSwitchHandle} checked={this.state.timerChecked} />
            </label> */}

          </form>
          {/* <h3>{this.state.QuizTitle}</h3> */}
        </div>

        {/* <div>
          <button class="addQuestionButton">+ Multiple Choice</button>
          <button class="addQuestionButton">+ Dropdown List</button>
          <button class="addQuestionButton">+ Open Questions</button>
        </div> */}
        <div>
          {this.state.inputAtTop && this.state.display && 
          Array.from(Array(this.state.questionTemplate.length)).map((x, index) => <QuestionTemplate key={index} deleteHandle={(e) => this.deleteGeneralQuestion(this.state.questionTemplate[index].id, e)}/>)}
        </div>
        <div>
          <button className="addNew" onClick={this.addGeneralQuestionTemplate}>+</button>
        </div>

        <div>
            <br></br>
            <p>Question Pool</p>
            {console.log("question pool: ", this.state.questionPool)}
            {this.state.questionPool.map((question, index) => {
                return(
                    <div key={question.id}>
                        <QuestionDisplay question={question} />
                    </div>
                )

            })}
        </div>
        <div>
          <button className="addNew" onClick={() => this.addGeneralQuestionTemplate(false)}>+</button>
        </div>
        <div>
          {!this.state.inputAtTop && this.state.display && 
          Array.from(Array(this.state.questionTemplate.length)).map((x, index) => <QuestionTemplate key={index} deleteHandle={(e) => this.deleteGeneralQuestion(this.state.questionTemplate[index].id, e)}/>)}
        </div>
        {/* <div id="createQuiz">
        <p>Create a Quiz</p>
        <p id="addQuiz"
        >+</p>
        </div>
        <div id="recentQuizes">
          <p>Recent Quizes</p>
        </div> */}
        {/* <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>
        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button> */}
      </div>
    );
  }
}