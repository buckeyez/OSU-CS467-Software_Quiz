import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { Welcome } from '../components';

export default function CandidateHome() {
  //   const { user } = useContext(UserContext);
  const history = useHistory();

  return (
    <>
      <Welcome>
        <Welcome.Title>Welcome [NAME HERE] </Welcome.Title>
        <Welcome.TextSmall>You have been assigned the following quiz(s). </Welcome.TextSmall>
      </Welcome>
    </>
  );
}
