import axios from 'axios';

/**
 * Gets user object from /users/signin endpoint
 * @param  {string} emailAddress email address of user
 * @param  {string} password password of user
 * @return {object}      user object containing id,name, firstName, lastName, email
 */
export const getUserByID = async (userID) => {
  //Required data for reqeust body
  const data = {};
  const headers = {
    'Access-Control-Allow-Origin': 'https://localhost:5001/',
  };

  const response = await axios
    .post(`https://localhost:5001/users/${userID}`, data, headers)
    .catch((e) => console.log(e));

  //If user exists, return user object, else undefined
  if (response) {
    return response.data;
  } else {
    return undefined;
  }
};
