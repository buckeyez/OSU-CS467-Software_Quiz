import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';
import * as ROUTES from '../constants/routes';
import { CandidateResults } from '../components';
import { CandidateCard } from '../components';
// import queryString from 'query-string';
import { getRankings } from '../utils/getRankings';

export default function CandidateRankingsPage() {
  //   const location = useLocation();
  const history = useHistory();
  //   const queryParams = queryString.parse(location.search);
  const [rankings, setRankings] = useState(null);
  const [loading, setLoading] = useState(true);

  //const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await getRankings();
        setRankings(r);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <span>Loading results...</span>;
  }

  if (rankings.length === 0 || rankings === null) {
    return <span>There are no quiz results to load</span>;
  }

  const handleViewCandidate = (assignmentKey) => {
    history.push(`${ROUTES.CANDIDATE_RESULT}/?key=${assignmentKey}`);
  };

  return (
    <CandidateResults>
      <CandidateResults.Title>Quiz REsults Here</CandidateResults.Title>
      {
        //TBD: check submission.completed boolean to enable view candiate butoon
        //TBD: check submission.quizName to display quiz name
        rankings.map((submission) => {
          return (
            <CandidateCard key={submission.assignmentKey}>
              <CandidateCard.TextSmall>{submission.user.firstName}</CandidateCard.TextSmall>
              <CandidateCard.TextSmall>Assigned Quiz: [SOME NAME HERE]</CandidateCard.TextSmall>

              <CandidateCard.Button
                onClick={() => {
                  handleViewCandidate(submission.assignmentKey);
                }}
              >
                View Candidate
              </CandidateCard.Button>
            </CandidateCard>
          );
        })
      }
    </CandidateResults>
  );
}
