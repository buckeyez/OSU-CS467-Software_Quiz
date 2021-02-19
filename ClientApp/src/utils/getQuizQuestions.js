import axios from 'axios';

/**
 * Gets user object from /users/{id} endpoint
 * @param  {string} userID ID of a user
 * @return {object}      user object containing id,name, firstName, lastName, email
 */
export const getQuizQuestions = async (quizID) => {
  //Required data for reqeust body
  const data = {};
  const headers = {};

  const response = await axios
    .get(`/quizzes/${quizID}/false`, data, headers)
    .catch((e) => console.log(e));

  //If user exists, return user object, else undefined
  if (response) {
    return response.data;
  } else {
    return undefined;
  }
};
