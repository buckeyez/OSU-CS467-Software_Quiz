import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import history from '../helpers/history';
import * as ROUTES from '../constants/routes';
import Switch from "react-switch";
import axios from 'axios';
import QuizDisplay from './QuizDisplay';

// import "./SoftwareQuiz.css"
// import {Button} from 'react-bootstrap';

export default class Quiz extends Component {
  // static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { 
      QuizTitle: "",
      timerChecked: false,
      message: "",
      theQuizzes: [],
      currentQuizID: ""
    };
  }

  componentDidMount = () => {
    console.log("Quiz just mounted ");
    axios.get(`/Quizzes`)
    .then(response => {
      console.log("response: ", response.data)
      this.setState({...this.state, theQuizzes: response.data });

    })
  }

  onChange = (event) =>{
    this.setState({...this.state, QuizTitle: event.target.value, message: ""});
    console.log("on change ", event.target.value);
    console.log("state: ", this.state.QuizTitle)
  }

  timerSwitchHandle = () => {
    this.setState(prevState => {
      return {...prevState, timerChecked: !prevState.timerChecked}
    })
    // console.log("switch check: ", this.state.timerChecked)
  }

  handleAddQuiz = (e) => {
    e.preventDefault();
    if(!this.state.QuizTitle){
      this.setState({...this.state, message: "Quiz Title cannot be blank!"});
      return;
    }
    
    let url = 'Quizzes/Add?name=' + this.state.QuizTitle;
    axios.post(url) //TODO need to not hardcode the url
    .then(res => {
      console.log("Quiz Added")
      // console.log("res: ", res, res.data.question.id);
      // console.log("the id should be: ", res.data.question.id);
      this.setState({...this.state, QuizTitle: "", timerChecked: false, message: "Quiz Added!"});
    })
  }


  test = () => {
    console.log("test")
  }

  render() {
    return (
      <div>
        <h1>Quiz Page</h1>
        
       
          <div>
            <h2>Create New Quiz</h2>
          </div>
          <div >
          <form id="quizTitleBlock">
            <label>Quiz Title</label>
            <input id="quizTitle" value={this.state.QuizTitle}
             onChange={this.onChange}></input> 
            <label id="timer">Timer: 
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
            </label> 
            <button type="submit" onClick={this.handleAddQuiz}>Add Quiz</button>
            {this.state.message && <p>{this.state.message}</p>}
          </form>
          {/* <h3>{this.state.QuizTitle}</h3> */}
        </div>
        <div>
          <h2>Quizzes</h2>
          {this.state.theQuizzes.map((quiz, index) => {
            return (
              <div key={index}>
                {/* <QuizDisplay quiz={quiz}/> */}
                <p><QuizDisplay quiz={quiz.name} /></p>
              </div>);
          })}
          {console.log("theQuizzes: ",this.state.theQuizzes)}
        </div>
        <div>
          {this.currentQuizID ? 
          <p>yes current Quiz </p> : <p>no currecnt quiz</p>
          }
        </div>
    
    </div>
    );
  }
}