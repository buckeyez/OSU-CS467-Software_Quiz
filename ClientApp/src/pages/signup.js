import React, { useState, useContext } from 'react';
import { Form } from '../components';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();

    //code for sending new user to DB here
    console.log('new user signed up');
  };

  return (
    <>
      <Form>
        <Form.Title>Sign up</Form.Title>
        <Form.Base onSubmit={handleSignUp} method="POST">
          <Form.Input
            placeholder="First name"
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
          />

          <Form.Input
            placeholder="Email address"
            value={emailAddress}
            onChange={({ target }) => setEmailAddress(target.value)}
          />

          <Form.Input
            type="password"
            placeholder="Password"
            autocomplete="off"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Form.Submit type="submit">Sign Up</Form.Submit>
        </Form.Base>
      </Form>
    </>
  );
}