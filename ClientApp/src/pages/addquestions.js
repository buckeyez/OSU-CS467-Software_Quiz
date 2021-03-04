import axios from 'axios';
import React, { Component } from 'react';

//import Switch from 'react-switch';

// import "./SoftwareQuiz.css"
// import "./NewQuiz.css"
import QuestionTemplate from '../components/Questions/QuestionTemplate';
import QuestionDisplay from '../components/Questions/QuestionDisplay';

export default class AddQuestions extends Component {
  // static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      display: true,
      inputAtTop: true,
      questionTemplate: [],
      questionPool: [],
      canAdd: true,
    };
    this.incrementCounter = this.incrementCounter.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    console.log('AddQuestions just mounted ');
    axios.get(`/Questions`).then((response) => {
      this.setState({ ...this.state, questionPool: response.data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // this is really bad performance
    // console.log("---------for delete, this.state, prevSte: ", this.state.forDelete, prevState.forDelete);
    if (
      this.state.forDelete !== prevState.forDelete ||
      this.state.questionPool !== prevState.questionPool
    ) {
      // if(this.state != prevState){
      // console.log("this and prev: ", this.state, prevState)
      // console.log("Add questions just updated, ", this.state.updateCount)
      return axios.get(`/Questions`).then((response) => {
        // console.log("res[pmnsee: ", response.data);
        this.setState((prevState) => {
          return { ...prevState, questionPool: response.data };
        });
      });
      //     .then(response => {
      //         this.setState({...this.state, questionPool: response.data });

      //       })
    }
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1,
    });
  }

  addGeneralQuestionTemplate = (inputLocation = true) => {
    console.log('clicked add button');
    const questions = [...this.state.questionTemplate];
    let newCount = this.state.count;
    newCount = newCount + 1;
    questions.push({ id: newCount });
    this.setState((prevState) => {
      return {
        ...prevState,
        count: newCount,
        questionTemplate: questions,
        inputAtTop: inputLocation,
      };
    });
    console.log('questionTemplate: ', this.state.questionTemplate);
  };

  deleteGeneralQuestion = (id, e) => {
    console.log('in deleteGeneralQuestion: index: ', id, this.state);
    // e.preventDefault();
    // const oldQuestionList = [...this.state.questionTemplate];
    // // console.log("newQuestionList: ", newQuestionList);
    // const newQuestionList = oldQuestionList.filter( question => question.id != id);
    // this.setState({...this.state, questionTemplate: newQuestionList});
    // console.log("after resetting state: ", this.state);
    let url = '/Questions/Delete?id=' + id;
    console.log('url: ', url);
    axios.post(url).then(
      console.log('deleted'),
      this.setState((prevState) => {
        return { ...prevState };
      })
    );
  };

  render() {
    return (
      <div>
        {/* {console.log("hiiiiii")} */}
        {/* {console.log(this.props.history)} */}
        <h1>Add More Questions to the Question Pool</h1>

        {/* <div>
          <button class="addQuestionButton">+ Multiple Choice</button>
          <button class="addQuestionButton">+ Dropdown List</button>
          <button class="addQuestionButton">+ Open Questions</button>
        </div> */}
        <div>
          {this.state.inputAtTop &&
            this.state.display &&
            Array.from(Array(this.state.questionTemplate.length)).map((x, index) => (
              <QuestionTemplate
                key={index}
                deleteHandle={(id, e) => this.deleteGeneralQuestion(id, e)}
              />
            ))}
        </div>
        <div>
          <button className="addNew" onClick={this.addGeneralQuestionTemplate}>
            +
          </button>
        </div>

        <div>
          <br></br>
          <p>Question Pool</p>
          {/* {console.log("question pool: ", this.state.questionPool)} */}
          {this.state.questionPool.map((question, index) => {
            return (
              <div key={question.id}>
                <QuestionDisplay
                  deleteHandle={(id, e) => this.deleteGeneralQuestion(id, e)}
                  question={question}
                />
              </div>
            );
          })}
        </div>
        {/* <div>
          <button className="addNew" onClick={() => this.addGeneralQuestionTemplate(false)}>
            +
          </button>
        </div> */}
        <div>
          {!this.state.inputAtTop &&
            this.state.display &&
            Array.from(Array(this.state.questionTemplate.length)).map((x, index) => (
              <QuestionTemplate
                key={index}
                deleteHandle={(id, e) => this.deleteGeneralQuestion(id, e)}
              />
            ))}
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
