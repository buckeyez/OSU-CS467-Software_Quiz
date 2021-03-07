import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';
import { UserContext } from '../context/userContext';
import { login } from '../utils/loginUser';
import { storeUserSessionToLocalStorage } from '../utils/storeSession';
import {
  containerStyle,
  baseStyle,
  inputStyle,
  buttonStyle,
} from '../pages/styles/customPageStyles';

export default function Signin() {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { /*user,*/ setUser } = useContext(UserContext);

  const isInvalid = password === '' || emailAddress === '';

  const handleSignIn = async (event) => {
    event.preventDefault();

    //Call login function which handles call to /users/signin endpoint
    // if emailAddress and password are correct, a user object is returned
    // and the app navigates to the home page
    const user = await login(emailAddress, password);
    if (user) {
      setUser(user);
      storeUserSessionToLocalStorage(user);
      history.push(ROUTES.HOME);
    } else {
      setError('Incorrect credentials. Please try again.');
    }
  };

  return (
    <div style={{ ...containerStyle }}>
      <Form>
        {error && <Form.Error>{error}</Form.Error>}
        <Form.Title>Sign In</Form.Title>

        <Form.Base onSubmit={handleSignIn} method="POST">
          <div style={{ ...baseStyle }}>
            <Form.Input
              style={{ ...inputStyle }}
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value.trim())}
            />

            <Form.Input
              style={{ ...inputStyle }}
              placeholder="Password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value.trim())}
            />

            <Form.Submit style={{ ...buttonStyle }} disabled={isInvalid} type="submit">
              Sign In
            </Form.Submit>
          </div>
        </Form.Base>
      </Form>
    </div>
  );
}
