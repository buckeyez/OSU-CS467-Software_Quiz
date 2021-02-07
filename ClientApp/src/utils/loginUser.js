import axios from 'axios';

export const login = async (emailAddress, password) => {
  const data = {
    Email: emailAddress,
    Password: password,
  };
  const headers = {
    'Access-Control-Allow-Origin': 'https://localhost:5001/',
  };

  const res = await axios
    .post('https://localhost:5001/users/signIn', data, headers)
    .catch((e) => console.log(e));

  if (res) {
    return res.data;
  } else {
    return undefined;
  }

  //   const res = axios
  //     .post('https://localhost:5001/users/signIn', data, headers)
  //     .then((ress) => {
  //       console.log(ress);
  //       return ress.data;
  //     })
  //     .catch((e) => {
  //       console.log('Error:', e);
  //     });

  //   return res;
};
