import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Home() {
  const { user } = useContext(UserContext);
  const history = useHistory();

  return (
    <>
      <h1>Home page</h1>
      <p>Hello {user.firstName}</p>
    </>
  );
}
