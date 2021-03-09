import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
//import history from '../helpers/history';
//import * as ROUTES from '../constants/routes';
import axios from 'axios';
import Candidate from '../components/Candidate'
import { Form } from '../components'

// import "./SoftwareQuiz.css"
// import {Button} from 'react-bootstrap';

export default class AddCandidates extends Component {
  // static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { 
        count: 0,
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        candidatesPool: []
    };
  }

  componentDidMount() {
    console.log('AddCandidates just mounted ');
    axios.get(`/Roles/Candidate/Users`).then((response) => {
      this.setState({ ...this.state, candidatesPool: response.data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.count !== this.state.count){
        axios.get(`/Roles/Candidate/Users`).then((response) => {
            this.setState({ ...this.state, candidatesPool: response.data });
          });
    }
    console.log('AddCandidates just updated ');

  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}


  handleSubmitUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("some field empyt: ", this.state.email, this.state.lastname, this.state.firstname, this.state.username)
    if (!this.state.email || !this.state.lastname || !this.state.firstname || !this.state.username){
        // console.log("some field empyt: ", email, lastName, firstName, username)
        this.setState({...this.state, message: "Please fill in all fields."})
        return
    }else{
        let payload = {"Name": this.state.username, "FirstName": this.state.firstname, "LastName": this.state.lastname, "Email": this.state.email, "Password": null}
        axios.post(`/Users/AddPasswordless`, payload)
        .then((response) => {
            this.setState(prevState => {
                console.log("in axios post response: ", response)
                return ({...this.prevState, count: prevState.count+1, message: "Candidate added!", username: '', firstname: '', lastname: '', email: ''})
            });
          }).catch((error) => {
            console.log("errorrr")
            this.setState({...this.state, message: "The email already exist for a candidate. Please enter a unique email."})
          })
    }

    console.log("in submit user: ", e.target, e.target.previousSibling.value)

  }

  handleInputChange = (e) => {
      console.log("in handle input change: ", e.target.name, e.target.value)
      this.setState({...this.state, [e.target.name]: e.target.value})
  }

  resetMessage = () => {
      this.setState({...this.state, message: ""})
  }


  render() {
    return (
      <div onClick = {this.resetMessage}>
        {/* <h1>Candidates</h1>
        {this.state.count} */}
        <div id="createQuiz">
          <h3>Add Candidate</h3>
          <br></br>
          <form>
              <label>Username: &nbsp;&nbsp;</label>
              <Form.MCInput type="text" name="username" onChange={this.handleInputChange} value={this.state.username}></Form.MCInput><br></br>
              <label>First Name: &nbsp;&nbsp;</label>
              <Form.MCInput type="text" name="firstname" onChange={this.handleInputChange} value={this.state.firstname}></Form.MCInput><br></br>
              <label>Last Name: &nbsp;&nbsp;</label>
              <Form.MCInput type="text" name="lastname" onChange={this.handleInputChange} value={this.state.lastname}></Form.MCInput><br></br>
              <label>Email Address: &nbsp;&nbsp;</label>
              <Form.MCInput type="email" name="email" onChange={this.handleInputChange} value={this.state.email}></Form.MCInput><br></br>
              <Form.Submit type="submit" onClick={(e) => this.handleSubmitUser(e)}>Submit</Form.Submit>
              {this.state.message && <Form.ErrorMessage>{this.state.message}</Form.ErrorMessage>}
            
          </form>
          </div>
          <div>
            <br></br>
          <h3>Existing Candidates</h3>
          <br></br>
          <p>Total: {this.state.candidatesPool.length}</p>
          {this.state.candidatesPool.map((candidate, index) => {
              return <Candidate key={index} candidate={candidate} />
          })}

        {/* <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>
        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button> */}
      </div>
    </div>
    );
  }
}
