import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';

export default function Signin() {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const isInvalid = password === '' || emailAddress === '';

  const handleSignIn = (event) => {
    console.log('signedin');
    event.preventDefault();
    history.push(ROUTES.HOME);
  };

  return (
    <>
      <Form>
        <Form.Title>Sign In</Form.Title>

        <Form.Base onSubmit={handleSignIn} method="POST">
          <Form.Input
            placeholder="Email address"
            value={emailAddress}
            onChange={({ target }) => setEmailAddress(target.value)}
          />

          <Form.Input
            placeholder="Password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <Form.Submit disabled={isInvalid} type="submit">
            Sign In
          </Form.Submit>
        </Form.Base>
      </Form>
    </>
  );
}
