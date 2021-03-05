import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';
//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';
import * as ROUTES from '../constants/routes';
import { CandidateResults } from '../components';
import { CandidateCard } from '../components';

export default function CandidateResultsPage() {
  const history = useHistory();
  //const history = useHistory();

  const handleViewCandidate = () => {
    history.push(ROUTES.CANDIDATE_RESULT);
  };

  return (
    <CandidateResults>
      <CandidateResults.Title>Quiz REsults Here</CandidateResults.Title>

      <CandidateCard>
        <CandidateCard.TextSmall>James Bond</CandidateCard.TextSmall>
        <CandidateCard.Button onClick={handleViewCandidate}>View Candidate</CandidateCard.Button>
      </CandidateCard>
    </CandidateResults>
  );
}
