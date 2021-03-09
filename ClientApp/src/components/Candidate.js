import React /*, { Component, useState }*/ from 'react';
import { Form } from './';
// import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';

const Candidate = (props) => {
  var boldStyle = {
    fontWeight: 'bold',
  };

  var keepRight = {
    float: 'right',
    // margin: '20px',
    // paddingBottom: '20px'
    // marginBottom: '50px'
  }

  return (
    <div>
      <Form.Question onClick={props.clicked}>
        {/* onClick={props.clicked} */}
        <p>
          <span style={boldStyle}>Username: &nbsp;</span> {props.candidate.name}
          <span><Form.DeleteButtonSmall onClick={(e) => props.deleteUser(props.candidate.id, e)} style={keepRight} type="submit" >X</Form.DeleteButtonSmall></span>
        </p>
        <p>
          <span style={boldStyle}>First Name: &nbsp;</span>
          {props.candidate.firstName}
        </p>
        <p>
          <span style={boldStyle}>Last Name:&nbsp; </span>
          {props.candidate.lastName}
        </p>
        <p>
          <span style={boldStyle}>Eamil: &nbsp;</span>
          {props.candidate.email}
          
        </p>
        
      </Form.Question>
    </div>
  );
};

export default Candidate;
