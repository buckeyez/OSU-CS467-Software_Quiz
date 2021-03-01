import axios from 'axios';

export const updateUser = async (userInformation) => {
  //Required data for reqeust body
  const data = {};
  const headers = {};

  const response = await axios
    .post(`/users/update`, userInformation, headers)
    .catch((e) => console.log(e));

  //If user exists, return user object, else undefined
  if (response) {
    return response.data;
  } else {
    return undefined;
  }
};

export const updateUserPassword = async (userID, password) => {
  //Required data for reqeust body
  const data = {};
  const headers = {};

  const response = await axios
    .post(`/users/updatepassword?id=${userID}&password=${password}`, data, headers)
    .catch((e) => console.log(e));

  //If user exists, return user object, else undefined
  if (response) {
    console.log('response is', response);
    return response.status;
  } else {
    return undefined;
  }
};
