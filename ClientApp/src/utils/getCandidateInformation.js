import axios from 'axios';

export const getCandidateInformation = async (key) => {
  //Required data for reqeust body
  const data = {};
  const headers = {};

  const response = await axios
    .get(`/quizzes/assignment/${key}`, data, headers)
    .catch((e) => console.log(e));

  //If user exists, return user object, else undefined
  if (response) {
    return response.data;
  } else {
    return undefined;
  }
};
