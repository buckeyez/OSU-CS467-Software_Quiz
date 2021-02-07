import axios from 'axios';

/**
 * Gets user object from /users/signin endpoint
 * @param  {string} emailAddress email address of user
 * @param  {string} password password of user
 * @return {object}      user object containing id,name, firstName, lastName, email
 */
export const login = async (emailAddress, password) => {
  //Required data for reqeust body
  const data = {
    Email: emailAddress,
    Password: password,
  };
  const headers = {
    'Access-Control-Allow-Origin': 'https://localhost:5001/',
  };

  const response = await axios.post('/users/signIn', data, headers).catch((e) => console.log(e));

  //If user exists, return user object, else undefined
  if (response) {
    return response.data;
  } else {
    return undefined;
  }
};
