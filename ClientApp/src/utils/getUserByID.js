import axios from 'axios';

/**
 * Gets user object from /users/{id} endpoint
 * @param  {string} userID ID of a user
 * @return {object}      user object containing id,name, firstName, lastName, email
 */
export const getUserByID = async (userID) => {
  //Required data for reqeust body
  const data = {};
  const headers = {};

  const response = await axios.post(`/users/${userID}`, data, headers).catch((e) => console.log(e));

  //If user exists, return user object, else undefined
  if (response) {
    return response.data;
  } else {
    return undefined;
  }
};
