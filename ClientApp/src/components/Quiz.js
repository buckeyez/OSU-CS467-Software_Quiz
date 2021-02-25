import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import history from '../helpers/history';
import * as ROUTES from '../constants/routes';
import Switch from 'react-switch';
import axios from 'axios';
import QuizDisplay from './QuizDisplay';
import { Form } from './';

// import "./SoftwareQuiz.css"
// import {Button} from 'react-bootstrap';

export default class Quiz extends Component {
  // static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = {
      QuizTitle: '',
      timerChecked: false,
      message: '',
      theQuizzes: [],
      currentQuizID: '',
      quizCount: 0,
      quizContents: [],
      quizContentsID: [],
      questionPool: [],
      entityIDsToAdd: [],
      entityIDsToDelete: [],
      add: 0,
      delete: 0,
      bufferID: '',
      befferName: '',
      refreshAfterUpdate: false,
    };
  }

  componentDidMount = () => {
    console.log('Quiz just mounted ');
    axios
      .get(`/Quizzes`)
      .then((response) => {
        console.log('response: ', response.data);
        this.setState({ ...this.state, theQuizzes: response.data });
      })
      .then(
        axios.get('/Questions').then((response) => {
          this.setState({ ...this.state, questionPool: response.data });
        })
      );
  };

  componentDidUpdate(prevProps, prevState) {
    // this is really bad performance
    // console.log("---------for delete, this.state, prevSte: ", this.state.forDelete, prevState.forDelete);
    if (
      this.state.quizCount != prevState.quizCount ||
      this.state.refreshAfterUpdate != prevState.refreshAfterUpdate
    ) {
      // if(this.state != prevState){
      // console.log("this and prev: ", this.state, prevState)
      // console.log("Add questions just updated, ", this.state.updateCount)
      return axios
        .get(`/Quizzes`)
        .then((response) => {
          // console.log("res[pmnsee: ", response.data);
          this.setState((prevState) => {
            return {
              ...prevState,
              theQuizzes: response.data,
              currentQuizID: prevState.currentQuizID,
              bufferID: prevState.bufferID,
            };
          });
        })
        .then(
          axios.get('/Quizzes/' + this.state.currentQuizID + '/true').then((response) => {
            console.log('in get quiz content: ', this.populateQuizID(response.data.questions));
            let IDs = this.populateQuizID(response.data.questions);
            console.log('IDs: ', IDs);
            this.setState({
              ...prevState,
              quizContents: response.data.questions,
              quizContentsID: IDs,
              bufferID: prevState.bufferID,
            });
          })
        );
    } else if (this.state.currentQuizID != prevState.currentQuizID) {
      console.log('prev id, cur id: ' + prevState.currentQuizID, ',' + this.state.currentQuizID);
      console.log(
        'bufferID and bufferName',
        this.state.bufferID,
        this.state.bufferName,
        this.state.newNameList
      );
      // return axios.get(`/Quizzes`)
      // .then(response => {
      //     // console.log("res[pmnsee: ", response.data);
      //   this.setState(prevState => {
      //       return {...prevState, theQuizzes: response.data}
      //   });
      // })
      // .then(
      return axios.get('/Quizzes/' + this.state.currentQuizID + '/true').then((response) => {
        console.log('in get quiz content: ', this.populateQuizID(response.data.questions));
        let IDs = this.populateQuizID(response.data.questions);
        let curID =
          prevState.currentQuizID === '' ? this.state.currentQuizID : prevState.currentQuizID;
        let curName =
          prevState.bufferName === this.state.bufferName
            ? prevState.bufferName
            : this.state.bufferName;
        this.setState({
          ...prevState,
          quizContents: response.data.questions,
          quizContentsID: IDs,
          bufferID: curID,
          bufferName: curName,
        });
      });
    }
    console.log('bufferID: ', this.state.bufferID);
  }

  populateQuizID = (questions) => {
    let IDs = [];
    for (let i = 0; i < questions.length; i++) {
      console.log('in populate: ', questions[i].question.id);
      IDs.push(questions[i].question.id);
    }
    return IDs;
  };

  onChange = (event) => {
    this.setState({ ...this.state, QuizTitle: event.target.value, message: '' });
    console.log('on change ', event.target.value);
    console.log('state: ', this.state.QuizTitle);
  };

  timerSwitchHandle = () => {
    this.setState((prevState) => {
      return { ...prevState, timerChecked: !prevState.timerChecked };
    });
    // console.log("switch check: ", this.state.timerChecked)
  };

  handleAddQuiz = (e) => {
    e.preventDefault();
    if (!this.state.QuizTitle) {
      this.setState({ ...this.state, message: 'Quiz Title cannot be blank!' });
      return;
    }

    let url = 'Quizzes/Add?name=' + this.state.QuizTitle;
    axios
      .post(url) //TODO need to not hardcode the url
      .then((res) => {
        console.log('Quiz Added');
        // console.log("res: ", res, res.data.question.id);
        // console.log("the id should be: ", res.data.question.id);
        this.setState((prevState) => ({
          ...this.state,
          QuizTitle: '',
          timerChecked: false,
          message: 'Quiz Added!',
          quizCount: prevState.quizCount + 1,
        }));
      });
  };

  handleAddQuizCount = () => {
    this.setState((prevState) => {
      return { ...this.state, quizCount: prevState.quizCount + 1 };
    });
  };

  handleClickedQuiz = (id, name) => {
    // let newNameList = [...this.state.bufferNameList, name];

    // console.log("in handle clicked Quiz: ", newNameList)
    this.setState({ ...this.state, currentQuizID: id, bufferName: name });
  };

  isQuestionChecked = (e, id) => {
    // for (let i = 0; i < this.state.quizContents; i++){
    //   console.log("in isQuestionChecked: ", this.state.quizContents[i], id)
    //   if(this.state.quizContents[i].question.id === id){
    //     return true
    //   }
    // }
    // return false
    let ref = 'ref' + id;
    // for (let i = 0; i < this.state.quizContents; i++){
    //   console.log("in isQuestionChecked: ", this.state.quizContents[i], id)
    //   if(this.state.quizContents[i].question.id === id){
    //     this.refs[ref].checked = true;
    //     return;
    //   }
    // }
    this.refs[ref].checked = !this.refs[ref].checked;
    // let result = this.refs[ref].checked
    console.log('is checked? ', e.target.previousSibling.checked, this.refs[ref].checked);
    let toAdd = [...this.state.entityIDsToAdd];
    let toDelete = [];
    if (e.target.previousSibling.checked) {
      toAdd.push(id);
      // this.setState((prevState) => ({...prevState, add: id}))
    } else {
      toDelete.push(id);
      // this.setState((prevState) => ({...prevState, entityIDsToDelete: [...prevState.entityIDsToDelete, id]}))
    }
    // this.setState({...this.state, entityIDsToAdd: toAdd})
    // this.setState((prevState) => ({...prevState, entityIDsToAdd: toAdd, entityIDsToDelete: toDelete}))
    // console.log("in isQuestionChecked: ", this.state.quizContents, id)
    console.log('To Add: ', toAdd);
    console.log('To Delete: ', toDelete);
    console.log('entitieIDsToAdd: ', this.state.entityIDsToAdd);
  };

  handleQuizContentUpdate = (e) => {
    e.preventDefault();
    // console.log("To Add: ", this.state.entityIDsToAdd)
    // console.log("To Delete: ", this.state.entityIDsToDelete);
    // console.log("previous sib: ", e.target.previousSibling.children[0].checked)
    // let element = e.target.previousSibling
    // console.log("previous prev: ", element.previousSibling)
    let toAdd = [];
    let toDelete = [];
    // for(let i = 0; i< 3; i++){
    //   if (element.children[0].type === "checkbox"){
    //     if(element.children[0].checked){
    //       toAdd.push(element.children[0].value)
    //       element = element.previousSibling
    //     }
    //   }
    // }
    let list = document.getElementById('checkboxes').getElementsByTagName('div');
    console.log('the list: ', list);
    for (let i = 0; i < list.length; i++) {
      if (list[i].children[0].checked) {
        console.log('checked id: ', list[i].children[0].value);
        let id = Number(list[i].children[0].value);
        console.log('exisitng IDs: ', this.state.quizContentsID);
        if (!this.state.quizContentsID.includes(id)) {
          console.log('pushing this: ', id);
          toAdd.push(id);
        }
      } else {
        let id = Number(list[i].children[0].value);
        toDelete.push(id);
      }
    }
    console.log('taaaaaaaaaaaaa');

    console.log('toAdd/toDelete in update: ', toAdd, toDelete);

    let url = 'Quizzes/Update?id=' + this.state.bufferID;
    let payload = {
      EntityIdsToAdd: toAdd,
      EntityIdsToRemove: toDelete,
    };
    console.log('payload: ', payload, url);
    axios
      .post(url, payload) //TODO need to not hardcode the url
      .then((res) => {
        console.log('Quiz updated!!!!!!!!!!!!!!!!!');
        this.setState({
          ...this.state,
          message: 'Question List for quiz updated!',
          quizContentsID: toAdd,
        });
        if (toAdd.length > 0 || toDelete.length > 0) {
          console.log('need to refresh after update');
          this.setState({ ...this.state, refreshAfterUpdate: true });
        }
        // console.log("res: ", res, res.data.question.id);
        // console.log("the id should be: ", res.data.question.id);
        // this.setState((prevState) => ({...this.state, QuizTitle: "", timerChecked: false, message: "Quiz Added!", quizCount: prevState.quizCount + 1}));
      });
  };

  checkboxChange = (e, id) => {
    console.log('checkbox changed ', e.target.checked);
    e.preventDefault();
    console.log('checkbox changed: ', e.target.nextSibling.value, e.target.checked);
    const options = [...this.state.quizContentsID];
    let length = options.length;
    // for (let i = 0; i < length; i++) {
      if (!options.includes(id)) {
        options.push(id);
      }
    // }
    // setChoiceList(options);
    // console.log('choiceList: ', choiceList);
    // props.handleCheckboxChoiceAnswer(choiceList);

    // e.target.checked = !e.target.checked;
  };

  handleQuizDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('delete quiz: ', id);
    let url = 'Quizzes/Delete?id=' + id;
    console.log('quiz delete url: ', url);
    axios
      .post(url) //TODO need to not hardcode the url
      .then((res) => {
        console.log('Quiz deleted');
        // console.log("res: ", res, res.data.question.id);
        // console.log("the id should be: ", res.data.question.id);
        this.setState((prevState) => {
          return { ...this.state, quizCount: prevState.quizCount - 1 };
        });
        // this.setState((prevState) => ({...this.state, QuizTitle: "", timerChecked: false, message: "Quiz Added!", quizCount: prevState.quizCount + 1}));
      });
  };

  handleSendEmail = (e) => {
    e.preventDefault();
    console.log('should send email');
  };

  test = () => {
    console.log('test');
  };

  render() {
    return (
      <div>
        <h1>Quiz Page</h1>

        <div>
          <h2>Create New Quiz</h2>
        </div>
        <div>
          <form id="quizTitleBlock">
            <label>Quiz Title</label>
            <input id="quizTitle" value={this.state.QuizTitle} onChange={this.onChange}></input>
            <label id="timer">
              Timer:
              <select>
                <option value="10">10 min</option>
                <option value="10">30 min</option>
                <option value="10">60 min</option>
                <option value="10">90 min</option>
                <option value="10">120 min</option>
              </select>
            </label>
            <label id="timerSwitch">
              Timed Quiz
              <Switch onChange={this.timerSwitchHandle} checked={this.state.timerChecked} />
            </label>
            <button type="submit" onClick={this.handleAddQuiz}>
              Add Quiz
            </button>
            {this.state.message && <p>{this.state.message}</p>}
          </form>
          {/* <h3>{this.state.QuizTitle}</h3> */}
        </div>
        <Form.QuizOuter>
          <div>
            <Form.Quizzes>
              <h4>Quiz Pool</h4>
              {this.state.theQuizzes.map((quiz, index) => {
                return (
                  <div key={index}>
                    {/* <QuizDisplay quiz={quiz}/> */}
                    {/* <Form.eachQuiz> */}
                    <QuizDisplay
                      quiz={quiz.name}
                      quizID={quiz.id}
                      current={this.state.bufferID === quiz.id}
                      handleQuizDelete={(e) => this.handleQuizDelete(e, quiz.id)}
                      clicked={() => this.handleClickedQuiz(quiz.id, quiz.name)}
                    />
                    {this.state.currentQuizID}
                    {/* </Form.eachQuiz> */}
                  </div>
                );
              })}
            </Form.Quizzes>
            {console.log('theQuizzes: ', this.state.theQuizzes)}
          </div>
          <Form.QuestionsNextToQuizzes>
            <div>
              <h4>{this.state.bufferName} Question Pool</h4>
              <div id="checkboxes">
                {this.state.questionPool.map((question, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        value={question.id}
                        checked={this.state.quizContentsID ? this.state.quizContentsID.includes(question.id) : false}
                        onChange={(e) => this.checkboxChange(e, index)}
                        ref={'ref' + question.id}
                        // onClick={() => this.isQuestionChecked(question.id)}
                      ></input>
                      <button onClick={(e) => this.isQuestionChecked(e, question.id)}>
                        Toggle
                      </button>
                      {question.value}-{question.id}
                      {/* <p>includes?</p> */}
                      {/* <p>{console.log("includes? ", this.state.quizContents.length > 0 && this.state.quizContents.questions.includes(question.id))}</p> */}
                    </div>
                  );
                })}
              </div>
              <button type="submit" onClick={this.handleQuizContentUpdate}>
                Update
              </button>
            </div>
          </Form.QuestionsNextToQuizzes>
        </Form.QuizOuter>
        <div>
          <h3>
            Selected Quiz: {this.state.bufferID}, {this.state.bufferName},{' '}
            {this.state.currentQuizID}
          </h3>
          <form>
            <label>Name:</label>
            <input type="email" placeholder="Enter email here..."></input>
            <button type="submit" onClick={(e) => this.handleSendEmail(e)}>
              Send quiz!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
