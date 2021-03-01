import React/*, { Component, useState }*/ from 'react';
// import { TransitionPropTypeKeys } from 'reactstrap/lib/utils';

const Candidate = (props) => {
  
  return (
    <div >
        <p>Username: {props.candidate.name}</p>
        <p>First Name: {props.candidate.firstName}</p>
        <p>Last Name: {props.candidate.lastName}</p>
        <p>Eamil: {props.candidate.email}</p>
    </div>
  );
};

export default Candidate;
