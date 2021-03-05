import React /*, { Component, useState }*/ from 'react';
import { Form } from './';
// import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';

const Candidate = (props) => {
  var boldStyle = {
    fontWeight: 'bold',
  };

  return (
    <div>
      <Form.Question>
        <p>
          <span style={boldStyle}>Username: &nbsp;</span> {props.candidate.name}
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
